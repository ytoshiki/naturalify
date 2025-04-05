import boxen from 'boxen'
import { Request } from '../../types/openai.js'
import { copyToClipboard } from './clipboard.js'
import chalk from 'chalk'
import Spinner from './spinner.js'
import OpenAIClient from '../../services/openaiClient.js'
import HistoryCLI from '../applications/historyApplication.js'

async function convert(input: Request) {
  const openai = new OpenAIClient()
  const historyCli = new HistoryCLI()

  const spinner = new Spinner()
  spinner.start('Adjusting your sentence...')

  const transformedSentence = await openai.convertSentence(input)

  if (!transformedSentence?.result) {
    spinner.stop(
      false,
      'Adjustment failed. Please verify that your NATURALIFY_API_KEY is correct.',
    )
    return null
  }

  const cleanedSentence = transformedSentence.result.replace(/^"|"$/g, '')

  spinner.stop(true, 'Copied to clipboard!')

  console.log(
    boxen(chalk.cyanBright(cleanedSentence), {
      padding: 1,
      margin: 1,
      dimBorder: true,
      borderStyle: 'classic',
    }),
  )

  console.log(`tokens used: `, transformedSentence.tokens)

  copyToClipboard(cleanedSentence)

  const { communication, sentence } = input

  await historyCli.saveHistory({
    communication,
    original_sentence: sentence,
    transformed_sentence: cleanedSentence,
  })
}

export default convert
