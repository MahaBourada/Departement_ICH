import express from "express";
import {
  getAllCollabs,
  getCollab,
  addCollab,
  updateCollab,
  deleteCollab,
  getCollabsByLangType,
} from "../controllers/collaborations.js";
import { validateCollab } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllCollabs);
router.get("/content", getCollabsByLangType);
router.get("/:idCollab", getCollab);
router.post("/", verifyJWT, validateCollab, handleValidationErrors, addCollab);
router.put(
  "/:idCollab",
  verifyJWT,
  validateCollab,
  handleValidationErrors,
  updateCollab
);
router.delete("/:idCollab", verifyJWT, deleteCollab);

export default router;
