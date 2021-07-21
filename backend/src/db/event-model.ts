import { model, Schema } from 'mongoose';

/**
 * Minimal Mongoose schema that accepts one field: event, which can be anything
 * Gives us flexibility in what to track
 */
const eventSchema = new Schema({ event: Object });
export const EventModel = model('Event', eventSchema);
