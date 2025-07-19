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
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllPrix);
router.get("/:idPrix", getOnePrix);
router.post("/", verifyJWT, validatePrix, handleValidationErrors, addPrix);
router.put(
  "/:idPrix",
  verifyJWT,
  validatePrix,
  handleValidationErrors,
  updatePrix
);
router.delete("/:idPrix", verifyJWT, deletePrix);

export default router;
