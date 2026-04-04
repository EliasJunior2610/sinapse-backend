import { QuizRepository } from 'src/repositories/quiz.repository';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestionDTO, QuizDTO, QuizResponseDTO } from 'src/DTOs/QuizDTO';

@Injectable()
export class QuizService {
  constructor(private quizRepository: QuizRepository) { }

  async create(quiz: QuizDTO): Promise<QuizResponseDTO> {
    if (!quiz) throw new BadRequestException('quiz não enviado');

    const response = await this.quizRepository.insertOne(quiz);
    return response;
  }

  async findAll(): Promise<QuizResponseDTO[]> {
    const response = await this.quizRepository.findAll();
    return response;
  }

  async findById(id: string): Promise<QuizResponseDTO> {
    if (!id) {
      throw new BadRequestException('id não enviado.');
    }

    const response = await this.quizRepository.findById(id);
    return response;
  }

  async findByIdAndUpdate(
    id: string,
    requesterId: string,
    quiz: Partial<QuizDTO>,
  ): Promise<QuizResponseDTO> {
    if (!id) {
      throw new BadRequestException('id não enviado.');
    }

    if (!quiz) {
      throw new BadRequestException('Quiz não enviado.');
    }

    const oldQuiz = await this.quizRepository.findById(id);

    if (oldQuiz.user_id !== requesterId) {
      throw new UnauthorizedException('Você não tem permissão de alterar o quiz de outros usuários.');
    }

    const response = await this.quizRepository.findByIdAndUpdate(id, quiz);
    return response;
  }

  async deleteById(id: string): Promise<string> {
    if (!id) {
      throw new BadRequestException('id não enviado.');
    }

    const response = await this.quizRepository.deleteById(id);
    return response;
  }

  async addQuestion(
    id: string,
    question: QuestionDTO,
  ): Promise<QuizResponseDTO> {
    if (!id) {
      throw new BadRequestException('id não enviado.');
    }

    if (!question) {
      throw new BadRequestException('Questão não enviada.');
    }

    const response = await this.quizRepository.addQuestion(id, question);
    return response;
  }

  async findQuestionByText(
    id: string,
    questionText: string,
  ): Promise<QuestionDTO> {
    if (!id) {
      throw new BadRequestException('id não enviado.');
    }

    if (!questionText) {
      throw new BadRequestException('Questão não enviada');
    }

    const response = await this.quizRepository.findQuestionByText(
      id,
      questionText,
    );
    return response;
  }

  async updateQuestion(
    id: string,
    questionText: string,
    updatedQuestion: Partial<QuestionDTO>,
  ): Promise<QuizResponseDTO> {
    if (!id || !questionText || !updatedQuestion) {
      throw new BadRequestException('Parâmetros não enviados');
    }

    const response = await this.quizRepository.updateQuestion(
      id,
      questionText,
      updatedQuestion,
    );

    return response;
  }

  async removeQuestion(
    id: string,
    questionText: string,
  ): Promise<QuizResponseDTO> {
    if (!id || !questionText) {
      throw new BadRequestException('Parâmetros não enviados');
    }

    const response = await this.quizRepository.removeQuestion(id, questionText);

    return response;
  }

  async answerQuestion(
    id: string,
    questionText: string,
    userAnswer: number | boolean,
  ): Promise<boolean> {
    if (!id || !questionText) {
      throw new BadRequestException('Parâmetros não enviados');
    }

    const response = await this.quizRepository.answerQuestion(
      id,
      questionText,
      userAnswer,
    );
    return response;
  }
}
