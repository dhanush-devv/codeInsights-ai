import express from 'express';
import { analyzeCode, getHistory, getSingleReview } from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', protect, analyzeCode);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getSingleReview);

export default router;
