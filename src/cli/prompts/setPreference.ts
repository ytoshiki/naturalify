import { intro, select, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import { selectRecipient } from '../helpers/selectRecipient.js'

const promptPreference = async () => {
  intro(chalk.blue('🚀 Configure Your Preferences 🚀'))

  const context = await select({
    message: '1/3: Choose the context 💻',
    options: [
      { value: 'Slack', label: 'Slack' },
      { value: 'GitHub', label: 'GitHub' },
      { value: 'SNS (Social Media)', label: 'SNS (Social Media)' },
    ],
  })

  if (isCancel(context)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  const recipient = await select({
    message: '2/3: Who is this message for? 🎯',
    options: selectRecipient(context),
  })

  if (isCancel(recipient)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  let communication = null

  communication = await select({
    message: `3/3: Choose your communication style 🗣️`,
    options: [
      {
        value: 'direct',
        label: 'Direct',
      },
      {
        value: 'indirect',
        label: 'Indirect',
      },
      {
        value: 'polite',
        label: 'Polite',
      },
    ],
  })

  if (isCancel(communication)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  return { context, recipient, communication }
}

export default promptPreference
