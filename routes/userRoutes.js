// routes/userRoutes.js
import express from "express";
import {
    getServiceRequests,
    getUserProfile,
    getUserRating,
    getUserReviews,
    getUserServiceProviders,
    updateUserProfile
} from "../controllers/userController.js"
const router = express.Router();
import User from '../models/User.js';  // Adjust the path as needed
import { isAdmin, protect } from '../middleware/authMiddleware.js';

// Public routes
router.get("/service-providers", getUserServiceProviders);
router.get('/:id', getUserProfile);
router.get('/:id/reviews', getUserReviews);
router.put('/:id', updateUserProfile);
router.get('/:id/rating', getUserRating);
router.get('/:id/service-requests', getServiceRequests);

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, isAdmin, async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
router.get('/users/:id', protect, isAdmin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Private/Admin
router.post('/users', protect, isAdmin, async (req, res, next) => {
    try {
        const {
            mobile, password, role, name, age, district, avatar, nid,
            designation, organization, experience, bio, specialization,
            availableTime, cow, hen, fish, duck, goat, isOnline, fee
        } = req.body;

        const userExists = await User.findOne({ mobile });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            mobile, password, role, name, age, district, avatar, nid,
            designation, organization, experience, bio, specialization,
            availableTime, cow, hen, fish, duck, goat, isOnline, fee
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                mobile: user.mobile,
                role: user.role,
                name: user.name
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
router.put('/users/:id', protect, isAdmin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.mobile = req.body.mobile || user.mobile;
            user.role = req.body.role || user.role;
            user.name = req.body.name || user.name;
            user.age = req.body.age || user.age;
            user.district = req.body.district || user.district;
            user.avatar = req.body.avatar || user.avatar;
            user.nid = req.body.nid || user.nid;
            user.designation = req.body.designation || user.designation;
            user.organization = req.body.organization || user.organization;
            user.experience = req.body.experience || user.experience;
            user.bio = req.body.bio || user.bio;
            user.specialization = req.body.specialization || user.specialization;
            user.availableTime = req.body.availableTime || user.availableTime;
            user.cow = req.body.cow ?? user.cow;
            user.hen = req.body.hen ?? user.hen;
            user.fish = req.body.fish ?? user.fish;
            user.duck = req.body.duck ?? user.duck;
            user.goat = req.body.goat ?? user.goat;
            user.isOnline = req.body.isOnline ?? user.isOnline;
            user.fee = req.body.fee ?? user.fee;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
                name: updatedUser.name
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, isAdmin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
});
// Toggle online status
router.patch('/toggle-online-status', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the isOnline status
        user.isOnline = !user.isOnline;
        await user.save();

        res.json({ isOnline: user.isOnline });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


export default router;
