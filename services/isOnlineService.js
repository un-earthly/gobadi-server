import User from "../models/User.js";

export const getAllOnlineUsers = async () => {
    try {
        const onlineUsers = await User.find({ isOnline: true });
        return onlineUsers;
    } catch (error) {
        throw new Error('Failed to retrieve online users');
    }
};


export const updateUserStatus = async (userId, isOnline) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { isOnline },
            { new: true }
        );
        return user;
    } catch (error) {
        throw new Error('Failed to update user status');
    }
};