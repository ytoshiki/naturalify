import Database from '../../index.js'

export async function createPreferenceTable() {
  const db = Database.getInstance()
  await new Promise<void>((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS preference (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          context TEXT,
          recipient TEXT,
          communication TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(context, recipient, communication)
        )`,
      (err) => (err ? reject(err) : resolve()),
    )
  })
}
