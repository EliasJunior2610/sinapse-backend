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
            _id: response._id.toString(),
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
            _id: quiz._id.toString(),
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
            _id: quiz._id.toString(),
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
            _id: quiz._id.toString(),
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

    async deleteById(id: string): Promise<string> {
        const quiz = await this.Quiz.findByIdAndDelete(id);

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado');
        }

        return 'Quiz removido com sucesso';
    }

    async addQuestion(id: string, question: QuestionDTO): Promise<QuizResponseDTO> {
        if (question.possible_answers && !Array.isArray(question.possible_answers)) {
            throw new BadRequestException('possible_answers deve ser um array');
        }

        const questionExists = await this.Quiz.findOne({
            _id: id,
            'questions.question': question.question,
        });

        if (questionExists) {
            throw new BadRequestException('Essa pergunta já existe nesse quiz.');
        }

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
            _id: quiz._id.toString(),
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

    async findQuestionByText(id: string, questionText: string): Promise<QuestionDTO> {
        const quiz = await this.Quiz.findById(id).lean();

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado');
        }

        const question = quiz.questions.find(
            (q: any) => q.question === questionText
        );

        if (!question) {
            throw new NotFoundException('Pergunta não encontrada');
        }

        return {
            question: question.question,
            possible_answers: question.possible_answers,
            answer: question.answer ?? undefined,
            boolean_answer: question.boolean_answer ?? undefined,
        }
    }

    async updateQuestion(
        id: string,
        questionText: string,
        updatedQuestion: Partial<QuestionDTO>,
    ): Promise<QuizResponseDTO> {
        const quiz = await this.Quiz.findOneAndUpdate(
            {
                _id: id,
                'questions.question': questionText,
            },
            {
                $set: {
                    'questions.$.question': updatedQuestion.question,
                    'questions.$.possible_answers': updatedQuestion.possible_answers,
                    'questions.$.answer': updatedQuestion.answer,
                    'questions.$.boolean_answer': updatedQuestion.boolean_answer,
                },
            },
            { new: true },
        ).lean();

        if (!quiz) {
            throw new NotFoundException('Pergunta ou quiz não encontrado');
        }

        return {
            _id: quiz._id.toString(),
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
        }
    }

    async removeQuestion(id: string, questionText: string): Promise<QuizResponseDTO> {
        const quiz = await this.Quiz.findByIdAndUpdate(
            id,
            {
                $pull: {
                    questions: { question: questionText },
                },
            },
            { new: true },
        ).lean();
        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado.');
        }

        return {
            _id: quiz._id.toString(),
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

    async answerQuestion(
        id: string,
        questionText: string,
        userAnswer: number | boolean,
    ): Promise<boolean> {
        const quiz = await this.Quiz.findById(id).lean();

        if (!quiz) {
            throw new NotFoundException('Quiz não encontrado');
        }

        const question = quiz.questions.find(
            (q: any) => q.question === questionText
        );

        if (!question) {
            throw new NotFoundException('Pergunta não encontrada.');
        }

        // Caso 1: múltipla escolha
        if (question.answer !== undefined && question.answer !== null) {
            if (typeof userAnswer !== 'number') {
                throw new BadRequestException('Resposta deve ser um número');
            }

            return question.answer === userAnswer;
        }

        // Caso 2: verdadeiro ou falso
        if (question.boolean_answer !== undefined && question.boolean_answer !== null) {
            if (typeof userAnswer !== 'boolean') {
                throw new BadRequestException('Resposta deve ser true ou false');
            }

            return question.boolean_answer === userAnswer;
        }

        // Caso inválido (pergunta mal configurada)
        throw new BadRequestException('Tipo de pergunta inválido');
    }
}