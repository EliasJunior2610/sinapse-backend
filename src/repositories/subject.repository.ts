import { Injectable } from "@nestjs/common";
import mongoose from "src/config/mongodb";
import { SubjectDTO, SubjectResponseDTO } from "src/DTOs/SubjectDTO";
import { subjectSchema } from "src/schemas/subject.schema";

@Injectable()
export class SubjectRepository {
    private Subject = mongoose.model('Subject', subjectSchema);

    async findAll(): Promise<SubjectResponseDTO[]> {
        const subjects = await this.Subject.find({}).lean();

        return subjects.map(subject => ({
            _id: subject._id.toString(),
            name: subject.name,
            description: subject.description,
            user_id: subject.user_id,
            quizzes_ids: subject.quizzes_ids,
            students_ids: subject.students_ids,
            ranking: subject.ranking.map((rank: any) => ({
                user_id: rank.user_id,
                answered_questions: rank.answered_questions,
                correct_answers: rank.correct_answers,
            })),
        }));
    }
}