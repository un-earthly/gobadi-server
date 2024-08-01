// routes/projectRoutes.js
import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getProjects);

// Protected routes for admin
router.post("/", protect, admin, createProject);
router.put("/:id", protect, admin, updateProject);
router.delete("/:id", protect, admin, deleteProject);

export default router;
