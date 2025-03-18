import ora, { Ora } from 'ora'
import chalk from 'chalk'

export default class Spinner {
  private spinner: Ora | null = null

  start(message: string) {
    this.spinner = ora(chalk.blue(message)).start()
  }

  stop(success: boolean, message: string) {
    if (this.spinner) {
      success
        ? this.spinner.succeed(chalk.green(message))
        : this.spinner.fail(chalk.red(message))
    }
  }
}
