import boxen from 'boxen'
import OpenAIClient from '../../../services/openaiClient.js'
import { RequestInput, Response } from '../../../types/request.js'
import PreferenceCLI from '../../applications/preferenceApplication.js'
import Spinner from '../../helpers/spinner.js'
import selectPreference from '../../prompts/selectPreference.js'
import chalk from 'chalk'
import { copyToClipboard } from '../../helpers/clipboard.js'
import HistoryCLI from '../../applications/historyApplication.js'

const preferenceCli = new PreferenceCLI()
const openai = new OpenAIClient()
const historyCli = new HistoryCLI()

async function action(text: string) {
  const preference = await preferenceCli.getPreference()

  if (preference.length === 0) {
    return
  }

  const selectedPreference = await selectPreference(preference)

  const spinner = new Spinner()
  spinner.start('Converting sentence...')

  const transformedSentence = await convertSentence({
    ...selectedPreference,
    sentence: text,
  })

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

  const { context, recipient, communication } = selectedPreference
  await historyCli.saveHistory({
    context,
    recipient,
    communication,
    original_sentence: text,
    transformed_sentence: cleanedSentence,
  })
}

async function convertSentence(answers: RequestInput): Promise<Response> {
  const response = await openai.convertSentence(answers)

  return response
}

export default action
