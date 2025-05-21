import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";

export const handleLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "E-mail and password are required" });
  }

  // MySQL query to find user by username
  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    // If no user is found
    if (results.length === 0) {
      return res.status(401).json({ message: "Nom d'utilisateur incorrect" });
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
      sameSite: true, // Allows cross-origin requests
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      accessToken,
      user: foundUser,
    });
  });
};

export const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
};
