import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const getAllMembers = (req, res) => {
  db.query("SELECT * FROM membres_equipe", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

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

export const updateMember = (req, res) => {
  const idMembre = req.params.idMembre;
  const memberBody = req.body;

  const sql = `
      UPDATE departement_ich.membres_equipe
      SET prenom = ?, nom = ?, titre = ?, fonction = ?, section = ?, propos = ?, email = ?, telephone = ?, lieu = ?
      WHERE idMembre = ?
  `;

  const values = [
    memberBody.prenom,
    memberBody.nom,
    memberBody.titre,
    memberBody.fonction,
    memberBody.section,
    memberBody.propos,
    memberBody.email,
    memberBody.telephone,
    memberBody.lieu,
    idMembre
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({ Status: "Success", result });
  });
};
