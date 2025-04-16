import express from "express";
import { getAllPages } from "../controllers/pages.js";

const router = express.Router();

router.get("/", getAllPages);

export default router;
