import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getAllMembers = (req, res) => {
  db.query("SELECT * FROM membres_equipe", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getMember = (req, res) => {
  const id = req.params.idMembre;

  const sql = "SELECT * FROM membres_equipe WHERE idMembre = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(results[0]);
  });
};

export const addMember = (req, res) => {
  const id = uuidv4();
  const memberBody = req.body;

  let base64Data = memberBody.image_blob;

  if (base64Data && base64Data.startsWith("data:image")) {
    // Split the base64 string to get the actual data after comma
    const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid image base64 data" });
    }

    const ext = matches[1]; // e.g. jpeg, png
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    // Create a unique file name
    const fileName = `membre_${memberBody.nom.toUpperCase()}${
      memberBody.prenom
    }_${Date.now()}.${ext}`;

    // Chemin absolu vers dossier uploads (dans le dossier courant)
    const uploadDir = path.resolve("uploads");

    // Créer dossier uploads s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Chemin complet pour écrire le fichier
    const fullImagePath = path.join(uploadDir, fileName);

    // Sauvegarder le fichier
    fs.writeFileSync(fullImagePath, buffer);

    // Stocker le chemin relatif avec slash '/' dans la base
    memberBody.image_blob = `uploads/${fileName}`;
  }

  const sql =
    "INSERT INTO membres_equipe (idMembre, prenom, nom, titre, fonction, section, propos, email, telephone, lieu, image_blob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    memberBody?.prenom,
    memberBody?.nom,
    memberBody?.titre,
    memberBody?.fonction,
    memberBody?.section,
    memberBody?.propos,
    memberBody?.email,
    memberBody?.telephone,
    memberBody?.lieu,
    memberBody?.image_blob,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({
      Status: "Success",
      message: `${memberBody.prenom} ${memberBody.nom} ajoutée`,
    });
  });
};

export const updateMember = (req, res) => {
  const idMembre = req.params.idMembre;
  const memberBody = req.body;

  let base64Data = memberBody.image_blob;

  if (base64Data && base64Data.startsWith("data:image")) {
    // Split the base64 string to get the actual data after comma
    const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid image base64 data" });
    }

    const ext = matches[1]; // e.g. jpeg, png
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    // Create a unique file name
    const fileName = `membre_${memberBody.nom.toUpperCase()}${
      memberBody.prenom
    }_${Date.now()}.${ext}`;

    // Chemin absolu vers dossier uploads (dans le dossier courant)
    const uploadDir = path.resolve("uploads");

    // Créer dossier uploads s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Chemin complet pour écrire le fichier
    const fullImagePath = path.join(uploadDir, fileName);

    // Sauvegarder le fichier
    fs.writeFileSync(fullImagePath, buffer);

    // Stocker le chemin relatif avec slash '/' dans la base
    memberBody.image_blob = `uploads/${fileName}`;
  }

  const sql = `
      UPDATE departement_ich.membres_equipe
      SET prenom = ?, nom = ?, titre = ?, fonction = ?, section = ?, propos = ?, email = ?, telephone = ?, lieu = ?, image_blob = ?
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
    memberBody.image_blob,
    idMembre,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({
      Status: "Success",
      message: `Informations de ${memberBody.prenom} ${memberBody.nom} mises à jour`,
    });
  });
};

export const deleteMember = (req, res) => {
  const { idMembre } = req.params;

  // Step 1: Retrieve the image path from the database
  const getImageSql =
    "SELECT image_blob FROM membres_equipe WHERE idMembre = ?";

  db.query(getImageSql, [idMembre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    const imagePath = result[0].image_blob;
    const absoluteImagePath = path.resolve(imagePath); // Convert relative to absolute

    // Step 2: Delete the database entry
    const deleteSql = "DELETE FROM membres_equipe WHERE idMembre = ?";

    db.query(deleteSql, [idMembre], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Step 3: Delete the image from the filesystem
      fs.unlink(absoluteImagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Erreur suppression image:", err.message);
        }

        return res.json({
          Success: "Member deleted successfully",
          message: "Membre supprimé",
        });
      });
    });
  });
};
