import User from '../models/User.js';
import Review from '../models/Review.js';

export const getUserById = async (userId) => {
    return await User.findById(userId).select('-password -devPass');
};

export const getUserReviews = async (userId) => {
    return await Review.find({ providerId: userId })
        .populate('userId', 'name image')
        .sort('-createdAt')
        .limit(5);
};

export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password -devPass');
};

export const getUserRating = async (userId) => {
    const reviews = await Review.find({ providerId: userId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    return { rating: averageRating.toFixed(1) };
};

export const getServiceRequests = async (userId) => {
    return { message: 'Service requests endpoint (to be implemented)' };
};

export const getServiceProviders = async () => {
    return await User.find({ role: 'provider' }).select('-password');
};