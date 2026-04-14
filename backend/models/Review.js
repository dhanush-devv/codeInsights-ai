import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  language: { type: String, default: 'text' },
  originalCode: { type: String, required: true },
  issues: { type: Array, default: [] },
  improvedCode: { type: String, required: true },
  explanation: { type: String, required: true },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Review', reviewSchema);
