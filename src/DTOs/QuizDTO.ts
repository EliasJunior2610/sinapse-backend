import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class QuizDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    user_id: Types.ObjectId; // quiz creator
    @ApiProperty()
    questions?: {
        question: string;
        possible_answers?: string[]; // when there are multiple choices
        answer?: number; // when there are multiple choices
        boolean_answer?: boolean; // when it's a boolean question
    }[];
    @ApiProperty()
    categories_ids?: Types.ObjectId[];
}

export class QuizResponseDTO {
    @ApiProperty()
    _id: Types.ObjectId;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    user_id: Types.ObjectId; // quiz creator
    @ApiProperty()
    questions: {
        question: string;
        possible_answers?: string[]; // when there are multiple choices
        answer?: number; // when there are multiple choices
        boolean_answer?: boolean; // when it's a boolean question
    }[];
    @ApiProperty()
    categories_ids?: Types.ObjectId[];
}

export class QuestionDTO {
    @ApiProperty()
    question: string;
    @ApiProperty()
    possible_answers?: string[]; // when there are multiple choices
    @ApiProperty()
    answer?: number; // when there are multiple choices
    @ApiProperty()
    boolean_answer?: boolean; // when it's a boolean question
}