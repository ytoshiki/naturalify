import chalk from 'chalk'
import 'dotenv/config'
import { initializeDatabase } from '../database/migrations/index.js'
import ensureAPIKey from './helpers/apiKey.js'
import initializeCommands from './commands/index.js'

async function main() {
  if (!ensureAPIKey()) return
  await initializeDatabase()
  initializeCommands()
}

main().catch((err) => console.error(chalk.red(err)))
