import express from "express";
import { updateImages, getImagesByPageId, getImagesByPageTitle } from "../controllers/pagesImages.js";

const router = express.Router();

router.get("/:idPage", getImagesByPageId);
router.get("/title/:pageTitle", getImagesByPageTitle);
router.put("/:idPage", updateImages);

export default router;
