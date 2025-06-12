import express from "express";
import { addProject, getAllProjects } from "../controllers/projects.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", addProject);

export default router;
