import { program } from 'commander'
import mainAction from './actions/main.js'
import showHistoryAction from './actions/show-history.js'
import clearHistoryAction from './actions/clear-history.js'
import setPreferenceAction from './actions/set-preference.js'
import showPreferenceAction from './actions/show_preference.js'
import clearPreferenceAction from './actions/clear-preference.js'
import convertAction from './actions/convert.js'

const initializeCommands = () => {
  program
    .command('preferences')
    .description('Display preferences')
    .action(async () => {
      await showPreferenceAction()
    })

  program
    .command('set-preferences')
    .description('Set preferences')
    .action(async () => {
      await setPreferenceAction()
    })

  program
    .command('clear-preferences')
    .description('Clear preferences')
    .action(async () => {
      await clearPreferenceAction()
    })

  program
    .command('convert <text>')
    .description('Convert text into natural English based on preferences')
    .action(async (text: string) => {
      await convertAction(text)
    })

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
