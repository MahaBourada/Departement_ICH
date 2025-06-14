import db from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPages = (req, res) => {
  const sql = `
    SELECT 
      pages.idPage, 
      pages.link, 
      pages.title,
      sections_page.idSection, 
      sections_page.ordre_positionnement, 
      sections_page.texte_fr, 
      sections_page.texte_en
    FROM pages
    JOIN sections_page ON pages.idPage = sections_page.idPage
    ORDER BY pages.idPage, sections_page.ordre_positionnement;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const pagesMap = new Map();

    for (const row of results) {
      const {
        idPage,
        link,
        title,
        idSection,
        ordre_positionnement,
        texte_fr,
        texte_en,
      } = row;

      if (!pagesMap.has(idPage)) {
        pagesMap.set(idPage, {
          idPage,
          link,
          title,
          sections: [],
        });
      }

      pagesMap.get(idPage).sections.push({
        idSection,
        ordre_positionnement,
        texte_fr,
        texte_en,
      });
    }

    res.json([...pagesMap.values()]);
  });
};

export const getPageById = (req, res) => {
  const idPage = req.params.idPage;

  const sql = `
    SELECT 
      pages.idPage, 
      pages.link, 
      pages.title,
      sections_page.idSection, 
      sections_page.ordre_positionnement, 
      sections_page.texte_fr, 
      sections_page.texte_en
    FROM pages
    JOIN sections_page ON pages.idPage = sections_page.idPage
    WHERE pages.idPage = ?;
  `;

  db.query(sql, [idPage], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0)
      return res.status(404).json({ error: "Page not found" });

    const page = {
      idPage: results[0].idPage,
      link: results[0].link,
      title: results[0].title,
      sections: [],
    };

    const sectionsSet = new Set();

    results.forEach((row) => {
      if (row.idSection && !sectionsSet.has(row.idSection)) {
        page.sections.push({
          idSection: row.idSection,
          ordre_positionnement: row.ordre_positionnement,
          texte_fr: row.texte_fr,
          texte_en: row.texte_en,
        });
        sectionsSet.add(row.idSection);
      }
    });

    res.json(page);
  });
};

export const getPageByTitle = (req, res) => {
  const pageTitle = req.params.pageTitle;
  const lang = req.query.lang === "en" ? "en" : "fr";

  const sqlPageId = "SELECT * FROM pages WHERE pages.link = ?";

  db.query(sqlPageId, [pageTitle], (err, pageResult) => {
    if (err) return res.json({ Error: err });
    if (pageResult.length === 0) return res.json({ Error: err });

    const idPage = pageResult[0].idPage;

    const sql = `SELECT 
                pages.idPage, 
                pages.title, 
                pages.link, 
                sections_page.idSection, 
                sections_page.texte_${lang} AS texte, 
                sections_page.ordre_positionnement
              FROM pages 
              JOIN sections_page 
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

export const updatePage = (req, res) => {
  const idPage = req.params.idPage;
  const sections = req.body;

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
        for (let section of sections) {
          // Update section
          if (section.idSection) {
            const sectionSql = `UPDATE departement_ich.sections_page
                                SET texte_fr = ?, texte_en = ?, ordre_positionnement = ?
                                WHERE idSection = ? AND idPage = ? `;

            const sectionValues = [
              section.texte_fr,
              section.texte_en,
              section.ordre_positionnement,
              section.idSection,
              idPage,
            ];

            await query(connection, sectionSql, sectionValues);
          } else {
            // Or add section
            const idSection = uuidv4();
            const sectionSql = `INSERT INTO departement_ich.sections_page (idSection, texte_fr, texte_en, ordre_positionnement, idPage)
                                      VALUES (?, ?, ?, ?, ?)`;

            const sectionValues = [
              idSection,
              section.texte_fr,
              section.texte_en,
              section.ordre_positionnement,
              idPage,
            ];
            await query(connection, sectionSql, sectionValues);
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
            res.status(200).json({ message: "Sections mises à jour" });
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
