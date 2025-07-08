import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getAllProjects = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";
  const sql = `SELECT 
                  projets.idProjet AS idProjet,
                  projets.titre,
                  projets.objectif_fr,
                  projets.objectif_en,
                  projets.annee,
                  membres_projet.idMembre,
                  membres_projet.prenom,
                  membres_projet.nom,
                  media.idMedia,
                  media.path,
                  media.alt_fr,
                  media.alt_en,
                  media.ordre_positionnement
                FROM projets
                LEFT JOIN membres_projet ON projets.idProjet = membres_projet.idProjet
                LEFT JOIN media ON projets.idProjet = media.idProjet`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const projectsMap = new Map();

    results.forEach((row) => {
      const id = row.idProjet;
      if (!projectsMap.has(id)) {
        projectsMap.set(id, {
          idProjet: row.idProjet,
          titre: row.titre,
          objectif: row[`objectif_${lang}`],
          annee: row.annee,
          membres: [],
          images: [],
        });
      }

      const project = projectsMap.get(id);

      // Add member if present and not already added
      if (
        row.idMembre &&
        !project.membres.find((m) => m.idMembre === row.idMembre)
      ) {
        project.membres.push({
          idMembre: row.idMembre,
          prenom: row.prenom,
          nom: row.nom,
        });
      }

      // Add image if present and not already added
      if (
        row.idMedia &&
        !project.images.find((img) => img.idMedia === row.idMedia)
      ) {
        project.images.push({
          idMedia: row.idMedia,
          path: row.path,
          alt: row[`alt_${lang}`],
          ordre_positionnement: row.ordre_positionnement,
        });
      }
    });

    res.json(Array.from(projectsMap.values()));
  });
};

export const getProject = (req, res) => {
  const idProjet = req.params.idProjet;
  //const lang = req.query.lang === "en" ? "en" : "fr";

  const sql = `SELECT 
                  projets.idProjet AS idProjet,
                  projets.titre,
                  projets.objectif_fr,
                  projets.objectif_en,
                  projets.annee,
                  membres_projet.idMembre,
                  membres_projet.prenom,
                  membres_projet.nom,
                  media.idMedia,
                  media.path,
                  media.alt_fr,
                  media.alt_en,
                  media.ordre_positionnement
                FROM projets
                LEFT JOIN membres_projet ON projets.idProjet = membres_projet.idProjet
                LEFT JOIN media ON projets.idProjet = media.idProjet
                WHERE projets.idProjet = ?`;

  db.query(sql, [idProjet], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ error: "Project not found" });

    const project = {
      idProjet: results[0].idProjet,
      titre: results[0].titre,
      objectif_fr: results[0].objectif_fr,
      objectif_en: results[0].objectif_en,
      annee: results[0].annee,
      membres: [],
      images: [],
    };

    const membresSet = new Set();
    const imagesSet = new Set();

    results.forEach((row) => {
      if (row.idMembre && !membresSet.has(row.idMembre)) {
        project.membres.push({
          idMembre: row.idMembre,
          prenom: row.prenom,
          nom: row.nom,
        });
        membresSet.add(row.idMembre);
      }

      if (row.idMedia && !imagesSet.has(row.idMedia)) {
        project.images.push({
          idMedia: row.idMedia,
          path: row.path,
          alt_fr: row.alt_fr,
          alt_en: row.alt_en,
          ordre_positionnement: row.ordre_positionnement,
        });
        imagesSet.add(row.idMedia);
      }
    });

    res.json(project);
  });
};

const query = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export const addProject = (req, res) => {
  const idProjet = uuidv4();
  const projectBody = req.body;

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ status: "Error 1", message: err });

    connection.beginTransaction(async (err) => {
      if (err) return res.status(500).json({ status: "Error 2", message: err });

      try {
        // Table : projets
        const projectSql = `INSERT INTO projets (idProjet, titre, objectif_fr, objectif_en, annee)
                            VALUES (?, ?, ?, ?, ?)`;

        const projetValues = [
          idProjet,
          projectBody?.titre,
          projectBody?.objectif_fr,
          projectBody?.objectif_en,
          projectBody?.annee,
        ];
        await query(connection, projectSql, projetValues);

        // Table : membres_projet
        for (const membre of projectBody.membres) {
          if (!membre.prenom || !membre.nom) {
            throw new Error("Chaque membre doit avoir un prénom et un nom.");
          }

          const idMembre = uuidv4();
          const membreSql = `INSERT INTO membres_projet (idMembre, nom, prenom, idProjet)
                            VALUES (?, ?, ?, ?)`;

          const membreValues = [
            idMembre,
            membre?.nom,
            membre?.prenom,
            idProjet,
          ];
          await query(connection, membreSql, membreValues);
        }

        // Table : media
        for (const image of projectBody.images) {
          if (!image.path || image.path.trim() === "") continue;

          let base64Data = image.path;

          if (base64Data && base64Data.startsWith("data:")) {
            // Split the base64 string to get the actual data after comma
            const matches = base64Data.match(
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

            const allowedFormats = [
              "svg+xml",
              "svg",
              "png",
              "jpeg",
              "jpg",
              "webp",
            ];

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

            // Create a unique file name
            const fileName = `projet_${
              projectBody.titre
            }_${uuidv4()}_${Date.now()}.${fileExtension}`;

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
            image.path = `uploads/${fileName}`;
          }

          const idMedia = uuidv4();
          const imageSql = `INSERT INTO media (idMedia, path, alt_fr, alt_en, ordre_positionnement, idProjet)
                            VALUES (?, ?, ?, ?, ?, ?)`;
          const imageValues = [
            idMedia,
            image.path,
            image?.alt_fr,
            image?.alt_en,
            image?.ordre_positionnement,
            idProjet,
          ];

          await query(connection, imageSql, imageValues);
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              res
                .status(500)
                .json({ status: "Error 3", message: "Erreur lors du commit" });
            });
          } else {
            res.status(200).json({
              status: "Success",
              message: `Le projet '${projectBody.titre}' a été ajouté`,
            });
          }
        });
      } catch (err) {
        connection.rollback(() => {
          res.status(500).json({ status: "Error 4", message: err.message });
        });
      } finally {
        connection.release();
      }
    });
  });
};

export const updateProject = (req, res) => {
  const idProjet = req.params.idProjet;
  const projectBody = req.body;

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ status: "Error 1", message: err });

    connection.beginTransaction(async (err) => {
      if (err) return res.status(500).json({ status: "Error 2", message: err });

      try {
        // Table : projets
        const projectSql = `UPDATE projets 
                            SET titre = ?, objectif_fr = ?, objectif_en = ?, annee = ?
                            WHERE idProjet = ?`;

        const projetValues = [
          projectBody?.titre,
          projectBody?.objectif_fr,
          projectBody?.objectif_en,
          projectBody?.annee,
          idProjet,
        ];
        await query(connection, projectSql, projetValues);

        // Table : membres_projet
        // Delete member
        // Get existing member IDs from DB
        const existingMembers = await query(
          connection,
          "SELECT idMembre FROM membres_projet WHERE idProjet = ?",
          [idProjet]
        );

        // Get list of member IDs sent from the frontend
        const incomingMemberIds = projectBody.membres
          .map((m) => m.idMembre)
          .filter(Boolean);

        // Determine which members to delete
        const membersToDelete = existingMembers
          .map((row) => row.idMembre)
          .filter((id) => !incomingMemberIds.includes(id));

        // Delete removed members
        if (membersToDelete.length > 0) {
          await query(
            connection,
            `DELETE FROM membres_projet WHERE idMembre IN (${membersToDelete
              .map(() => "?")
              .join(",")})`,
            membersToDelete
          );
        }

        // Updating
        for (const membre of projectBody.membres) {
          if (!membre.prenom || !membre.nom) {
            throw new Error("Chaque membre doit avoir un prénom et un nom.");
          }

          // Update member
          if (membre.idMembre) {
            const membreSql = `UPDATE membres_projet 
                              SET nom = ?, prenom = ?
                              WHERE idMembre = ? AND idProjet = ?`;

            const membreValues = [
              membre?.nom,
              membre?.prenom,
              membre.idMembre,
              idProjet,
            ];
            await query(connection, membreSql, membreValues);
          } else {
            // Or add member
            const idMembre = uuidv4();
            const membreSql = `INSERT INTO membres_projet (idMembre, nom, prenom, idProjet)
                            VALUES (?, ?, ?, ?)`;

            const membreValues = [
              idMembre,
              membre?.nom,
              membre?.prenom,
              idProjet,
            ];
            await query(connection, membreSql, membreValues);
          }
        }

        // Table : media
        // Delete image
        // Get existing image IDs from DB
        const existingImages = await query(
          connection,
          "SELECT idMedia, path FROM media WHERE idProjet = ?",
          [idProjet]
        );

        // Get list of image IDs sent from the frontend
        const incomingImageIds = projectBody.images
          .map((img) => img.idMedia)
          .filter(Boolean);

        // Determine which images to delete
        const imagesToDelete = existingImages.filter(
          (img) => !incomingImageIds.includes(img.idMedia)
        );

        // Delete image files from disk
        for (const img of imagesToDelete) {
          const fullPath = path.join(process.cwd(), img.path);
          if (fs.existsSync(fullPath)) {
            try {
              fs.unlinkSync(fullPath);
            } catch (err) {
              console.error(`Error deleting file: ${fullPath}`, err);
            }
          }
        }

        // Delete removed images
        const idsToDelete = imagesToDelete.map((img) => String(img.idMedia));
        if (idsToDelete.length > 0) {
          await query(
            connection,
            `DELETE FROM media WHERE idMedia IN (${idsToDelete
              .map(() => "?")
              .join(",")})`,
            idsToDelete
          );
        }

        // Updating
        for (const image of projectBody.images) {
          if (!image.path || image.path.trim() === "") continue;

          let isBase64 = image.path;

          if (isBase64 && isBase64.startsWith("data:")) {
            const matches = isBase64.match(
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

            const allowedFormats = [
              "svg+xml",
              "svg",
              "png",
              "jpeg",
              "jpg",
              "webp",
            ];

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

            const fileName = `projet_${
              projectBody.titre
            }_${Date.now()}.${fileExtension}`;
            const uploadDir = path.resolve("uploads");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const fullImagePath = path.join(uploadDir, fileName);
            fs.writeFileSync(fullImagePath, buffer);

            image.path = `uploads/${fileName}`;
          }

          if (image.idMedia) {
            // Delete old image if replacing
            const old = await query(
              connection,
              "SELECT path FROM media WHERE idMedia = ? AND idProjet = ?",
              [image.idMedia, idProjet]
            );
            if (old.length > 0 && isBase64 && old[0].path) {
              const oldPath = path.join(process.cwd(), old[0].path);
              if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); // Delete old file
            }

            // Update DB
            const imageSql = `UPDATE media
                      SET path = ?, alt_fr = ?, alt_en = ?
                      WHERE idMedia = ? AND idProjet = ?`;
            const imageValues = [
              image.path,
              image?.alt_fr,
              image?.alt_en,
              image.idMedia,
              idProjet,
            ];
            await query(connection, imageSql, imageValues);
          } else {
            // Insert new image
            const idMedia = uuidv4();
            const imageSql = `INSERT INTO media (idMedia, path, alt_fr, alt_en, ordre_positionnement, idProjet)
                              VALUES (?, ?, ?, ?, ?, ?)`;
            const imageValues = [
              idMedia,
              image.path,
              image?.alt_fr,
              image?.alt_en,
              image?.ordre_positionnement,
              idProjet,
            ];
            await query(connection, imageSql, imageValues);
          }
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              res
                .status(500)
                .json({ status: "Error 3", message: "Erreur lors du commit" });
            });
          } else {
            res.status(200).json({
              status: "Success",
              message: `Le projet '${projectBody.titre}' a été mis à jour`,
            });
          }
        });
      } catch (err) {
        connection.rollback(() => {
          res.status(500).json({ status: "Error 4", message: err.message });
        });
      } finally {
        connection.release();
      }
    });
  });
};

export const deleteProject = async (req, res) => {
  const { idProjet } = req.params;

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ status: "Error 1", message: err });

    connection.beginTransaction(async (err) => {
      if (err) return res.status(500).json({ status: "Error 2", message: err });
      try {
        // Get image paths to delete from filesystem
        const images = await query(
          connection,
          "SELECT path FROM media WHERE idProjet = ?",
          [idProjet]
        );

        // Delete image files from /uploads
        for (const image of images) {
          if (image.path) {
            const fullPath = path.resolve(image.path);
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          }
        }

        // Delete related media from DB
        await query(connection, "DELETE FROM media WHERE idProjet = ?", [
          idProjet,
        ]);

        // Delete related project members, tags, etc.
        await query(
          connection,
          "DELETE FROM membres_projet WHERE idProjet = ?",
          [idProjet]
        );

        // Delete the project itself
        await query(connection, "DELETE FROM projets WHERE idProjet = ?", [
          idProjet,
        ]);

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              res
                .status(500)
                .json({ status: "Error 3", message: "Erreur lors du commit" });
            });
          } else {
            res.status(200).json({
              status: "Success",
              message: `Projet supprimé`,
            });
          }
        });
      } catch (err) {
        connection.rollback(() => {
          res.status(500).json({ status: "Error 4", message: err.message });
        });
      } finally {
        connection.release();
      }
    });
  });
};
