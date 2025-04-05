import { intro, select, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'
import categories from '../prompts/examples.json' assert { type: 'json' }
import { copyToClipboard } from '../helpers/clipboard.js'

const selectExample = async () => {
  intro(chalk.blue('✨ Select an example ✨'))

  const category = await select({
    message: '1/2: Choose a situation to adjust your sentence for 🗣️',
    options: Object.keys(categories).map((key) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    })),
  })

  if (isCancel(category)) {
    cancel('Operation cancelled. No situation selected.')
    process.exit(0)
  }

  const examples = categories[category as keyof typeof categories]
  const example = await select({
    message: '2/2: Select an example sentence that fits your situation 📜',
    options: examples.map((sentence: string) => ({
      value: sentence,
      label: sentence,
    })),
  })

  if (isCancel(example)) {
    cancel('Operation cancelled. No example selected.')
    process.exit(0)
  }

  copyToClipboard(example)
  console.log(
    chalk.green(
      '\n🎉 Success! Your selected example has been copied to the clipboard. Ready to use!',
    ),
  )
}

export default selectExample
