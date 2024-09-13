// services/reviewService.js
import { Types } from 'mongoose';
import Review from '../models/Review.js';
import User from '../models/User.js';

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
    async getAverageRatingForProvider(providerId) {
        const result = await Review.aggregate([
            { $match: { providerId: new Types.ObjectId(providerId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ]);
        return result.length > 0 ? result[0].averageRating : 0;
    }

    async calculatePointsForProvider(providerId) {
        const averageRating = await this.getAverageRatingForProvider(providerId);
        const serviceCount = await User.findById(providerId).select('serviceCount');

        const points = (averageRating * 20) + (serviceCount * 5);

        return Math.round(points);
    }
}

export default new ReviewService();