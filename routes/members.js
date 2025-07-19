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
import { validateMember } from "../middleware/validation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";
import { verifyJWT } from "../middleware/verifyJWT .js";

const router = express.Router();

router.get("/content", getAllMembersByLang);
router.get("/", getAllMembers);
router.get("/content/:idMembre", getMemberByLang);
router.get("/:idMembre", getMember);
router.post("/", verifyJWT, validateMember, handleValidationErrors, addMember);
router.put(
  "/:idMembre",
  verifyJWT,
  validateMember,
  handleValidationErrors,
  updateMember
);
router.delete("/:idMembre", verifyJWT, deleteMember);

export default router;
