import express from "express";
import {
  updateImages,
  getImagesByPageId,
  getImagesByPageTitle,
} from "../controllers/pagesImages.js";
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/:idPage", getImagesByPageId);
router.get("/title/:pageTitle", getImagesByPageTitle);
router.put("/:idPage", verifyJWT, updateImages);

export default router;
