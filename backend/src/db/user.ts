import { model, Schema } from 'mongoose';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

/**
 * Minimal Mongoose schema that accepts one field: event, which can be anything
 * Gives us flexibility in what to track
 */
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
  },
});
export const UserModel = model('User', userSchema);
