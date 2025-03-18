import { createHistoryTable } from './history/createHistoryTable.js'
import { createPreferenceTable } from './preference/createPreferenceTable.js'

export const initializeDatabase = async () => {
  await Promise.all([createHistoryTable(), createPreferenceTable()])
}
