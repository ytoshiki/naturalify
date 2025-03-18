import PreferenceCLI from '../../applications/preferenceApplication.js'
import promptPreference from '../../prompts/setPreference.js'
import chalk from 'chalk'
import boxen from 'boxen'

const preferenceCli = new PreferenceCLI()

async function action() {
  const preference = await promptPreference()

  await preferenceCli.savePreference(preference)

  console.log(chalk.green('\n✔ Preferences have been saved successfully!'))

  console.log(
    chalk.yellowBright('\nTo adjust text using your saved preferences, run:'),
  )

  const commandBox = boxen('naturalify adjust <text>', {
    padding: 1,
    margin: 1,
    dimBorder: true,
    borderStyle: 'classic',
  })
  console.log(commandBox)
}

export default action
