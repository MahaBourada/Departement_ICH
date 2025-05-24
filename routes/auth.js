import express from "express";
import {
  handleLogin,
  handleLogout,
  handleRefreshToken,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

export default router;
