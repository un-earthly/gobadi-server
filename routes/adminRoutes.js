// routes/adminRoutes.js
import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-admin", protect, isAdmin, (req, res) => {
  res.status(200).json({ message: "Admin access granted" });
});

export default router;
