import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export const getImagesByPageId = (req, res) => {
  const { pageTitle } = req.params;
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sqlPageId = "SELECT * FROM pages WHERE pages.link = ?";

  db.query(sqlPageId, [pageTitle], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sql = `SELECT 
                media.idMedia, 
                media.path,
                media.alt_${lang} AS alt, 
                media.ordre_positionnement,
                media.idPage
              FROM media 
              WHERE media.idPage = ?
              ORDER BY media.ordre_positionnement ASC;`;

    db.query(sql, [idPage], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });
};

export const addImage = (req, res) => {
  const mediaBody = req.body;

  const sqlPageId = "SELECT idPage FROM pages WHERE link = ?";

  db.query(sqlPageId, [mediaBody.link], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sql =
      "INSERT INTO media (idMedia, path, alt_fr, alt_en, ordre_positionnement, idPage) VALUES (?, ?, ?, ?, ?, ?);";

    const idMedia = uuidv4();

    const values = [
      idMedia,
      mediaBody.path,
      mediaBody.alt_fr,
      mediaBody.alt_en,
      mediaBody.ordre_positionnement,
      idPage,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json({ message: "Image added successfully" });
    });
  });
};

export const editImage = (req, res) => {
  const { idMedia } = req.params;
  const mediaBody = req.body;

  let base64Data = mediaBody.path;

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
    const fileName = `Page_${mediaBody.link}_${idMedia}_${Date.now()}.${ext}`;

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
    mediaBody.path = `uploads/${fileName}`;
  }

  const sqlPageId = "SELECT idPage FROM pages WHERE link = ?";

  db.query(sqlPageId, [mediaBody.link], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sql = `
    UPDATE media 
    SET 
      path = ?, 
      alt_fr = ?, 
      alt_en = ?, 
      ordre_positionnement = ?,
      idPage = ?
    WHERE idMedia = ?;
  `;

    const values = [
      mediaBody.path,
      mediaBody.alt_fr,
      mediaBody.alt_en,
      mediaBody.ordre_positionnement,
      idPage,
      idMedia,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json({ message: "Image updated successfully" });
    });
  });
};
