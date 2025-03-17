import Database from '../index.js'

export async function runHistoryMigration() {
  const db = Database.getInstance()
  await new Promise<void>((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          inputType TEXT,
          style TEXT,
          original_sentence TEXT,
          transformed_sentence TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
      (err) => (err ? reject(err) : resolve()),
    )
  })
}
