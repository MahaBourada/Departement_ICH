import express from "express";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNewsById,
  getNewsByLang,
  updateNews,
} from "../controllers/news.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/content", getNewsByLang);
router.get("/:idActu", getNewsById);
router.post("/", addNews);
router.put("/:idActu", updateNews);
router.delete("/:idActu", deleteNews);

export default router;
