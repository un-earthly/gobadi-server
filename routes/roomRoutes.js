import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getRoomsForProvider,
    getRoomsForConsumer,
    getRoom,
    initiateCall
} from '../controllers/roomController.js';

const router = express.Router();

router.get('/provider', protect, getRoomsForProvider);
router.get('/consumer', protect, getRoomsForConsumer);
router.get('/:roomId', protect, getRoom);
router.post('/:roomId/call', protect, initiateCall);

export default router;