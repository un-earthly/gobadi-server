import express from 'express';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';

const authRoute = express.Router();

authRoute.use('/user', userRouter);
authRoute.use('/admin', adminRouter);

export default authRoute;
