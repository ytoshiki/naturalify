import { intro, select, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'

const promptPreference = async () => {
  intro(chalk.blue('🚀 Configure Your Preferences 🚀'))

  const context = await select({
    message: '1/3: Choose the context 💻',
    options: [
      { value: 'Slack', label: 'Slack' },
      { value: 'GitHub', label: 'GitHub' },
      { value: 'SNS (Social Media)', label: 'SNS (Social Media)' },
      { value: 'Email', label: 'Email' },
    ],
  })

  if (isCancel(context)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  const recipient = await select({
    message: '2/3: Who is this message for? 🎯',
    options: [
      { value: 'Colleague', label: 'Colleague' },
      { value: 'Boss', label: 'Boss' },
      { value: 'Friend', label: 'Friend' },
      { value: 'Stranger', label: 'Stranger' },
    ],
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
        value: 'Direct',
        label: 'Direct',
      },
      {
        value: 'Indirect',
        label: 'Indirect',
      },
      {
        value: 'Polite',
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
