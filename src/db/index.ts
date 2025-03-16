import sqlite3 from "sqlite3";

type History = {
  inputType: string;
  style: string;
  original_sentence: string;
  transformed_sentence: string;
};

const db = new sqlite3.Database("naturalify.db");

class Database {
  constructor() {
    db.serialize(() => {
      db.run(`
          CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            inputType TEXT,
            style TEXT,
            original_sentence TEXT,
            transformed_sentence TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
    });
  }

  async getHistory(): Promise<History[]> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM history ORDER BY timestamp DESC", (err, rows) => {
        if (err) {
          console.error("Error fetching history:", err);
          reject(err);
          return;
        }

        resolve(rows as History[]);
      });
    });
  }

  async saveHistory(
    inputType: string,
    style: string,
    originalSentence: string,
    transformedSentence: string
  ) {
    const stmt = db.prepare(`
        INSERT INTO history (inputType, style, original_sentence, transformed_sentence)
        VALUES (?, ?, ?, ?)
      `);
    stmt.run(inputType, style, originalSentence, transformedSentence);
    stmt.finalize();
  }

  async dropHistoryTable() {
    return new Promise((resolve, reject) => {
      db.run("DROP TABLE IF EXISTS history", (err) => {
        if (err) {
          console.error("Error dropping history table:", err);
          reject(err);
          return;
        }
        console.log("✅ History table dropped.");
        resolve(true);
      });
    });
  }
}

export default Database;
