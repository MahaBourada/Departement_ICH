import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { logHistory } from "../utils/logHistory.js";

export const getAllCollabs = (req, res) => {
  db.query("SELECT * FROM collaborations ORDER BY nom", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getCollab = (req, res) => {
  const id = req.params.idCollab;

  const sql = "SELECT * FROM collaborations WHERE idCollab = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Collaboration not found" });
    }

    res.json(results[0]);
  });
};

export const getCollabsByLangType = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";
  const type = req.query.type;

  const sql = `SELECT 
                idCollab,
                nom,
                type,
                categorie,
                description_${lang} AS description,
                logo
              FROM collaborations
              WHERE type = ?
              ORDER BY nom`;

  db.query(sql, [type], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const addCollab = (req, res) => {
  const id = uuidv4();
  const collaborationBody = req.body;

  let imageData = collaborationBody.logo;

  if (imageData && imageData.startsWith("data:")) {
    const matches = imageData.match(
      /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/
    );

    if (!matches || matches.length !== 3) {
      return res.status(400).json({
        error: "Format invalide",
        message:
          "Format invalide, veuillez insérer une image au format SVG, PNG, JPEG ou WEBP.",
      });
    }

    const ext = matches[1].toLowerCase();
    const data = matches[2];

    const allowedFormats = ["svg+xml", "svg", "png", "jpeg", "jpg", "webp"];

    if (!allowedFormats.includes(ext)) {
      return res.status(400).json({
        error: "Format invalide",
        message:
          "Format invalide, veuillez insérer une image au format SVG, PNG, JPEG ou WEBP.",
      });
    }

    // Allow these formats
    const extensionMap = {
      "svg+xml": "svg",
      svg: "svg",
      png: "png",
      jpeg: "jpg",
      jpg: "jpg",
      webp: "webp",
    };

    const fileExtension = extensionMap[ext];
    const buffer = Buffer.from(data, "base64");

    const fileName = `collaboration_${
      collaborationBody.nom
    }_${Date.now()}.${fileExtension}`;
    const uploadDir = path.resolve("uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const fullImagePath = path.join(uploadDir, fileName);
    fs.writeFileSync(fullImagePath, buffer);

    collaborationBody.logo = `uploads/${fileName}`;
  }

  const sql =
    "INSERT INTO collaborations (idCollab, nom, type, categorie, description_fr, description_en, logo) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    collaborationBody?.nom,
    collaborationBody?.type,
    collaborationBody?.categorie,
    collaborationBody?.description_fr,
    collaborationBody?.description_en,
    collaborationBody?.logo,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    logHistory(
      collaborationBody.currentAdmin,
      "INSERT",
      `Ajout de la collaboration ${collaborationBody.nom}`
    );

    return res.json({
      Status: "Success",
      message: `${collaborationBody.nom} ajoutée`,
    });
  });
};

export const updateCollab = (req, res) => {
  const idCollab = req.params.idCollab;
  const collaborationBody = req.body;

  const getCurrentImageSql = `
    SELECT logo FROM collaborations WHERE idCollab = ?
  `;

  db.query(getCurrentImageSql, [idCollab], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erreur base de données", details: err });

    const currentImagePath = results[0]?.logo; // could be null

    let imageData = collaborationBody.logo;

    if (imageData && imageData.startsWith("data:")) {
      // Split the base64 string to get the actual data after comma
      const matches = imageData.match(
        /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/
      );

      if (!matches || matches.length !== 3) {
        return res.status(400).json({
          error: "Invalid image base64 data",
          message:
            "Format invalide, veuillez insérer une image au format SVG, PNG, JPEG ou WEBP.",
        });
      }

      const ext = matches[1]; // e.g. svg, jpeg, png
      const data = matches[2];

      // Allow these formats
      const allowedFormats = ["svg+xml", "svg", "png", "jpeg", "jpg", "webp"];

      if (!allowedFormats.includes(ext)) {
        return res.status(400).json({
          error: "Format invalide",
          message:
            "Format invalide, veuillez insérer une image au format SVG, PNG, JPEG ou WEBP.",
        });
      }

      const buffer = Buffer.from(data, "base64");

      const extensionMap = {
        "svg+xml": "svg",
        svg: "svg",
        png: "png",
        jpeg: "jpg",
        jpg: "jpg",
        webp: "webp",
      };
      const fileExtension = extensionMap[ext];
      const fileName = `collaboration_${
        collaborationBody.nom
      }_${Date.now()}.${fileExtension}`;

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

      collaborationBody.logo = `uploads/${fileName}`;
    } else if (imageData === "") {
      if (currentImagePath) {
        const oldImagePath = path.resolve(currentImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set image to null
      collaborationBody.logo = null;
    }

    const sql = `
      UPDATE collaborations
      SET nom = ?, type = ?, categorie = ?, description_fr = ?, description_en = ?, logo = ?
      WHERE idCollab = ?
    `;

    const values = [
      collaborationBody.nom,
      collaborationBody.type,
      collaborationBody.categorie,
      collaborationBody.description_fr,
      collaborationBody.description_en,
      collaborationBody.logo,
      idCollab,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      logHistory(
        collaborationBody.currentAdmin,
        "UPDATE",
        `Mise à jour de la collaboration ${collaborationBody.nom}`
      );

      return res.json({
        Status: "Success",
        message: `Informations de ${collaborationBody.nom} mises à jour`,
      });
    });
  });
};

export const deleteCollab = (req, res) => {
  const { idCollab } = req.params;
  const { currentAdmin } = req.query;

  db.query(
    "SELECT nom FROM collaborations WHERE idCollab = ?",
    [idCollab],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Collab not found" });
      }

      const { nom } = results[0];

      const getImageSql = "SELECT logo FROM collaborations WHERE idCollab = ?";

      db.query(getImageSql, [idCollab], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) {
          return res.status(404).json({ error: "Collab introuvable" });
        }

        const imagePath = result[0].logo;

        const deleteSql = "DELETE FROM collaborations WHERE idCollab = ?";

        db.query(deleteSql, [idCollab], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Only try to delete the image if it exists
          if (imagePath) {
            const absoluteImagePath = path.resolve(imagePath);
            fs.unlink(absoluteImagePath, (err) => {
              if (err && err.code !== "ENOENT") {
                console.error("Erreur suppression image:", err.message);
              }

              logHistory(
                currentAdmin,
                "DELETE",
                `Suppression de la collaboration ${nom}`
              );

              return res.json({
                Success: "Collab deleted successfully",
                message: `Collaboration ${nom} supprimé`,
              });
            });
          } else {
            logHistory(
              currentAdmin,
              "DELETE",
              `Suppression de la collaboration ${nom}`
            );

            return res.json({
              Success: "Collab deleted successfully",
              message: `Collaboration ${nom} supprimé`,
            });
          }
        });
      });
    }
  );
};
