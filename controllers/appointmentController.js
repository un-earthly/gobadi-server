import {
    createAppointmentService,
    getAppointmentsService,
    getAppointmentByIdService,
    updateAppointmentService,
    deleteAppointmentService,
    cancelAppointmentService,
    countCompletedAppointmentsForProviderService,
    countCompletedAppointmentsForConsumerService,
    getAppointmentsForConsumerService,
    getAppointmentsForProviderService,
    getAppointmentsByDateService,
    getAvailableSlotsForProviderService
} from '../services/appointmentService.js';

// Create a new appointment
// export async function createAppointment(req, res) {
//     try {
//         const appointment = await createAppointmentService(req.body);
//         res.status(201).json(appointment);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

// Get all appointments
export async function getAppointments(req, res) {
    try {
        const appointments = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a single appointment by ID
export async function getAppointmentById(req, res) {
    try {
        const appointment = await getAppointmentByIdService(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update an appointment by ID
export async function updateAppointment(req, res) {
    try {
        const appointment = await updateAppointmentService(req.params.id, req.body);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete an appointment by ID
export async function deleteAppointment(req, res) {
    try {
        const result = await deleteAppointmentService(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAppointmentsCountsForConsumer(req, res) {
    try {
        const count = await countCompletedAppointmentsForConsumerService(req.params.consumerId);
        res.status(200).json({ count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Get all appointments for a specific provider
export async function getAppointmentCountsForProvider(req, res) {
    try {
        const appointments = await countCompletedAppointmentsForProviderService(req.params.providerId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        // Call the service function to handle the cancel logic
        const updatedAppointment = await cancelAppointmentService(id);

        return res.status(200).json({
            message: 'Appointment canceled successfully',
            appointment: updatedAppointment,
        });
    } catch (error) {
        // Handle errors from the service layer
        if (error.message === 'Appointment not found') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Appointment cannot be canceled at this stage') {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Error canceling appointment', error });
        }
    }
};



// Get all appointments for a specific consumer
export async function getAppointmentsForConsumer(req, res) {
    try {
        const appointments = await getAppointmentsForConsumerService(req.params.consumerId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all appointments for a specific provider
export async function getAppointmentsForProvider(req, res) {
    try {
        const appointments = await getAppointmentsForProviderService(req.params.providerId);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Get appointments by date for a specific consumer
export async function getAppointmentsByDateForConsumer(req, res) {
    try {
        const consumerId = req.params.consumerId;
        let { date } = req.query;

        if (!date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            date = today;
        } else {
            date = new Date(date);
        }

        const appointments = await getAppointmentsByDateService(consumerId, 'consumer', date);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get appointments by date for a specific provider
export async function getAppointmentsByDateForProvider(req, res) {
    try {
        const providerId = req.params.providerId;
        let { date } = req.query;

        // Default to today's date if no date is provided
        if (!date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to 00:00:00
            date = today;
        } else {
            date = new Date(date); // Convert the query string into a Date object
        }

        console.log(date)
        const appointments = await getAppointmentsByDateService(providerId, 'provider', date);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



export async function getAvailableSlotsForProvider(req, res) {
    try {
        const { date, providerId } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }

        const availableSlots = await getAvailableSlotsForProviderService(providerId, new Date(date));

        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// New controller function to check provider availability
export async function checkAvailability(req, res) {
    try {
        const { providerId, date, startTime, endTime } = req.query;
        const isAvailable = await checkProviderAvailability(providerId, date, startTime, endTime);
        res.status(200).json({ isAvailable });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// New controller function to get provider's schedule
export async function getProviderDaySchedule(req, res) {
    try {
        const { providerId, date } = req.params;
        const schedule = await getProviderSchedule(providerId, date);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Modify createAppointment to handle potential scheduling conflicts
export async function createAppointment(req, res) {
    try {
        const appointment = await createAppointmentService(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        if (error.message === 'The selected time slot is not available.') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
}

// New controller function to reschedule an appointment
export async function rescheduleAppointment(req, res) {
    try {
        const { id } = req.params;
        const { newSchedule } = req.body;
        const updatedAppointment = await rescheduleAppointmentService(id, newSchedule);
        res.status(200).json(updatedAppointment);
    } catch (error) {
        if (error.message === 'The selected time slot is not available for rescheduling.') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
}