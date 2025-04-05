import { createHistoryTable } from './history/createHistoryTable.js'

export const initializeDatabase = async () => {
  await Promise.all([createHistoryTable()])
}
