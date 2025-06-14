import express from "express";
import {
  getAllPages,
  updatePage,
  getPageById,
  getPageByTitle,
} from "../controllers/pages.js";
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllPages);
router.get("/:idPage", getPageById);
router.get("/title/:pageTitle", getPageByTitle);
router.put("/:idPage", updatePage);
/* router.post("/", verifyJWT, addPage);
router.put("/:idSection", verifyJWT, updatePage); */

export default router;
