import express from "express";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNewsById,
  getNewsByLang,
  updateNews,
} from "../controllers/news.js";
import { validateNews } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/content", getNewsByLang);
router.get("/:idActu", getNewsById);
router.post("/", validateNews, handleValidationErrors, addNews);
router.put("/:idActu", validateNews, handleValidationErrors, updateNews);
router.delete("/:idActu", deleteNews);

export default router;
