import express from "express";
import { getAllPages, addPage, getPageById } from "../controllers/pages.js";

const router = express.Router();

router.get("/", getAllPages);
router.get("/:pageTitle", getPageById);
router.post("/", addPage);

export default router;
