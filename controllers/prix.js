import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getAllPrix = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sql = `SELECT
                    idPrix,
                    nom,
                    organisation,
                    projet,
                    etudiants,
                    categorie,
                    description_${lang} AS description,
                    image,
                    alt_${lang},
                    lien
                FROM prix`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getOnePrix = (req, res) => {
  const id = req.params.idPrix;

  const sql = `SELECT *
                FROM prix
                WHERE idPrix = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Prix not found" });
    }

    res.json(results[0]);
  });
};

export const addPrix = (req, res) => {
  const id = uuidv4();
  const prixBody = req.body;

  let imageData = prixBody.image;

  if (imageData && imageData.startsWith("data:image")) {
    // Split the base64 string to get the actual data after comma
    const matches = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid image base64 data" });
    }

    const ext = matches[1]; // e.g. jpeg, png
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    // Create a unique file name
    const fileName = `prix_${prixBody.nom}_${
      prixBody.projet
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
    prixBody.image = `uploads/${fileName}`;
  }

  const sql =
    "INSERT INTO prix (idPrix, nom, organisation, projet, etudiants, categorie, description_fr, description_en, image, alt_fr, alt_en, lien) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    prixBody?.nom,
    prixBody?.organisation,
    prixBody?.projet,
    prixBody?.etudiants,
    prixBody?.categorie,
    prixBody?.description_fr,
    prixBody?.description_en,
    prixBody?.image,
    prixBody?.alt_fr,
    prixBody?.alt_en,
    prixBody?.lien,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({
      Status: "Success",
      message: `${prixBody.nom} ajouté`,
    });
  });
};

export const updatePrix = (req, res) => {
  const idPrix = req.params.idPrix;
  const prixBody = req.body;

  const getCurrentImageSql = `
    SELECT image FROM prix WHERE idPrix = ?
  `;

  db.query(getCurrentImageSql, [idPrix], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erreur base de données", details: err });

    const currentImagePath = results[0]?.image; // could be null

    let imageData = prixBody.image;

    if (imageData && imageData.startsWith("data:image")) {
      // Split the base64 string to get the actual data after comma
      const matches = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid image base64 data" });
      }

      const ext = matches[1]; // e.g. jpeg, png
      const data = matches[2];
      const buffer = Buffer.from(data, "base64");

      // Create a unique file name
      const fileName = `prix_${prixBody.nom}_${
        prixBody.projet
      }_${Date.now()}.${ext}`;

      const uploadDir = path.resolve("uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const fullImagePath = path.join(uploadDir, fileName);
      fs.writeFileSync(fullImagePath, buffer);

      // If there was a previous image, delete it
      if (currentImagePath) {
        const oldImagePath = path.resolve(currentImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      prixBody.image = `uploads/${fileName}`;
    } else if (imageData === "") {
      if (currentImagePath) {
        const oldImagePath = path.resolve(currentImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set image to null
      prixBody.image = null;
    }

    const sql = `
      UPDATE departement_ich.prix
      SET nom = ?, organisation = ?, projet = ?, etudiants = ?, categorie = ?, description_fr = ?, description_en = ?, image = ?, alt_fr = ?, alt_en = ?, lien = ?
      WHERE idPrix = ?
    `;

    const values = [
      prixBody?.nom,
      prixBody?.organisation,
      prixBody?.projet,
      prixBody?.etudiants,
      prixBody?.categorie,
      prixBody?.description_fr,
      prixBody?.description_en,
      prixBody?.image,
      prixBody?.alt_fr,
      prixBody?.alt_en,
      prixBody?.lien,
      idPrix,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      return res.json({
        Status: "Success",
        message: `Informations de du prix${prixBody.nom} mises à jour`,
      });
    });
  });
};

export const deletePrix = (req, res) => {
  const { idPrix } = req.params;

  const getImageSql = "SELECT image FROM prix WHERE idPrix = ?";

  db.query(getImageSql, [idPrix], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ error: "Prix introuvable" });
    }

    const imagePath = result[0].image;

    const deleteSql = "DELETE FROM prix WHERE idPrix = ?";

    db.query(deleteSql, [idPrix], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Only try to delete the image if it exists
      if (imagePath) {
        const absoluteImagePath = path.resolve(imagePath);
        fs.unlink(absoluteImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Erreur suppression image:", err.message);
          }

          return res.json({
            Success: "Prix deleted successfully",
            message: "Prix supprimé",
          });
        });
      } else {
        return res.json({
          Success: "Prix deleted successfully",
          message: "Prix supprimé",
        });
      }
    });
  });
};
