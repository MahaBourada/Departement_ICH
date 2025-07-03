import express from "express";
import {
  addPrix,
  deletePrix,
  getAllPrix,
  getOnePrix,
  updatePrix,
} from "../controllers/prix.js";

const router = express.Router();

router.get("/", getAllPrix);
router.get("/:idPrix", getOnePrix);
router.post("/", addPrix);
router.put("/:idPrix", updatePrix);
router.delete("/:idPrix", deletePrix);

export default router;
