import { Types } from "mongoose";
export interface UserDTO {
    name: string;
    email: string;
    password: string;
    paying: boolean;
    is_admin: boolean;
    answered_questions: number;
    points: number;
    token?: string;
}

export interface UserResponseDTO {
    _id: Types.ObjectId;
    name: string;
    email: string;
    paying: boolean;
    answered_questions: number;
    points: number;
}