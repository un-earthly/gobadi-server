// controllers/reviewController.js
import ReviewService from '../services/reviewService.js';

class ReviewController {
    async getAllReviews(req, res) {
        try {
            const reviews = await ReviewService.getAllReviews();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReviewById(req, res) {
        try {
            const review = await ReviewService.getReviewById(req.params.id);
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createReview(req, res) {
        try {
            const review = await ReviewService.createReview(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateReview(req, res) {
        try {
            const review = await ReviewService.updateReview(req.params.id, req.body);
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async partialUpdateReview(req, res) {
        try {
            const review = await ReviewService.partialUpdateReview(req.params.id, req.body);
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAverageRating(req, res) {
        try {
            const providerId = req.params.providerId;
            const averageRating = await ReviewService.getAverageRatingForProvider(providerId);
            res.json({ averageRating });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProviderPoints(req, res) {
        try {
            const providerId = req.params.providerId;
            const points = await ReviewService.calculatePointsForProvider(providerId);
            res.json({ points });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ReviewController();