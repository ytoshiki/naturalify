import inquirer from 'inquirer'
import HistoryService from '../services/history.js'
import chalk from 'chalk'
import Spinner from '../utils/spinner.js'

export default class HistoryCLI {
  private historyService: HistoryService

  constructor() {
    this.historyService = new HistoryService()
  }

  async saveHistory(
    inputType: string,
    style: string,
    originalSentence: string,
    transformedSentence: string,
  ) {
    await this.historyService.save(
      inputType,
      style,
      originalSentence,
      transformedSentence,
    )
    console.log(chalk.green('✅ History saved.'))
  }

  async showHistory() {
    const history = await this.historyService.show()
    if (history.length === 0) {
      console.log(chalk.yellow('No history found.'))
      return
    }

    console.log(chalk.bold('\n📜 Translation History:\n'))
    history.forEach((row, index) => {
      console.log(
        chalk.green(`${index + 1}. ${row.inputType} | ${row.style}`) +
          chalk.cyan(` (${row.transformed_sentence})`) +
          '\n' +
          chalk.gray(`Original: ${row.original_sentence}\n`),
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

      spinner.start('⏳ Clearing history...')

      await this.historyService.clear()

      spinner.stop(true, chalk.green('✅ History cleared.'))
    } else {
      console.log(chalk.red('❌ Operation cancelled.'))
    }
  }
}
