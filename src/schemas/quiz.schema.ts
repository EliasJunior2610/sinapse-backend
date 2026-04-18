import { Schema, Types } from 'mongoose';

export const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: Types.ObjectId,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      possible_answers: {
        type: [String],
        default: [],
      },
      answer: [Number],
      boolean_answer: Boolean,
      weight: Number,
    },
  ],
  categories_ids: [String],
});
