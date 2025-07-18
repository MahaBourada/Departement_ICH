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

const router = express.Router();

router.get("/", getAllCollabs);
router.get("/content", getCollabsByLangType);
router.get("/:idCollab", getCollab);
router.post("/", validateCollab, handleValidationErrors, addCollab);
router.put("/:idCollab", validateCollab, handleValidationErrors, updateCollab);
router.delete("/:idCollab", deleteCollab);

export default router;
