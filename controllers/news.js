import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getAllNews = (req, res) => {
  db.query(
    "SELECT * FROM actualites ORDER BY datePosted DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
};

export const getNewsById = (req, res) => {
  const idActu = req.params.idActu;

  const sql = `SELECT * FROM actualites
              WHERE idActu = ?`;

  db.query(sql, [idActu], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json(results[0]);
  });
};

export const getNewsByLang = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sql = `SELECT 
                idActu,
                titre_${lang} AS titre,
                contenu_${lang} AS contenu,
                lien,
                image,
                datePosted,
                dateUpdated,
                alt_${lang} AS alt
              FROM actualites
              ORDER BY datePosted DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const addNews = (req, res) => {
  const id = uuidv4();
  const newsBody = req.body;

  let imageData = newsBody.image;

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
    const fileName = `news_${newsBody.titre_fr}_${Date.now()}.${ext}`;

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
    newsBody.image = `uploads/${fileName}`;
  }

  const sql =
    "INSERT INTO actualites (idActu, titre_fr, titre_en, contenu_fr, contenu_en, lien, image, alt_fr, alt_en, datePosted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    newsBody?.titre_fr,
    newsBody?.titre_en,
    newsBody?.contenu_fr,
    newsBody?.contenu_en,
    newsBody?.lien,
    newsBody?.image,
    newsBody?.alt_fr,
    newsBody?.alt_en,
    newsBody?.datePosted,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    return res.json({
      Status: "Success",
      message: `${newsBody.titre_fr} ajoutée`,
    });
  });
};

export const updateNews = (req, res) => {
  const idActu = req.params.idActu;
  const newsBody = req.body;

  const getCurrentImageSql = `
    SELECT image FROM actualites WHERE idActu = ?
  `;

  db.query(getCurrentImageSql, [idActu], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erreur base de données", details: err });

    const currentImagePath = results[0]?.image; // could be null

    let imageData = newsBody.image;

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
      const fileName = `news_${newsBody.titre_fr}_${Date.now()}.${ext}`;

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

      newsBody.image = `uploads/${fileName}`;
    } else if (imageData === "") {
      if (currentImagePath) {
        const oldImagePath = path.resolve(currentImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set image to null
      newsBody.image = null;
    }

    const sql = `
      UPDATE actualites
      SET titre_fr = ?, titre_en = ?, contenu_fr = ?, contenu_en = ?, lien = ?, image = ?, alt_fr = ?, alt_en = ?, dateUpdated = ?
      WHERE idActu = ?
    `;

    const values = [
      newsBody?.titre_fr,
      newsBody?.titre_en,
      newsBody?.contenu_fr,
      newsBody?.contenu_en,
      newsBody?.lien,
      newsBody?.image,
      newsBody?.alt_fr,
      newsBody?.alt_en,
      newsBody?.dateUpdated,
      idActu,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      return res.json({
        Status: "Success",
        message: `Informations de ${newsBody.titre_fr} mises à jour`,
      });
    });
  });
};

export const deleteNews = (req, res) => {
  const { idActu } = req.params;

  const getImageSql = "SELECT image FROM actualites WHERE idActu = ?";

  db.query(getImageSql, [idActu], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ error: "Actualité introuvable" });
    }

    const imagePath = result[0].image;

    const deleteSql = "DELETE FROM actualites WHERE idActu = ?";

    db.query(deleteSql, [idActu], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Only try to delete the image if it exists
      if (imagePath) {
        const absoluteImagePath = path.resolve(imagePath);
        fs.unlink(absoluteImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Erreur suppression image:", err.message);
          }

          return res.json({
            Success: "News deleted successfully",
            message: "Actualité supprimé",
          });
        });
      } else {
        return res.json({
          Success: "News deleted successfully",
          message: "Actualité supprimé",
        });
      }
    });
  });
};
