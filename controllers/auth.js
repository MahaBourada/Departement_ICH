import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";

export const handleLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Le nom d'utilisateur et le mot de passe sont requis.",
    });
  }

  // MySQL query to find user by username
  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err)
      return res.status(500).json({
        message: "Erreur lors de la connexion.",
        error: err.message,
      });

    if (results.length === 0) {
      return res.status(401).json({
        message: "Nom d'utilisateur incorrect.",
      });
    }

    const foundUser = results[0]; // Get the first user result

    // Compare the hashed password
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const app = express();
    app.use(cookieParser());

    // Set the refresh token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true, // set to false only in localhost if needed
      sameSite: true, // or "Lax" for cross-site dev
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      accessToken,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
    });
  });
};

export const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(204).json({
      message: "Aucun cookie à supprimer.",
    });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie supprimé" });
};

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({
      message: "Aucun jeton de rafraîchissement fourni.",
    });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        error: err.message,
        message: "Le jeton de rafraîchissement est invalide ou expiré.",
      });

    const username = decoded.username;

    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err)
        return res.status(500).json({
          message: "Erreur lors de la vérification du jeton.",
          error: err.message,
        });

      if (results.length === 0)
        return res.status(403).json({
          message: "Utilisateur introuvable",
        });

      const foundUser = results[0];
      const accessToken = jwt.sign(
        { UserInfo: { username: foundUser.username } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({
        accessToken,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
      });
    });
  });
};
