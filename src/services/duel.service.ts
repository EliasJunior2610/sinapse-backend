import { Injectable, BadRequestException } from '@nestjs/common';
import { DuelState } from 'src/states/duel.state';
import { QuizService } from './quiz.service';

@Injectable()
export class DuelService {
  constructor(
    private duelState: DuelState,
    private quizService: QuizService,
  ) {}

  async joinRoom(roomId: string, userId: string, socketId: string) {
    this.duelState.createRoom(roomId);
    const room = this.duelState.getRoom(roomId);

    if (room.players.length >= 2) {
      throw new BadRequestException('Sala cheia.');
    }

    room.players.push({ userId, socketId });
    room.scores[userId] = 0;

    return room;
  }

  isReady(roomId: string): boolean {
    const room = this.duelState.getRoom(roomId);
    return room.players.length === 2;
  }

  async startQuiz(roomId: string, quizId: string) {
    const room = this.duelState.getRoom(roomId);

    const quiz = await this.quizService.findById(quizId);

    // embaralhar perguntas
    room.questions = quiz.questions.sort(() => Math.random() - 0.5);

    room.startTime = Date.now();

    return room.questions;
  }

  async answerQuestion(
    roomId: string,
    quizId: string,
    userId: string,
    questionText: string,
    answer: number | boolean,
    time: number,
  ) {
    const room = this.duelState.getRoom(roomId);

    // bloqueia respostas após fim do jogo
    if (room.isFinished) {
      return {
        correct: false,
        score: room.scores[userId],
      };
    }
    const isCorrect = await this.quizService.answerQuestion(
      quizId,
      questionText,
      answer,
    );

    if (isCorrect) {
      const score = 100 - time;
      room.scores[userId] += score > 0 ? score : 10;
    }

    return {
      correct: isCorrect,
      score: room.scores[userId],
    };
  }

  finishGame(roomId: string, userId: string) {
    const room = this.duelState.getRoom(roomId);

    // adiciona jogador na lista de finalizados
    if (!room.finishedPlayers.includes(userId)) {
      room.finishedPlayers.push(userId);
    }

    // ainda não terminou todo mundo
    if (room.finishedPlayers.length < room.players.length) {
      return null;
    }

    // evita duplicação
    if (room.isFinished) {
      return null;
    }

    room.isFinished = true;

    const winner = Object.entries(room.scores).sort((a, b) => b[1] - a[1])[0];

    return {
      winner: winner[0],
      scores: room.scores,
    };
  }
}
