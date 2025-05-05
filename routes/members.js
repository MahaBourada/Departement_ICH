import express from "express";
import { addMember, getAllMembers, updateMember } from "../controllers/members.js";

const router = express.Router();

router.get("/", getAllMembers);
router.post("/", addMember);
router.put("/:idMembre", updateMember);

export default router;
