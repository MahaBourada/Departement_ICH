import express from "express";
import {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminById,
  updateAdmin,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:idAdmin", getAdminById);
router.post("/", addAdmin);
router.put("/:idAdmin", updateAdmin);
router.delete("/:idAdmin", deleteAdmin);

export default router;
