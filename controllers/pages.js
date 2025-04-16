import db from "../config/db.js";

export const getAllPages = (req, res) => {
  db.query(
    "SELECT * FROM pages, sections_page WHERE pages.idPage = sections_page.idPage",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
};
