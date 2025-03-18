import { program } from 'commander'
import mainAction from './actions/main.js'
import showHistoryAction from './actions/show-history.js'
import clearHistoryAction from './actions/clear-history.js'

async function convertCommand() {}

async function prefCommand() {}

async function setPrefCommand() {}

async function usePrefCommand() {}

const initializeCommands = () => {
  program
    .command('preferences')
    .description('Display current preferences')
    .action(prefCommand)

  program
    .command('set-preferences')
    .description('Set user preferences')
    .action(setPrefCommand)

  program
    .command('use-preferences')
    .description('Apply saved preferences for the conversion')
    .action(usePrefCommand)

  program
    .command('convert <text>')
    .description('Convert text into natural English based on preferences')
    .action(convertCommand)

  program
    .command('history')
    .description('Show conversion history')
    .action(async () => {
      await showHistoryAction()
    })

  program
    .command('clear-history')
    .description('Clear conversion history')
    .action(async () => {
      await clearHistoryAction()
    })

  program
    .description(
      'naturalify - A tool to convert English sentences into natural-sounding English',
    )
    .version('0.1.0')
    .action(async () => {
      await mainAction()
    })

  program.parse(process.argv)
}

export default initializeCommands
