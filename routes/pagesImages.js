import express from "express";
import {
  addImage,
  editImage,
  getImagesByPageId,
} from "../controllers/pagesImages.js";

const router = express.Router();

router.get("/:pageTitle", getImagesByPageId);
router.post("/", addImage);
router.put("/:idMedia", editImage);

export default router;
