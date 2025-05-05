import express from "express";
import { addMember, deleteMember, getAllMembers, getMember, updateMember } from "../controllers/members.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/:idMembre", getMember);
router.post("/", addMember);
router.put("/:idMembre", updateMember);
router.delete("/:idMembre", deleteMember);

export default router;
