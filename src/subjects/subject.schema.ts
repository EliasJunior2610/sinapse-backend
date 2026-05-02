import { Schema } from 'mongoose';

export const subjectSchema = new Schema({
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
  quizzes_ids: {
    type: [String],
    required: true,
  },
  students_ids: {
    type: [String],
    required: true,
  },
  semester_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  invitation_code: String,
  ranking: [
    {
      user_id: {
        type: String,
        required: true,
      },
      answered_questions: {
        type: Number,
        required: true,
      },
      correct_answers: {
        type: Number,
        required: true,
      },
    },
  ],
});
