import express from "express";
import { addMember } from "../controllers/members.js";

const router = express.Router();

router.post("/", addMember);

export default router;
