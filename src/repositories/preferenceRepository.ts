import type { Preference } from '../types/preference.js'
import Database from '../database/index.js'

export default class PreferenceRepository {
  private db = Database.getInstance()

  async savePreference({ context, recipient, communication }: Preference) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `INSERT INTO preference (context, recipient, communication) VALUES (?, ?, ?)`,
        [context, recipient, communication],
        (err) => {
          if (!err) resolve()

          reject(err)
        },
      )
    })
  }

  async getPreference(): Promise<Preference[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM preference ORDER BY timestamp DESC',
        (err, rows) => {
          err ? reject(err) : resolve(rows as Preference[])
        },
      )
    })
  }

  async clearPreference() {
    return new Promise<void>((resolve, reject) => {
      this.db.run('DELETE FROM preference', (err) =>
        err ? reject(err) : resolve(),
      )
    })
  }
}
