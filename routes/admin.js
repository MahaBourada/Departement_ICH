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
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:idAdmin", getAdminById);
router.post("/", verifyJWT, validateAdmin, handleValidationErrors, addAdmin);
router.put(
  "/:idAdmin",
  verifyJWT,
  validateAdmin,
  handleValidationErrors,
  updateAdmin
);
router.delete("/:idAdmin", verifyJWT, deleteAdmin);

export default router;
