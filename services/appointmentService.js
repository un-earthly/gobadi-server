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
            status: { $in: ['pending', 'scheduled'] } // Return only active appointments
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

        return appointment;  // Return updated appointment
    } catch (error) {
        throw error; // Propagate error to the controller
    }
};