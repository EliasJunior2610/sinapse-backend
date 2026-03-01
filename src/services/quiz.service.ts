import { QuizRepository } from "src/repositories/quiz.repository";
import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { QuestionDTO, QuizDTO, QuizResponseDTO } from "src/DTOs/QuizDTO";

@Injectable()
export class QuizService {
    constructor(private quizRepository: QuizRepository) { }

    async create(quiz: QuizDTO): Promise<QuizResponseDTO> {
        try {
            if (!quiz) throw new BadRequestException('quiz não enviado');

            const response = await this.quizRepository.insertOne(quiz);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao criar quiz.');
        }
    }

    async findAll(): Promise<QuizResponseDTO[]> {
        try {
            const response = await this.quizRepository.findAll();
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao buscar quizzes.');
        }
    }

    async findById(id: string): Promise<QuizResponseDTO> {
        try {
            if (!id) {
                throw new BadRequestException('id não enviado.')
            }

            const response = await this.quizRepository.findById(id);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao buscar pelo quiz.');
        }
    }

    async findByIdAndUpdate(id: string, quiz: Partial<QuizDTO>): Promise<QuizResponseDTO> {
        try {
            if (!id) {
                throw new BadRequestException('id não enviado.')
            }

            if (!quiz) {
                throw new BadRequestException('Quiz não enviado.');
            }

            const response = await this.quizRepository.findByIdAndUpdate(id, quiz);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar quiz');
        }
    }

    async deleteById(id: string): Promise<string> {
        try {
            if (!id) {
                throw new BadRequestException('id não enviado.')
            }

            const response = await this.quizRepository.deleteById(id);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao remover quiz.');
        }
    }

    // duas perguntas podem ter o mesmo texto!
    async addQuestion(id: string, question: QuestionDTO): Promise<QuizResponseDTO> {
        try {
            if (!id) {
                throw new BadRequestException('id não enviado.')
            }

            if (!question) {
                throw new BadRequestException('Questão não enviada.');
            }

            const response = await this.quizRepository.addQuestion(id, question);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao adicionar pergunta');
        }
    }

    async findQuestionByText(id: string, questionText: string): Promise<QuestionDTO> {
        try {
            if (!id) {
                throw new BadRequestException('id não enviado.');
            }

            if (!questionText) {
                throw new BadRequestException('Questão não enviada');
            }

            const response = await this.quizRepository.findQuestionByText(id, questionText);
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao retornar pergunta');
        }
    }

    async updateQuestion(
        id: string,
        questionText: string,
        updatedQuestion: Partial<QuestionDTO>,
    ): Promise<QuizResponseDTO> {
        try {
            if (!id || !questionText || !updatedQuestion) {
                throw new BadRequestException('Parâmetros não enviados');
            }

            const response = await this.quizRepository.updateQuestion(
                id,
                questionText,
                updatedQuestion,
            );

            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar pergunta');
        }
    }

    async removeQuestion(id: string, questionText: string): Promise<QuizResponseDTO> {
        try {
            if (!id || !questionText) {
                throw new BadRequestException('Parâmetros não enviados');
            }

            const response = await this.quizRepository.removeQuestion(id, questionText);

            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao remover a pergunta');
        }
    }

    async answerQuestion(
        id: string,
        questionText: string,
        userAnswer: number | boolean,
    ): Promise<boolean> {
        try {
            if (!id || !questionText) {
                throw new BadRequestException('Parâmetros não enviados');
            }

            const response = await this.quizRepository.answerQuestion(
                id,
                questionText,
                userAnswer,
            );
            return response;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro ao responder a pergunta');
        }
    }
}