import Database from '../../index.js'

export async function deletePreferenceTable() {
  const db = Database.getInstance()
  await new Promise<void>((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS preference`, (err) =>
      err ? reject(err) : resolve(),
    )
  })
}
