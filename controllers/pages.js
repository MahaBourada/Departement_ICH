import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPages = (req, res) => {
  const sql =
    "SELECT * FROM pages, sections_page WHERE pages.idPage = sections_page.idPage";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

export const getPageById = (req, res) => {
  const { pageTitle } = req.params;
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sqlPageId = "SELECT * FROM pages WHERE pages.link = ?";

  db.query(sqlPageId, [pageTitle], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sql = `SELECT pages.idPage, pages.title, pages.link, sections_page.idSection, sections_page.texte_${lang} AS texte, sections_page.ordre_positionnement 
                    FROM pages JOIN sections_page 
                    ON pages.idPage = sections_page.idPage 
                    WHERE pages.idPage = ?;`;

    db.query(sql, [idPage], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });
};

export const addPage = (req, res) => {
  const idSection = uuidv4();
  const sectionBody = req.body;

  const sqlPageId = "SELECT idPage FROM pages WHERE link = ?";

  db.query(sqlPageId, [sectionBody.link], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sqlSection =
      "INSERT INTO departement_ich.sections_page (idSection, texte_fr, texte_en, ordre_positionnement, idPage) VALUES (?, ?, ?, ?, ?)";

    const values = [
      idSection,
      sectionBody.texte_fr,
      sectionBody.texte_en,
      sectionBody.ordre_positionnement,
      idPage,
    ];

    db.query(sqlSection, values, (err, result) => {
      if (err) return res.json({ Error: err });

      return res.json({ Status: "Success", result });
    });
  });
};

export const editPage = (req, res) => {
  const idSection = req.params.idSection;
  const sectionBody = req.body;

  const sqlPageId = "SELECT idPage FROM pages WHERE link = ?";

  db.query(sqlPageId, [sectionBody.link], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sqlSection = `
      UPDATE departement_ich.sections_page
      SET texte_fr = ?, texte_en = ?, ordre_positionnement = ?, idPage = ?
      WHERE idSection = ?
    `;

    const values = [
      sectionBody.texte_fr,
      sectionBody.texte_en,
      sectionBody.ordre_positionnement,
      idPage,
      idSection,
    ];

    db.query(sqlSection, values, (err, result) => {
      if (err) return res.json({ Error: err });

      return res.json({ Status: "Success", result });
    });
  });
};
