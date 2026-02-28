import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    paying: {
        type: Boolean,
        required: true,
    },
    is_admin: {
        type: Boolean,
        required: true,
    },
    answered_questions: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    token: String,
});