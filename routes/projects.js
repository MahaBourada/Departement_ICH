import express from "express";
import {
  addProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controllers/projects.js";
import { validateProject } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:idProjet", getProject);
router.post("/", validateProject, handleValidationErrors, addProject);
router.put(
  "/:idProjet",
  validateProject,
  handleValidationErrors,
  updateProject
);
router.delete("/:idProjet", deleteProject);

export default router;
