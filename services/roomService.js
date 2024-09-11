import Appointment from "../models/Appointment.js";

export const getRoomsForProvider = async (providerId) => {
    return Appointment.find({
        provider: providerId,
        appointmentSchedule: { $exists: true, $ne: null },
        status: 'scheduled',
        paymentMethod: { $exists: true, $ne: null }
    })
        .select('_id category subCategory title consumer appointmentSchedule')
        .populate('consumer', ['name', 'mobile']);
};

export const getRoomsForConsumer = async (consumerId) => {
    return Appointment.find({
        consumer: consumerId,
        appointmentSchedule: { $exists: true, $ne: null },
        status: 'scheduled',
        paymentMethod: { $exists: true, $ne: null }
    })
        .select('_id category subCategory title provider appointmentSchedule')
        .populate('provider', ['name', 'mobile']);
};

export const getRoom = async (roomId, userId) => {
    const room = await Appointment.findOne({
        _id: roomId,
        $or: [{ provider: userId }, { consumer: userId }],
        appointmentSchedule: { $exists: true, $ne: null },
        status: 'scheduled',
        paymentMethod: { $exists: true, $ne: null }
    }).select('_id category subCategory title provider consumer appointmentSchedule')
        .populate('provider', ['name', 'mobile'])
        .populate('consumer', ['name', 'mobile']);

    return room;
};

const roomService = {
    getRoomsForProvider,
    getRoomsForConsumer,
    getRoom,
};

export default roomService;