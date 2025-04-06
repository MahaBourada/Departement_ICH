import express from "express";
import { addAdmin, getAllAdmins } from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.post("/", addAdmin);

export default router;
