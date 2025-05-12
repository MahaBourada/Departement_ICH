import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import generator from "generate-password";
import nodemailer from "nodemailer";

export const getAllAdmins = (req, res) => {
  db.query(
    "SELECT * FROM admin, roles WHERE admin.idRole = roles.idRole",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
};

export const addAdmin = (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  const id = uuidv4();
  const date = new Date();
  const salt = 10;
  const adminBody = req.body;

  const sqlRole = "SELECT idRole FROM roles WHERE type = ?";

  db.query(sqlRole, [adminBody.role], (err, roleResult) => {
    if (err) return res.json({ Error: err });
    if (roleResult.length === 0) return res.json({ Error: err });

    const idRole = roleResult[0].idRole;

    const sqlAdmin =
      "INSERT INTO admin (idAdmin, first_name, last_name, username, password, email, createdAt, idRole) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    bcrypt.hash(password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: err });

      const values = [
        id,
        adminBody.firstname,
        adminBody.lastname,
        adminBody.username,
        hash,
        adminBody.email,
        date,
        idRole,
      ];

      db.query(sqlAdmin, values, (err, result) => {
        if (err) return res.json({ Error: err });

        sendPasswordEmail(adminBody.email, adminBody.username, password);

        return res.json({ Status: "Success" });
      });
    });
  });
};

export const deleteAdmin = (req, res) => {
  const { idAdmin } = req.params;

  const sql = "DELETE FROM admin WHERE idAdmin = ?";

  db.query(sql, [idAdmin], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json({ Success: "Admin deleted successfully" });
    }
  });
};

const sendPasswordEmail = (email, username, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Votre compte administrateur a été créé",
    text: `
          Bonjour,

          Votre compte administrateur a été créé.

          Voici vos informations d'identification : 
          Nom d'utilisateur : ${username}
          Mot de passe : ${password}

          Département ICH
          `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email:", err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
