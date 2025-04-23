import express from "express";
import {
  getAllPages,
  editPage,
  getPageById,
  addPage,
} from "../controllers/pages.js";

const router = express.Router();

router.get("/", getAllPages);
router.get("/:pageTitle", getPageById);
router.post("/", addPage);
router.put("/:idSection", editPage);

export default router;
