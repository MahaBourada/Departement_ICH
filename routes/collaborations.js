import express from "express";
import {
  getAllCollabs,
  getCollab,
  addCollab,
  updateCollab,
  deleteCollab,
} from "../controllers/collaborations.js";

const router = express.Router();

router.get("/", getAllCollabs);
router.get("/:idCollab", getCollab);
router.post("/", addCollab);
router.put("/:idCollab", updateCollab);
router.delete("/:idCollab", deleteCollab);

export default router;
