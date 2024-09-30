import express from 'express';
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    getAppointmentCountsForProvider,
    getAppointmentsCountsForConsumer,
    getAppointmentsForConsumer,
    getAppointmentsForProvider,
    getAppointmentsByDateForProvider,
    getAppointmentsByDateForConsumer,
    getAvailableSlotsForProvider,
    checkAvailability,
    getProviderDaySchedule,
    rescheduleAppointment
} from '../controllers/appointmentController.js';
const router = express.Router();


router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.patch('/:id/cancel', cancelAppointment);

router.get('/consumer/:consumerId', getAppointmentsForConsumer);
router.get('/provider/:providerId', getAppointmentsForProvider);

router.get('/consumer/:consumerId/count', getAppointmentsCountsForConsumer);
router.get('/provider/:providerId/count', getAppointmentCountsForProvider);

router.get('/consumer/:consumerId/day', getAppointmentsByDateForConsumer);
router.get('/provider/:providerId/day', getAppointmentsByDateForProvider);
router.get('/provider/:providerId/available-slots/:date', getAvailableSlotsForProvider);

router.get('/check-availability', checkAvailability);
router.get('/provider/:providerId/schedule/:date', getProviderDaySchedule);
router.patch('/:id/reschedule', rescheduleAppointment);
export default router;
