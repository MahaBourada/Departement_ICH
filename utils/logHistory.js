import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { dateFormatting } from "./dateFormatting.js";

export const logHistory = (currentAdmin, operation, resume) => {
  const sql = `INSERT INTO history (idHistory, admin_name, operation, resume, dateUpdated)
               VALUES (?, ?, ?, ?, ?)`;

  const values = [
    uuidv4(),
    currentAdmin.first_name + " " + currentAdmin.last_name.toUpperCase(),
    operation,
    resume,
    dateFormatting(),
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("History log error:", err);
    }
  });
};
