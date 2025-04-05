import { intro, select, text, outro, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import { isValidEnglishSentence } from '../helpers/validator.js'

const promptUser = async () => {
  intro(chalk.blue('✨ Naturalify Your English Sentence ✨'))

  let communication = null

  communication = await select({
    message: `1/1: Choose your communication style 🗣️`,
    options: [
      {
        value: 'neutral',
        label: 'neutral',
      },
      {
        value: 'casual',
        label: 'casual',
      },
      {
        value: 'polite',
        label: 'polite',
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

  return { communication, sentence }
}

export default promptUser
