import inquirer from 'inquirer'
import HistoryService from '../../services/historyService.js'
import chalk from 'chalk'
import Spinner from '../../cli/helpers/spinner.js'
import { History } from '../../types/history.js'

export default class HistoryApplication {
  private historyService: HistoryService

  constructor() {
    this.historyService = new HistoryService()
  }

  async saveHistory(history: History) {
    await this.historyService.save(history)
  }

  async showHistory() {
    const history = await this.historyService.show()
    if (history.length === 0) {
      console.log(chalk.yellow('No history found.'))
      return
    }

    console.log(chalk.bold('\n🪄 Text Adjustment History:\n'))
    history.forEach((row, index) => {
      console.log(
        chalk.cyan(`${index + 1}. ${row.communication}`) +
          '\n' +
          chalk.gray(`Original: ${row.original_sentence}\n`) +
          chalk.white(`Adjusted: ${row.transformed_sentence}`) +
          '\n',
      )
    })
  }

  async clearHistory() {
    const confirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to delete all history?',
        default: false,
      },
    ])

    if (confirmation.confirm) {
      const spinner = new Spinner()

      spinner.start('Clearing history...')

      await this.historyService.clear()

      spinner.stop(true, chalk.green('History has been cleared.'))
    } else {
      console.log(chalk.red('✖ Operation cancelled.'))
    }
  }
}
