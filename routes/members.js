import express from "express";
import {
  addMember,
  deleteMember,
  getAllMembers,
  getAllMembersByLang,
  getMember,
  getMemberByLang,
  updateMember,
} from "../controllers/members.js";

const router = express.Router();

router.get("/content", getAllMembersByLang);
router.get("/", getAllMembers);
router.get("/content/:idMembre", getMemberByLang);
router.get("/:idMembre", getMember);
router.post("/", addMember);
router.put("/:idMembre", updateMember);
router.delete("/:idMembre", deleteMember);

export default router;
