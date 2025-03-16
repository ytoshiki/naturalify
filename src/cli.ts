import OpenAIClient from './services/openaiClient.js'
import History from './services/history.js'
import promptUser from './services/prompt.js'
import ora from 'ora'
import chalk from 'chalk'
import clipboardy from 'clipboardy'
import 'dotenv/config'
import boxen from 'boxen'

const openai = new OpenAIClient(process.env.API_KEY!)
const history = new History()

async function main() {
  await history.initDB()

  const args = process.argv.slice(2)

  if (args.includes('--history')) {
    await history.show()
    return
  }

  if (args.includes('--drop-history')) {
    await history.clear()
    return
  }

  if (args.length > 0) {
    console.error(chalk.red('❌ Unknown option:', args.join(' ')))
    console.log('Available options:')
    console.log('  --history         Show translation history')
    console.log('  --drop-history    Drop the history table')
    process.exit(1)
  }

  const answers = await promptUser()
  const spinner = ora(chalk.blue('⏳ Converting sentence...')).start()

  const result = await openai.convertSentence(
    answers.sentence,
    answers.style,
    answers.inputType,
    answers.casualLevel || answers.formalLevel,
  )

  if (!result) {
    spinner.fail(chalk.green('❌ Failed to convert.'))
    return
  }

  spinner.succeed(chalk.green('📋 Copied to clipboard!'))
  clipboardy.writeSync(result)
  console.log(
    boxen(chalk.cyanBright(result), {
      padding: 1,
      margin: 1,
    }),
  )
  await history.save(answers.inputType, answers.style, answers.sentence, result)
}

main().catch((err) => console.error(chalk.red('❌ Error:', err)))
