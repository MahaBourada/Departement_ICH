import express from "express";
import { handleLogin, handleLogout } from "../controllers/login.js";

const router = express.Router();

router.post("/", handleLogin);
router.get("/", handleLogout);

export default router;
