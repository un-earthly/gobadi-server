import { getAllOnlineUsers, updateUserStatus } from "../services/isOnlineService.js";

export const updateStatusController = async (req, res) => {
    const { userId, isOnline } = req.body;

    try {
        const updatedUser = await updateUserStatus(userId, isOnline);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: `User is now ${isOnline ? 'online' : 'offline'}`,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOnlineUsersController = async (req, res) => {
    try {
        const onlineUsers = await getAllOnlineUsers();
        res.status(200).json({
            message: 'Online users retrieved successfully',
            users: onlineUsers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};