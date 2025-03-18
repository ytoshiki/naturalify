import chalk from 'chalk'
import 'dotenv/config'
import boxen from 'boxen'
import HistoryCLI from '../../../applications/historyApplication.js'
import promptUser from '../../prompts/prompt.js'
import OpenAIClient from '../../../services/openaiClient.js'
import { copyToClipboard } from '../../helpers/clipboard.js'
import Spinner from '../../helpers/spinner.js'
import { RequestInput, Response } from '../../../types/request.js'

const historyCli = new HistoryCLI()
const openai = new OpenAIClient()

async function action() {
  const answers = await promptUser()

  const spinner = new Spinner()
  spinner.start('Converting sentence...')

  const transformedSentence = await convertSentence(answers)

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
    }),
  )

  console.log(`tokens used: `, transformedSentence.tokens)

  copyToClipboard(cleanedSentence)

  const { context, recipient, communication, sentence } = answers
  await historyCli.saveHistory({
    context,
    recipient,
    communication,
    original_sentence: sentence,
    transformed_sentence: cleanedSentence,
  })
}

async function convertSentence(answers: RequestInput): Promise<Response> {
  const response = await openai.convertSentence(answers)

  return response
}

export default action
