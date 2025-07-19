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
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/content", getNewsByLang);
router.get("/:idActu", getNewsById);
router.post("/", verifyJWT, validateNews, handleValidationErrors, addNews);
router.put(
  "/:idActu",
  verifyJWT,
  validateNews,
  handleValidationErrors,
  updateNews
);
router.delete("/:idActu", verifyJWT, deleteNews);

export default router;
