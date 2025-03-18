import PreferenceCLI from '../../applications/preferenceApplication.js'
import selectPreference from '../../prompts/selectPreference.js'
import chalk from 'chalk'
import promptPreference from '../../prompts/setPreference.js'
import convert from '../../helpers/convert.js'

const preferenceCli = new PreferenceCLI()

async function action(text: string) {
  const preference = await preferenceCli.getPreference()

  if (preference.length === 0) {
    const preference = await promptPreference()

    await preferenceCli.savePreference(preference)

    console.log(chalk.green('\n✔ Preference saved successfully!'))

    await convert({
      ...preference,
      sentence: text,
    })

    process.exit(0)
  }

  const selectedPreference = await selectPreference(preference)

  await convert({
    ...selectedPreference,
    sentence: text,
  })
}

export default action
