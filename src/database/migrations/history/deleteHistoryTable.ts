import Database from '../../index.js'

export async function deleteHistoryTable() {
  const db = Database.getInstance()
  await new Promise<void>((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS history`, (err) =>
      err ? reject(err) : resolve(),
    )
  })
}
