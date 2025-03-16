import sqlite3 from "sqlite3";

type History = {
  inputType: string;
  style: string;
  original_sentence: string;
  transformed_sentence: string;
};

export default class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("naturalify.db");
    this.setup();
  }

  private setup() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        inputType TEXT,
        style TEXT,
        original_sentence TEXT,
        transformed_sentence TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async saveHistory(
    inputType: string,
    style: string,
    originalSentence: string,
    transformedSentence: string
  ) {
    const stmt = this.db.prepare(`
      INSERT INTO history (inputType, style, original_sentence, transformed_sentence)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(inputType, style, originalSentence, transformedSentence);
    stmt.finalize();
  }

  async getHistory(): Promise<History[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM history ORDER BY timestamp DESC",
        (err, rows) => {
          if (err) reject(err);
          resolve(rows as History[]);
        }
      );
    });
  }

  async dropHistory() {
    return new Promise((resolve, reject) => {
      this.db.run("DROP TABLE IF EXISTS history", (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
