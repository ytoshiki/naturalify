import PreferenceCLI from '../../applications/preferenceApplication.js'
import promptPreference from '../../prompts/preferenct.js'
import chalk from 'chalk'
import boxen from 'boxen'

const preferenceCli = new PreferenceCLI()

async function action() {
  const preference = await promptPreference()

  await preferenceCli.savePreference(preference)

  console.log(chalk.green('\n✔ Preference saved successfully!'))

  console.log(
    chalk.yellowBright('\nTo convert text with the applied preferences, use:'),
  )

  const commandBox = boxen('naturalify convert <text>', {
    padding: 1,
    margin: 1,
    dimBorder: true,
    borderStyle: 'classic',
  })
  console.log(commandBox)
}

export default action
