import { History } from '../types/history.js'
import Database from './index.js'

export default class HistoryRepository {
  private db = Database.getInstance()

  async saveHistory({
    context,
    recipient,
    communication,
    original_sentence,
    transformed_sentence,
  }: History) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `INSERT INTO history (context, recipient, communication, original_sentence, transformed_sentence) VALUES (?, ?, ?, ?, ?)`,
        [
          context,
          recipient,
          communication,
          original_sentence,
          transformed_sentence,
        ],
        (err) => (err ? reject(err) : resolve()),
      )
    })
  }

  async getHistory(): Promise<History[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM history ORDER BY timestamp DESC',
        (err, rows) => {
          err ? reject(err) : resolve(rows as History[])
        },
      )
    })
  }

  async clearHistory() {
    return new Promise<void>((resolve, reject) => {
      this.db.run('DELETE FROM history', (err) =>
        err ? reject(err) : resolve(),
      )
    })
  }
}
