import Review from '../models/Review.js';
import { analyzeCodeWithGemini } from '../utils/gemini.js';

export const analyzeCode = async (req, res) => {
  try {
    const { code, language, title } = req.body;
    
    if (!code) {
      return res.status(400).json({ message: 'Code is required for analysis' });
    }

    const aiResult = await analyzeCodeWithGemini(code);

    const newReview = await Review.create({
      userId: req.user.id,
      title: title || 'Untitled Code Review',
      language,
      originalCode: code,
      issues: aiResult.issues || [],
      improvedCode: aiResult.improvedCode || '',
      explanation: aiResult.explanation || '',
      score: aiResult.score || 0
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
    // Only allow user who created it to see it
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
