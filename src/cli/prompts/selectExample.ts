import { intro, select, isCancel, cancel } from '@clack/prompts'
import chalk from 'chalk'

import { copyToClipboard } from '../helpers/clipboard.js'

const categories = {
  asking: [
    'Could you take a look at this when you have a chance?',
    'Would you mind reviewing this for me?',
    'Would you be able to give this a quick review?',
    'Can I get your thoughts on this?',
    'Do you have time to check this out?',
    "If you could take a look when you get a moment, I'd appreciate it.",
    'Let me know if anything looks off.',
  ],
  sharing: [
    'Just pushed the latest updates to the branch.',
    'I’ve added some new validation checks to the form.',
    "Here's the latest update, feel free to review when you can.",
    'Just sharing the progress for early feedback.',
    'I’ve updated the code; let me know if everything looks good.',
    'I’ve made some changes. Check it out when you get a chance!',
    'Here’s the implementation so far, I’d love your thoughts on it.',
  ],
  mistakes: [
    'Sorry about the delay, I’ll follow up shortly.',
    'I forgot to push the last commit, it’s up now!',
    'My bad, I missed that part. It’s fixed now.',
    'Thanks for catching that, I’ve updated it!',
  ],
  reviewing: [
    'Looks great to me!',
    'Nice work, everything checks out.',
    'Good catch!',
    'I like this approach, seems solid.',
    'Just a small suggestion: maybe consider renaming the variable?',
    'Could we add a test case for this?',
    'Looks good overall, but maybe double-check this part?',
  ],
  suggesting: [
    'What do you think about switching X for Y here?',
    'Would it be better to separate this into smaller components?',
    'Could we explore adding additional validation here?',
    'How does this approach sound to you?',
    'Would it be useful to add a feature to handle edge cases?',
    'I was thinking we could split this into separate modules.',
  ],
  other: [
    'LGTM! (Looks Good To Me)',
    '+1 to this idea.',
    'I’ll take a look at it later today.',
    'Let me know if I missed anything, happy to update.',
    'Everything looks good, happy to move forward.',
  ],
}

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
