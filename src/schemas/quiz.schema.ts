import { Schema } from 'mongoose';

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
    type: String,
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
    },
  ],
  categories_ids: [String],
});
