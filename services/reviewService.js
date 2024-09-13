// services/reviewService.js
import Review from '../models/Review.js';

class ReviewService {
    async getAllReviews() {
        return await Review.find().populate('userId', 'name').populate('providerId', 'name');
    }

    async getReviewById(id) {
        return await Review.findById(id).populate('userId', 'name').populate('providerId', 'name');
    }

    async createReview(reviewData) {
        const review = new Review(reviewData);
        return await review.save();
    }

    async updateReview(id, updateData) {
        return await Review.findByIdAndUpdate(id, updateData, { new: true });
    }

    async partialUpdateReview(id, updateData) {
        return await Review.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    }
}

export default new ReviewService();