import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getAllProjects = (req, res) => {
  const lang = req.query.lang === "en" ? "en" : "fr";
  const sql = `SELECT * FROM projets
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
          objectif: row.objectif,
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
        const projectSql = `INSERT INTO projets (idProjet, titre, objectif, annee)
                            VALUES (?, ?, ?, ?)`;

        const projetValues = [
          idProjet,
          projectBody?.titre,
          projectBody?.objectif,
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

          if (base64Data && base64Data.startsWith("data:image")) {
            // Split the base64 string to get the actual data after comma
            const matches = base64Data.match(
              /^data:image\/([a-zA-Z]+);base64,(.+)$/
            );
            if (!matches || matches.length !== 3) {
              return res
                .status(400)
                .json({ error: "Invalid image base64 data" });
            }

            const ext = matches[1]; // e.g. jpeg, png
            const data = matches[2];
            const buffer = Buffer.from(data, "base64");

            // Create a unique file name
            const fileName = `projet_${projectBody.titre}_${Date.now()}.${ext}`;

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
