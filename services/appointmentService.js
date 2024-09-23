import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';

export async function createAppointmentService(appointmentData) {
    try {

        const appointment = new Appointment(appointmentData);
        const savedAppointment = await appointment.save();
        return savedAppointment;
    } catch (error) {
        console.error('Error in createAppointmentService:', error);
        throw error;
    }
}

// Get all active appointments (excluding canceled or completed)
export async function getAppointmentsService() {
    try {
        return await Appointment.find({
            status: { $in: ['pending', 'scheduled'] }
        })
            .populate('provider')
            .populate('consumer');
    } catch (error) {
        console.error('Error in getAppointmentsService:', error);
        throw error;
    }
}

export async function getAppointmentByIdService(id) {
    try {
        return await Appointment.findById(id)
            .populate('provider')
            .populate('consumer');
    }
    catch (error) {
        console.error('Error in getAppointmentByIdService:', error);
        throw error;
    }
}

// Update an appointment by ID
export async function updateAppointmentService(id, updateData) {
    try {
        return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.error('Error in getAppointmentByIdService:', error);
        throw error;
    }
}

// Delete an appointment by ID
export async function deleteAppointmentService(id) {
    try {
        const result = await Appointment.findByIdAndDelete(id);
        return result ? true : false;
    } catch (error) {
        console.error('Error in deleteAppointmentService:', error);
        throw error;
    }
}

// services/appointmentService.js

export async function countCompletedAppointmentsForConsumerService(consumerId) {
    try {
        return await Appointment.countDocuments({
            consumer: consumerId,
            status: 'completed' // Only count completed appointments
        });
    } catch (error) {
        console.error('Error in countCompletedAppointmentsForConsumerService:', error);
        throw error;
    }
}

// services/appointmentService.js

export async function countCompletedAppointmentsForProviderService(providerId) {
    try {
        return await Appointment.countDocuments({
            provider: providerId,
            status: 'completed' // Only count completed appointments
        });
    } catch (error) {
        console.error('Error in countCompletedAppointmentsForProviderService:', error);
        throw error;
    }
}

// Get all appointments for a specific consumer
export async function getAppointmentsForConsumerService(consumerId) {
    return await Appointment.find({ consumer: consumerId })
        .populate({
            path: 'consumer',
            select: 'name age avatar district cow hen duck goat fish',
        })
        .populate({
            path: 'provider',
            select: 'name age avatar district designation organization experience',
        });
}

// Get all appointments for a specific provider
export async function getAppointmentsForProviderService(providerId) {
    return await Appointment.find({ provider: providerId })
        .populate({
            path: 'consumer',
            select: 'name age avatar district cow hen duck goat fish',
        })
        .populate({
            path: 'provider',
            select: 'name age avatar district designation organization experience',
        });
}


// Cancel an appointment (only if it's "pending" or "scheduled")
export const cancelAppointmentService = async (appointmentId) => {
    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            throw new Error('Appointment not found');
        }

        // Only allow cancellation if the appointment is "scheduled" or "pending"
        if (appointment.status !== 'scheduled' && appointment.status !== 'pending') {
            throw new Error('Appointment cannot be canceled at this stage');
        }

        // Update the status to canceled
        appointment.status = 'canceled';
        await appointment.save();

        return appointment;
    } catch (error) {
        throw error; // Propagate error to the controller
    }
};


// Service to get appointments by date for consumers or providers
export async function getAppointmentsByDateService(userId, role, date) {
    const startOfDay = new Date(date);
    // startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
        "appointmentSchedule.date": {
            $gte: startOfDay,
            $lte: endOfDay,
        },
    };

    if (role === 'consumer') {
        query.consumer = userId;
    } else if (role === 'provider') {
        query.provider = userId;
    }

    return await Appointment.find(query)
        .populate({
            path: 'consumer',
            select: 'name age avatar district cow hen duck goat fish',
        })
        .populate({
            path: 'provider',
            select: 'name age avatar district designation organization experience',
        });
}



export async function getAvailableSlotsForProviderService(providerId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00)

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
        provider: providerId,
        appointmentSchedule: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
    });

    const availableSlots = [];
    const slotDuration = 60;
    const openingHour = 9;
    const closingHour = 17;

    for (let hour = openingHour; hour < closingHour; hour++) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

        // Check if this slot conflicts with any booked appointment
        const isBooked = appointments.some(appointment => {
            const appointmentStart = new Date(appointment.appointmentSchedule);
            const appointmentEnd = new Date(appointmentStart);
            appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appointment.duration);

            return (
                (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
                (slotEnd > appointmentStart && slotEnd <= appointmentEnd)
            );
        });

        if (!isBooked) {
            availableSlots.push({
                start: slotStart,
                end: slotEnd,
            });
        }
    }

    return availableSlots;
}