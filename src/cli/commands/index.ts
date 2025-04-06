import { program } from 'commander'
import mainAction from './actions/main.js'
import showHistoryAction from './actions/show-history.js'
import clearHistoryAction from './actions/clear-history.js'
import deleteDatabaseAction from './actions/delete-database.js'
import examplesAction from './actions/examples.js'

const initializeCommands = () => {
  program
    .command('history')
    .description('Show the history of all adjusted texts')
    .action(async () => {
      await showHistoryAction()
    })

  program
    .command('clear-history')
    .description('Clear all the text adjustment history')
    .action(async () => {
      await clearHistoryAction()
    })

  program
    .command('delete-database')
    .description('Delete the entire database')
    .action(() => {
      deleteDatabaseAction()
    })

  program
    .command('examples')
    .description(
      'Pick a useful sentence from common work-related communication examples',
    )
    .action(() => {
      examplesAction()
    })

  program
    .description(
      'naturalify - A CLI tool for adjusting English sentences to be more natural and fluent',
    )
    .version('1.0.0')
    .action(async () => {
      await mainAction()
    })

  program.parse(process.argv)
}

export default initializeCommands
