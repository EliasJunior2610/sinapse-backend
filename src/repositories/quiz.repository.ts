import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import mongoose from "src/config/mongodb";
import { QuizDTO, QuizResponseDTO, QuestionDTO } from "src/DTOs/QuizDTO";
import { quizSchema } from "src/schemas/quiz.schema";

@Injectable()
export class QuizRepository {
    private Quiz = mongoose.model('Quiz', quizSchema);

    async insertOne(quiz: QuizDTO): Promise<QuizResponseDTO> {
        const quizExists = await this.Quiz.findOne({ name: quiz.name });
        if (quizExists) {
            throw new BadRequestException('Já existe um quiz com esse nome.');
        }

        const doc = new this.Quiz(quiz);
        const response = await doc.save();

        return {
            _id: response._id,
            name: response.name,
            description: response.description,
            user_id: response.user_id,
            questions: response.questions.map((q: any) => ({
                question: q.question,
                possible_answers: q.possible_answers,
                answer: q.answer,
                boolean_answer: q.boolean_answer,
            })),
            categories_ids: response.categories_ids?.map((id: any) => id),
        };
    }

    async findAll(): Promise<QuizResponseDTO[]> {
        const quizzes = await this.Quiz.find({}).lean();

        return quizzes.map(quiz => ({
            _id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            user_id: quiz.user_id,
            questions: quiz.questions.map((q: any) => ({
                question: q.question,
                possible_answers: q.possible_answers,
                answer: q.answer,
                boolean_answer: q.boolean_answer,
            })),
            categories_ids: quiz.categories_ids?.map((id: any) => id),
        }));
    }

    async findById(id: string): Promise<QuizResponseDTO> {
        const quiz = await this.Quiz.findById(id);

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado');
        }

        return {
            _id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            user_id: quiz.user_id,
            questions: quiz.questions.map((q: any) => ({
                question: q.question,
                possible_answers: q.possible_answers,
                answer: q.answer,
                boolean_answer: q.boolean_answer,
            })),
            categories_ids: quiz.categories_ids?.map((id: any) => id),
        };
    }

    async findByIdAndUpdate(id: string, updatedQuiz: Partial<QuizDTO>): Promise<QuizResponseDTO> {
        const quiz = await this.Quiz.findByIdAndUpdate(
            id,
            { $set: updatedQuiz },
            { new: true }
        ).lean();

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado.');
        }

        return {
            _id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            user_id: quiz.user_id,
            questions: quiz.questions.map((q: any) => ({
                question: q.question,
                possible_answers: q.possible_answers,
                answer: q.answer,
                boolean_answer: q.boolean_answer,
            })),
            categories_ids: quiz.categories_ids?.map((id: any) => id),
        };
    }

    // INCOMPLETO - múltiplas escolhas não funcionam ainda
    async addQuestion(id: string, question: QuestionDTO): Promise<QuizResponseDTO> {
        const quiz = await this.Quiz.findByIdAndUpdate(
            id,
            {
                $push: { questions: question },
            },
            { new: true },
        ).lean();

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado.');
        }

        return {
            _id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            user_id: quiz.user_id,
            questions: quiz.questions.map((q: any) => ({
                question: q.question,
                possible_answers: q.possible_answers,
                answer: q.answer,
                boolean_answer: q.boolean_answer,
            })),
            categories_ids: quiz.categories_ids?.map((id: any) => id),
        };
    }
}