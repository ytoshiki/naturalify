import inquirer from 'inquirer'
import PreferenceService from '../../services/preferenceService.js'
import chalk from 'chalk'
import Spinner from '../../cli/helpers/spinner.js'
import { Preference } from '../../types/preference.js'
import boxen from 'boxen'

export default class PreferenceApplication {
  private preferenceService: PreferenceService

  constructor() {
    this.preferenceService = new PreferenceService()
  }

  async savePreference(preference: Preference) {
    try {
      await this.preferenceService.save(preference)
    } catch (error) {
      const err = error as { code?: string }
      if (err?.code === 'SQLITE_CONSTRAINT') {
        console.log(chalk.yellow('\nThis preference already exists!'))

        console.log(
          chalk.yellowBright(
            '\nTo convert text with the applied preferences, use:',
          ),
        )

        const commandBox = boxen('naturalify convert <text>', {
          padding: 1,
          margin: 1,
          dimBorder: true,
          borderStyle: 'classic',
        })
        console.log(commandBox)

        process.exit(0)
      }

      throw error
    }
  }

  async getPreference() {
    return await this.preferenceService.show()
  }

  async showPreference() {
    const preference = await this.preferenceService.show()
    if (preference.length === 0) {
      console.log(chalk.yellow('No preference found.'))
      return
    }

    console.log(chalk.bold('\n✨ Preference:\n'))
    preference.forEach((row, index) => {
      console.log(
        chalk.cyan(
          `${index + 1}. ${row.context} | ${row.recipient} | ${row.communication}`,
        ),
      )
    })
  }

  async clearPreference() {
    const confirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to delete all preference?',
        default: false,
      },
    ])

    if (confirmation.confirm) {
      const spinner = new Spinner()

      spinner.start('Clearing preference...')

      await this.preferenceService.clear()

      spinner.stop(true, chalk.green('Preference cleared.'))
    } else {
      console.log(chalk.red('✖ Operation cancelled.'))
    }
  }
}
