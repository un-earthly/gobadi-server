import express from 'express';
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    getAppointmentsForConsumer,
    updateAppointment,
    cancelAppointment,
    getAppointmentCountsForProvider
} from '../controllers/appointmentController.js';
const router = express.Router();


router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.patch('/:id/cancel', cancelAppointment);

router.get('/consumer/:consumerId', getAppointmentsForConsumer);
router.get('/provider/:providerId', getAppointmentCountsForProvider);
export default router;
