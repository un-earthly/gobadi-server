import express from 'express';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import { authUser, registerUser, updatePassword } from '../controllers/authController.js';

const authRoute = express.Router();


authRoute.post("/register", registerUser);
authRoute.post("/login", authUser);
authRoute.put("/update-password", updatePassword); 

authRoute.use('/admin', adminRouter);

export default authRoute;
