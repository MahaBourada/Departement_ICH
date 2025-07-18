import express from "express";
import {
  addPrix,
  deletePrix,
  getAllPrix,
  getOnePrix,
  updatePrix,
} from "../controllers/prix.js";
import { validatePrix } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.get("/", getAllPrix);
router.get("/:idPrix", getOnePrix);
router.post("/", validatePrix, handleValidationErrors, addPrix);
router.put("/:idPrix", validatePrix, handleValidationErrors, updatePrix);
router.delete("/:idPrix", deletePrix);

export default router;
