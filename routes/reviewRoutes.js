// routes/reviewRoutes.js
import express from 'express';
import ReviewController from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', ReviewController.getAllReviews);
router.get('/:id/provider', ReviewController.getReviewByIdProviderId);
router.get('/:id/consumer', ReviewController.getReviewByIdConsumerId);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.patch('/:id', ReviewController.partialUpdateReview);
router.get('/average-rating/:providerId', ReviewController.getAverageRating);
router.get('/points/:providerId', ReviewController.getProviderPoints);
export default router;