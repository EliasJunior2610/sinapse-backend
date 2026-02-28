import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    paying: Boolean,
    is_admin: Boolean,
    answered_questions: Number,
    points: Number,
    token: String,
});