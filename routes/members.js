import express from "express";
import { addMember, getAllMembers, getMember, updateMember } from "../controllers/members.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/:idMembre", getMember);
router.post("/", addMember);
router.put("/:idMembre", updateMember);

export default router;
