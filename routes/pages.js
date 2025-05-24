import express from "express";
import {
  getAllPages,
  editPage,
  getPageById,
  addPage,
} from "../controllers/pages.js";
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllPages);
router.get("/:pageTitle", getPageById);
router.post("/", addPage);
router.put("/:idSection", editPage);
/* router.post("/", verifyJWT, addPage);
router.put("/:idSection", verifyJWT, editPage); */

export default router;
