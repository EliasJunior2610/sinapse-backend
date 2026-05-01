import { Schema } from 'mongoose';

export const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  semesters_ids: [String],
});
