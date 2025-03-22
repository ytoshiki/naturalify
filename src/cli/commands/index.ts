import { program } from 'commander'
import mainAction from './actions/main.js'
import showHistoryAction from './actions/show-history.js'
import clearHistoryAction from './actions/clear-history.js'
import setPreferenceAction from './actions/set-preference.js'
import showPreferenceAction from './actions/show_preference.js'
import clearPreferenceAction from './actions/clear-preference.js'
import deleteDatabaseAction from './actions/delete-database.js'
import convertAction from './actions/convert.js'

const initializeCommands = () => {
  program
    .command('preferences')
    .description('Display the currently saved text adjustment preferences')
    .action(async () => {
      await showPreferenceAction()
    })

  program
    .command('set-preferences')
    .description('Set the preferences for text adjustment')
    .action(async () => {
      await setPreferenceAction()
    })

  program
    .command('clear-preferences')
    .description('Clear all saved text adjustment preferences')
    .action(async () => {
      await clearPreferenceAction()
    })

  program
    .command('adjust <text>')
    .description('Adjust the provided text based on the saved preferences')
    .action(async (text: string) => {
      await convertAction(text)
    })

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
    .description(
      'Delete the entire database, including preferences and history',
    )
    .action(() => {
      deleteDatabaseAction()
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
