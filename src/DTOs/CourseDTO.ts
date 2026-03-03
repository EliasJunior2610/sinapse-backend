// import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export interface CourseDTO {
    name: string;
    description: string;
    user_id: Types.ObjectId; // course creator
    quizzes_ids: Types.ObjectId[];
    students_ids: Types.ObjectId[];
    categories_ids?: Types.ObjectId[];
    visibility: boolean;
    ranking: {
        user_id: Types.ObjectId;
        answered_questions: number;
        correct_answers: number;
    }[];
}