// routes/menuRoutes.js
import express from 'express';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

router.get('/items', menuController.getMenuItems);
router.get('/items/:id/categories', menuController.getMenuItemCategories);

export default router;