import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const addMember = (req, res) => {
  const id = uuidv4();
  const memberBody = req.body;

  const sql =
    "INSERT INTO membres_equipe (idMembre, prenom, nom, titre, fonction, section, propos, email, telephone, lieu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    memberBody.prenom,
    memberBody.nom,
    memberBody.titre,
    memberBody.fonction,
    memberBody.section,
    memberBody.propos,
    memberBody.email,
    memberBody.telephone,
    memberBody.lieu,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({ Status: "Success" });
  });
};
