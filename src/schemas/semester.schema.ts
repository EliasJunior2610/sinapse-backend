import { Schema } from "mongoose";

export const semesterSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});