import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import generator from "generate-password";
import nodemailer from "nodemailer";

export const getAllAdmins = (req, res) => {
  db.query("SELECT * FROM admin", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getAdminById = (req, res) => {
  const id = req.params.idAdmin;

  const sql = `SELECT idAdmin, first_name AS firstname, last_name AS lastname, username, createdAt, email
              FROM admin
              WHERE admin.idAdmin = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(results[0]);
  });
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

  const username =
    adminBody.firstname.trim().slice(0, 1).toLowerCase() +
    adminBody.lastname.trim().toLowerCase();

  const sqlAdmin =
    "INSERT INTO admin (idAdmin, first_name, last_name, username, password, email, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)";

  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: err });

    const values = [
      id,
      adminBody.firstname,
      adminBody.lastname,
      username,
      hash,
      adminBody.email,
      date,
    ];

    db.query(sqlAdmin, values, (err, result) => {
      if (err) return res.json({ Error: err });

      sendPasswordEmail(adminBody.email, username, password);

      return res.json({
        Status: "Success",
        message: `Admin ${adminBody.firstname} ${adminBody.lastname} ajouté`,
      });
    });
  });
};

export const updateAdmin = (req, res) => {
  const { firstname, lastname, email, regpass } = req.body;
  const { idAdmin } = req.params;

  const username =
    firstname.trim().slice(0, 1).toLowerCase() + lastname.trim().toLowerCase();

  if (regpass) {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const salt = 10;

    bcrypt.hash(password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: err });
      const updateSql = `UPDATE admin
                SET first_name = ?, last_name = ?, username = ?, email = ?, password = ?
                WHERE idAdmin = ?`;

      const values = [firstname, lastname, username, email, hash, idAdmin];

      db.query(updateSql, values, (err, results) => {
        if (err) return res.json({ Error: err });

        sendRegenerationEmail(email, username, password);

        res.json({
          Success: "Admin updated successfully",
          message: `Admin ${firstname} ${lastname.toUpperCase()} mis à jour`,
        });
      });
    });
  } else {
    const updateSql = `UPDATE admin
                SET first_name = ?, last_name = ?, username = ?, email = ?
                WHERE idAdmin = ?`;
    const values = [firstname, lastname, username, email, idAdmin];

    db.query(updateSql, values, (err, results) => {
      if (err) return res.json({ Error: err });

      res.json({
        Success: "Admin updated successfully",
        message: `Admin ${firstname} ${lastname.toUpperCase()} mis à jour`,
      });
    });
  }
};

export const deleteAdmin = (req, res) => {
  const { idAdmin } = req.params;

  const sql = "DELETE FROM admin WHERE idAdmin = ?";

  db.query(sql, [idAdmin], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json({
        Success: "Admin deleted successfully",
        message: `Admin supprimé`,
      });
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
    text: `Bonjour,

Votre compte administrateur a été créé.

Voici vos informations d'identification : 
Nom d'utilisateur : ${username}
Mot de passe : ${password}

Le département Ingénierie - Cognition - Handicap
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

const sendRegenerationEmail = (email, username, password) => {
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
    subject: "Votre mot de passe a été régénéré",
    text: `Bonjour,

Votre mot de passe a été régénéré.

Voici vos informations d'identification : 
Nom d'utilisateur : ${username}
Mot de passe : ${password}

Le département Ingénierie - Cognition - Handicap
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
