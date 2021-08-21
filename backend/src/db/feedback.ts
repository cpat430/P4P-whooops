import { model, Schema } from 'mongoose';

export type Feedback = {
  id: string;
  email: string;
  question: string;
  rating: number;
  answer?: string;
};

/**
 * Schema for having feedback from the user after finishing their
 * challenges.
 */
const feedbackSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  answer: String,
});

export const FeedbackModel = model('Feedback', feedbackSchema);
