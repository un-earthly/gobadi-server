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


export async function getAppointmentsService() {
    return await Appointment.find()
        .populate('provider')
        .populate('consumer');
}

export async function getAppointmentByIdService(id) {
    return await Appointment.findById(id)
        .populate('provider')
        .populate('consumer');
}

// Update an appointment by ID
export async function updateAppointmentService(id, updateData) {
    return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete an appointment by ID
export async function deleteAppointmentService(id) {
    const result = await Appointment.findByIdAndDelete(id);
    return result ? true : false;
}

// Get all appointments for a specific consumer
export async function getAppointmentsForConsumerService(consumerId) {
    return await Appointment.find({ consumer: consumerId })
        .populate('provider', ["avatar", 'name'])
        .populate('consumer', ["avatar", 'name']);
}

// Get all appointments for a specific provider
export async function getAppointmentsForProviderService(providerId) {
    return await Appointment.find({ provider: providerId })
        .populate('provider', ["avatar", 'name'])
        .populate('consumer', ["avatar", 'name'])
}
