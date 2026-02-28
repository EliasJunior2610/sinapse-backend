import { BadRequestException, Injectable } from "@nestjs/common";
import mongoose from "src/config/mongodb";
import { QuizDTO } from "src/DTOs/QuizDTO";
import { quizSchema } from "src/schemas/quiz.schema";

@Injectable()
export class QuizRepository {
    private Quiz = mongoose.model('Quiz', quizSchema);

    async insertOne(quiz: QuizDTO): Promise<QuizDTO> {
        const quizExists = await this.Quiz.findOne({ name: quiz.name });
        if (quizExists) {
            throw new BadRequestException('Já existe um quiz com esse nome.');
        }

        const doc = new this.Quiz(quiz);
        const response = await doc.save();

        return {
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
}