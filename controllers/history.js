import db from "../config/db.js";

export const getAllHistory = (req, res) => {
  const sql = `SELECT 
                  history.idHistory,
                  history.admin_name,
                  history.operation,
                  history.resume,
                  history.dateUpdated
                FROM history
                ORDER BY dateUpdated DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur lors de la récupération de l'historique",
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
};
