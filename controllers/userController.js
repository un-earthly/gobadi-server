import * as userService from "../services/userService.js"
export const getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const reviews = await userService.getUserReviews(req.params.id);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, description, serviceTime } = req.body;
        const user = await userService.updateUser(req.params.id, { name, description, serviceTime });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserRating = async (req, res) => {
    try {
        const rating = await userService.getUserRating(req.params.id);
        res.json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await userService.getServiceRequests(req.params.id);
        res.json(serviceRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};