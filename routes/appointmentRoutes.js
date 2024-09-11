import express from 'express';
import {
    createAppointment, getAppointments, getAppointmentById,
    getAppointmentsForConsumer, getAppointmentsForProvider, updateAppointment
} from '../controllers/appointmentController.js';
const router = express.Router();


// Routes for appointments
router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
// router.delete('/:id', deleteAppointment);

// Routes for specific consumer and provider
router.get('/consumer/:consumerId', getAppointmentsForConsumer);
router.get('/provider/:providerId', getAppointmentsForProvider);
export default router;
