import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { logHistory } from "../utils/logHistory.js";

export const getAllMembers = (req, res) => {
  db.query("SELECT * FROM membres_equipe ORDER BY prenom", (err, results) => {
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

export const getAllMembersByLang = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sql = `SELECT 
                idMembre,
                nom,
                prenom,
                titre,
                fonction_${lang} AS fonction,
                section_${lang} AS section,
                image
              FROM membres_equipe
              ORDER BY prenom, nom`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getMemberByLang = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";
  const id = req.params.idMembre;

  const sql = `SELECT 
                idMembre,
                nom,
                prenom,
                titre,
                fonction_${lang} AS fonction,
                section_${lang} AS section,
                propos_${lang} AS propos,
                image
              FROM membres_equipe
              WHERE idMembre = ?`;
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

  let imageData = memberBody.image;

  if (imageData && imageData.startsWith("data:image")) {
    // Split the base64 string to get the actual data after comma
    const matches = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({
        error: "Invalid image base64 data",
        message:
          "Format invalide, veuillez insérer une image au format PNG, JPEG ou WEBP.",
      });
    }

    const ext = matches[1]; // e.g. jpeg, png
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    // Create a unique file name
    const fileName = `membre_${
      memberBody.prenom
    }_${memberBody.nom.toUpperCase()}_${Date.now()}.${ext}`;

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
    memberBody.image = `uploads/${fileName}`;
  }

  const sql =
    "INSERT INTO membres_equipe (idMembre, prenom, nom, titre, fonction_fr, section_fr, propos_fr, fonction_en, section_en, propos_en, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    memberBody?.prenom.slice(0, 1).toUpperCase() + memberBody?.prenom.slice(1),
    memberBody?.nom.toUpperCase(),
    memberBody?.titre,
    memberBody?.fonction_fr,
    memberBody?.section_fr,
    memberBody?.propos_fr,
    memberBody?.fonction_en,
    memberBody?.section_en,
    memberBody?.propos_en,
    memberBody?.image,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: err });

    logHistory(
      memberBody.currentAdmin,
      "INSERT",
      `Ajout du membre ${memberBody.prenom} ${memberBody.nom.toUpperCase()}`
    );

    return res.json({
      Status: "Success",
      message: `${memberBody.prenom} ${memberBody.nom.toUpperCase()} ajoutée`,
    });
  });
};

export const updateMember = (req, res) => {
  const idMembre = req.params.idMembre;
  const memberBody = req.body;

  const getCurrentImageSql = `
    SELECT image FROM departement_ich.membres_equipe WHERE idMembre = ?
  `;

  db.query(getCurrentImageSql, [idMembre], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erreur base de données", details: err });

    const currentImagePath = results[0]?.image; // could be null

    let imageData = memberBody.image;

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
      const fileName = `membre_${
        memberBody.prenom
      }_${memberBody.nom.toUpperCase()}_${Date.now()}.${ext}`;

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

      memberBody.image = `uploads/${fileName}`;
    } else if (imageData === "") {
      if (currentImagePath) {
        const oldImagePath = path.resolve(currentImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set image to null
      memberBody.image = null;
    }

    const sql = `
      UPDATE departement_ich.membres_equipe
      SET prenom = ?, nom = ?, titre = ?, fonction_fr = ?, section_fr = ?, propos_fr = ?, fonction_en = ?, section_en = ?, propos_en = ?, image = ?
      WHERE idMembre = ?
    `;

    const values = [
      memberBody?.prenom.slice(0, 1).toUpperCase() +
        memberBody?.prenom.slice(1).toLowerCase(),
      memberBody?.nom.toUpperCase(),
      memberBody.titre,
      memberBody.fonction_fr,
      memberBody.section_fr,
      memberBody.propos_fr,
      memberBody.fonction_en,
      memberBody.section_en,
      memberBody.propos_en,
      memberBody.image,
      idMembre,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      logHistory(
        memberBody.currentAdmin,
        "UPDATE",
        `Mise à jour du membre ${
          memberBody.prenom
        } ${memberBody.nom.toUpperCase()}`
      );

      return res.json({
        Status: "Success",
        message: `Informations de ${memberBody.prenom} ${memberBody.nom} mises à jour`,
      });
    });
  });
};

export const deleteMember = (req, res) => {
  const { idMembre } = req.params;
  const { currentAdmin } = req.query;

  if (!currentAdmin?.first_name || !currentAdmin?.last_name) {
    return res.status(400).json({ error: "Missing current admin info" });
  }

  db.query(
    "SELECT prenom, nom FROM membres_equipe WHERE idMembre = ?",
    [idMembre],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Membre not found" });
      }

      const { prenom, nom } = results[0];

      const getImageSql = "SELECT image FROM membres_equipe WHERE idMembre = ?";

      db.query(getImageSql, [idMembre], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) {
          return res.status(404).json({ error: "Membre introuvable" });
        }

        const imagePath = result[0].image;

        const deleteSql = "DELETE FROM membres_equipe WHERE idMembre = ?";

        db.query(deleteSql, [idMembre], (err) => {
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
                `Suppression du membre ${prenom} ${nom.toUpperCase()}`
              );

              return res.json({
                Success: "Member deleted successfully",
                message: `Membre ${prenom} ${nom.toUpperCase()} supprimé`,
              });
            });
          } else {
            logHistory(
              currentAdmin,
              "DELETE",
              `Suppression du membre ${prenom} ${nom.toUpperCase()}`
            );

            return res.json({
              Success: "Member deleted successfully",
              message: `Membre ${prenom} ${nom.toUpperCase()} supprimé`,
            });
          }
        });
      });
    }
  );
};
