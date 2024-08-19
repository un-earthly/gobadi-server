import express from 'express';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import { authUser, registerUser } from '../controllers/authController.js';

const authRoute = express.Router();


authRoute.post("/register", registerUser);
authRoute.post("/login", authUser);
authRoute.use('/admin', adminRouter);

export default authRoute;
