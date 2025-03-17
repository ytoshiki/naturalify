import { runHistoryMigration } from './history.js'

export const initializeDatabase = async () => {
  await runHistoryMigration()
}
