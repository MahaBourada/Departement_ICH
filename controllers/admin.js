import db from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const getAllAdmins = (req, res) => {
  db.query("SELECT * FROM admin", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const addAdmin = (req, res) => {
  const id = uuidv4();
  const salt = 10;
  const adminBody = req.body;
  const sql =
    "INSERT INTO admin (idAdmin, first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?, ?)";

  bcrypt.hash(adminBody.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: err });
    const values = [
      /* idAdmin: id,
      first_name: adminBody.firstname,
      last_name: adminBody.lastname,
      username: adminBody.username,
      password: hash,
      email: adminBody.email, */
      id,
      adminBody.firstname,
      adminBody.lastname,
      adminBody.username,
      hash,
      adminBody.email,
    ];
    db.query(sql, values, (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Status: "Success", id: id });
    });
  });
};
