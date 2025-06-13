import express from "express";
import {
  addProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controllers/projects.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:idProjet", getProject);
router.post("/", addProject);
router.put("/:idProjet", updateProject);
router.delete("/:idProjet", deleteProject);

export default router;
