import chalk from 'chalk'
import 'dotenv/config'
import boxen from 'boxen'
import HistoryCLI from './history.js'
import promptUser from './prompt.js'
import OpenAIClient from '../services/openaiClient.js'
import { initializeDatabase } from '../database/migration/index.js'
import { copyToClipboard } from '../utils/clipboard.js'
import Spinner from '../utils/spinner.js'
import ensureAPIKey from './apiKey.js'
import { RequestInput, Response } from '../types/request.js'

const historyCli = new HistoryCLI()
const openai = new OpenAIClient()

async function main() {
  if (!ensureAPIKey()) return
  await initializeDatabase()
  await handleCLIArguments()
}

async function handleCLIArguments() {
  const args = process.argv.slice(2)

  if (args[0] === '--history') {
    return await historyCli.showHistory()
  }
  if (args[0] === '--drop-history') {
    return await historyCli.clearHistory()
  }

  if (args.length > 0) {
    console.error(chalk.red('✖ Unknown option:', args.join(' ')))
    console.log('Available options:')
    console.log('  --history         Show translation history')
    console.log('  --drop-history    Drop the history table')
    process.exit(1)
  }

  await processUserInput()
}

async function processUserInput() {
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

main().catch((err) => console.error(chalk.red(err)))
