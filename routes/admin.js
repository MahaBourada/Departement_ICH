import express from "express";
import { addAdmin, getAllAdmins, deleteAdmin } from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.post("/", addAdmin);
router.delete("/:idAdmin", deleteAdmin);

export default router;
