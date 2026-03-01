import { Types } from "mongoose";

export interface QuizDTO {
    name: string;
    description: string;
    user_id: Types.ObjectId; // quiz creator
    questions?: {
        question: string;
        possible_answers?: string[]; // when there are multiple choices
        answer?: number; // when there are multiple choices
        boolean_answer?: boolean; // when it's a boolean question
    }[];
    categories_ids?: Types.ObjectId[];
}

export interface QuizResponseDTO {
    _id: Types.ObjectId;
    name: string;
    description: string;
    user_id: Types.ObjectId; // quiz creator
    questions: {
        question: string;
        possible_answers?: string[]; // when there are multiple choices
        answer?: number; // when there are multiple choices
        boolean_answer?: boolean; // when it's a boolean question
    }[];
    categories_ids?: Types.ObjectId[];
}

export interface QuestionDTO {
    question: string;
    possible_answers?: string[]; // when there are multiple choices
    answer?: number; // when there are multiple choices
    boolean_answer?: boolean; // when it's a boolean question
}