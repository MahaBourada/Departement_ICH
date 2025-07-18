import express from "express";
import {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminById,
  updateAdmin,
} from "../controllers/admin.js";
import { validateAdmin } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:idAdmin", getAdminById);
router.post("/", validateAdmin, handleValidationErrors, addAdmin);
router.put("/:idAdmin", validateAdmin, handleValidationErrors, updateAdmin);
router.delete("/:idAdmin", deleteAdmin);

export default router;
