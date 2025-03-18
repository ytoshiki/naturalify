import { intro, select, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import { Preference } from '../../types/preference.js'

const selectPreference = async (preference: Preference[]) => {
  intro(chalk.blue('✨ Naturalify Your English Sentence ✨'))

  const selectedPreference = await select({
    message: 'Select a preference',
    options: preference.map((p) => ({
      label: `${p.context} | ${p.recipient} | ${p.communication}`,
      value: p,
    })),
  })

  if (isCancel(selectedPreference)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  const { context, recipient, communication } = selectedPreference

  return { context, recipient, communication }
}

export default selectPreference
