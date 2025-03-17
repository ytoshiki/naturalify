import { intro, select, text, outro, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import { isValidEnglishSentence } from '../utils/validator.js'

const promptUser = async () => {
  console.clear()
  intro(chalk.blue('✨ Naturalify Your English Sentence ✨'))

  const inputType = await select({
    message: 'Choose the type of input:',
    options: [
      { value: 'Conversation', label: '🗣️ Conversation' },
      { value: 'Text', label: '✍️ Text' },
    ],
  })

  if (isCancel(inputType)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  const style = await select({
    message: 'Choose the style of English:',
    options: [
      { value: 'Formal', label: '🤝 Formal' },
      { value: 'Casual', label: '😎 Casual' },
    ],
  })

  if (isCancel(style)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  let formalityLevel = null
  if (style === 'Formal') {
    formalityLevel = await select({
      message: 'How formal should it be?',
      options: [
        {
          value: 'Slightly formal, but friendly',
          label: '🤝 Slightly Formal (Professional but Friendly)',
        },
        {
          value: 'Formal but not too formal',
          label: '📜 Formal (suitable for workplace communication)',
        },
        {
          value: 'Formal',
          label: '🏛️ Very Formal (Highly Polite and Diplomatic)',
        },
      ],
    })

    if (isCancel(formalityLevel)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }
  }

  let casualLevel = null

  if (style === 'Casual') {
    casualLevel = await select({
      message: 'How casual should it be?',
      options: [
        {
          value: 'Slightly Casual',
          label: '💬 Slightly Casual (Friendly & Natural)',
        },
        { value: 'Casual', label: '😎 Casual (Everyday Conversational)' },
        { value: 'Super Casual', label: '🍕 Super Casual (Chill & Laid-Back)' },
      ],
    })

    if (isCancel(casualLevel)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }
  }

  const sentence = await text({
    message: 'Enter the sentence you want to naturalify:',
    validate: (input) => {
      if (!input.trim()) return '❌ Sentence cannot be empty'
      if (!isValidEnglishSentence(input))
        return '❌ Please enter the sentence in English only.'
      return undefined
    },
  })

  if (isCancel(sentence)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  outro(chalk.green('🎉 All set! Processing your sentence...'))

  return { inputType, style, formalityLevel, casualLevel, sentence }
}

export default promptUser
