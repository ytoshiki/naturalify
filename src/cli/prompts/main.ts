import { intro, select, text, outro, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import { isValidEnglishSentence } from '../helpers/validator.js'
import { selectRecipient } from '../helpers/selectRecipient.js'

const promptUser = async () => {
  intro(chalk.blue('✨ Naturalify Your English Sentence ✨'))

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

  const sentence = await text({
    message: 'Enter your sentence to adjust 🪄',
    validate: (input) => {
      if (!input.trim()) return '✖ Sentence cannot be empty'
      if (!isValidEnglishSentence(input))
        return '✖ Please enter the sentence in English only.'
      return undefined
    },
  })

  if (isCancel(sentence)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  outro(chalk.green('🎉 All set! Adjusting your sentence...'))

  return { context, recipient, communication, sentence }
}

export default promptUser
