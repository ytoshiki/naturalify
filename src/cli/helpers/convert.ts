import boxen from 'boxen'
import { RequestInput } from '../../types/request.js'
import { copyToClipboard } from './clipboard.js'
import chalk from 'chalk'
import Spinner from './spinner.js'
import OpenAIClient from '../../services/openaiClient.js'
import HistoryCLI from '../applications/historyApplication.js'

const openai = new OpenAIClient()
const historyCli = new HistoryCLI()

async function convert(input: RequestInput) {
  const spinner = new Spinner()
  spinner.start('Converting sentence...')

  const transformedSentence = await openai.convertSentence(input)

  if (!transformedSentence?.result) {
    spinner.stop(
      false,
      'Failed to convert. Please check if NATURALIFY_API_KEY is valid',
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

  const { context, recipient, communication, sentence } = input

  await historyCli.saveHistory({
    context,
    recipient,
    communication,
    original_sentence: sentence,
    transformed_sentence: cleanedSentence,
  })
}

export default convert
