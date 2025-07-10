import db from "../config/db.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const getImagesByPageId = (req, res) => {
  const idPage = req.params.idPage;

  const sql = `SELECT 
                media.idMedia, 
                media.path,
                media.alt_fr, 
                media.alt_en, 
                media.source,
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
};

export const getImagesByPageTitle = (req, res) => {
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
                media.source,
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

export const updateImages = async (req, res) => {
  const idPage = req.params.idPage;
  const images = req.body.images;
  const link = req.body.link;

  function query(conn, sql, params) {
    return new Promise((resolve, reject) => {
      conn.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  db.getConnection((err, connection) => {
    if (err)
      return res
        .status(500)
        .json({ error: "DB connection failed", message: err });

    connection.beginTransaction(async (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Transaction failed", message: err });

      try {
        const existingImages = await query(
          connection,
          "SELECT idMedia, path FROM media WHERE idPage = ?",
          [idPage]
        );

        // Get list of image IDs sent from the frontend
        const incomingImageIds = images
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
        for (const image of images) {
          if (!image.path || image.path.trim() === "") continue;

          let imageData = image.path;

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

            const fileName = `page_${link}_${uuidv4()}_${Date.now()}.${fileExtension}`;
            const uploadDir = path.resolve("uploads");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const fullImagePath = path.join(uploadDir, fileName);
            fs.writeFileSync(fullImagePath, buffer);

            image.path = `uploads/${fileName}`;
          }

          if (image.idMedia) {
            const old = await query(
              connection,
              "SELECT path FROM media WHERE idMedia = ? AND idPage = ?",
              [image.idMedia, idPage]
            );
            const oldRow = old[0];

            // Only delete the old file if a new file was uploaded (i.e. base64 string was received and a new file was saved)
            const isBase64Upload = imageData?.startsWith("data:");
            const isNewFileSaved =
              image.path && image.path.startsWith("uploads/") && isBase64Upload;

            if (oldRow && isNewFileSaved && oldRow.path !== image.path) {
              const oldPath = path.join(process.cwd(), oldRow.path);
              if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            // Update DB
            const imageSql = `UPDATE media
                    SET path = ?, alt_fr = ?, alt_en = ?, source = ?
                    WHERE idMedia = ? AND idPage = ?`;

            const imageValues = [
              image.path,
              image?.alt_fr,
              image?.alt_en,
              image?.source,
              image.idMedia,
              idPage,
            ];

            await query(connection, imageSql, imageValues);
          } else {
            // Insert new image
            const idMedia = uuidv4();
            const imageSql = `INSERT INTO media (idMedia, path, alt_fr, alt_en, source, ordre_positionnement, idPage)
                              VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const imageValues = [
              idMedia,
              image.path,
              image?.alt_fr,
              image?.alt_en,
              image?.source,
              image?.ordre_positionnement,
              idPage,
            ];
            await query(connection, imageSql, imageValues);
          }
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: "Commit failed" });
            });
          } else {
            connection.release();
            res.status(200).json({ message: "Images updated successfully" });
          }
        });
      } catch (err) {
        connection.rollback(() => {
          connection.release();
          res
            .status(500)
            .json({ error: "Transaction error", message: err.message });
        });
      }
    });
  });
};
