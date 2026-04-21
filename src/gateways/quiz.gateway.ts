import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DuelService } from 'src/services/duel.service';

@WebSocketGateway({ cors: true })
export class QuizGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private duelService: DuelService) {}

  @SubscribeMessage('joinRoom')
  async handleJoin(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.duelService.joinRoom(data.roomId, data.userId, client.id);

    client.join(data.roomId);

    if (this.duelService.isReady(data.roomId)) {
      this.server.to(data.roomId).emit('startGame');
    }
  }

  @SubscribeMessage('startQuiz')
  async handleStartQuiz(
    @MessageBody() data: { roomId: string; quizId: string },
  ) {
    const questions = await this.duelService.startQuiz(
      data.roomId,
      data.quizId,
    );

    this.server.to(data.roomId).emit('quizData', questions);
  }

  @SubscribeMessage('answer')
  async handleAnswer(
    @MessageBody()
    data: {
      roomId: string;
      quizId: string;
      userId: string;
      questionText: string;
      answer: number | boolean;
      time: number;
    },
  ) {
    const result = await this.duelService.answerQuestion(
      data.roomId,
      data.quizId,
      data.userId,
      data.questionText,
      data.answer,
      data.time,
    );

    if (!result) return;

    this.server.to(data.roomId).emit('answerResult', {
      userId: data.userId,
      ...result,
    });
  }

  @SubscribeMessage('finish')
  handleFinish(@MessageBody() data: { roomId: string; userId: string }) {
    const result = this.duelService.finishGame(data.roomId, data.userId);

    if (result) {
      this.server.to(data.roomId).emit('gameOver', result);
    }
  }
}
