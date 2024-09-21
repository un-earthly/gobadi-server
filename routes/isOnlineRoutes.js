import express from 'express';
import { getOnlineUsersController, updateStatusController } from '../controllers/isOnlineController.js';

const router = express.Router();
router.get('/online-users', getOnlineUsersController);
router.put('/status', updateStatusController);

export default router;
