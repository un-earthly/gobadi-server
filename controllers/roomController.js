import roomService from "../services/roomService.js";

export const getRoomsForProvider = async (req, res) => {
    try {
        const providerId = req.user._id;
        const rooms = await roomService.getRoomsForProvider(providerId);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms', error: error.message });
    }
};

export const getRoomsForConsumer = async (req, res) => {
    try {
        const consumerId = req.user._id;
        const rooms = await roomService.getRoomsForConsumer(consumerId);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms', error: error.message });
    }
};

export const getRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user._id;
        const room = await roomService.getRoom(roomId, userId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found or access denied' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching room', error: error.message });
    }
};