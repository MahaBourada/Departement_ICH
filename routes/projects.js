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
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:idProjet", getProject);
router.post(
  "/",
  verifyJWT,
  validateProject,
  handleValidationErrors,
  addProject
);
router.put(
  "/:idProjet",
  verifyJWT,
  validateProject,
  handleValidationErrors,
  updateProject
);
router.delete("/:idProjet", verifyJWT, deleteProject);

export default router;
