// routes/userRoutes.js
import express from "express";
import {
    getServiceRequests,
    getUserProfile,
    getUserRating,
    getUserReviews,
    updateUserProfile
} from "../controllers/userController.js"
const router = express.Router();

// Public routes
router.get('/:id', getUserProfile);
router.get('/:id/reviews', getUserReviews);
router.put('/:id', updateUserProfile);
router.get('/:id/rating', getUserRating);
router.get('/:id/service-requests', getServiceRequests);
export default router;
