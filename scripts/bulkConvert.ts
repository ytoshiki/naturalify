// NOTE: This script is for experimental purposes only
// Consumes approximately 300 * 3 * 3 tokens
import { Request } from '../src/types/openai'
import fs from 'fs/promises'
import path from 'path'
import OpenAIClient from '../src/services/openaiClient.js'

// NOTE: Set the following values to run the script
// SENTENCE: sentence to adjust
// FILENAME: filename to save the result
const SENTENCE = ''
const FILENAME = ''

const openai = new OpenAIClient()

// const contexts = ['Slack', 'GitHub', 'SNS (Social Media)']
const contexts = ['SNS (Social Media)']
const communications = ['direct', 'indirect', 'polite']
const recipientsForBusiness = ['manager', 'colleague', 'stranger']
const recipientsForCasual = ['friend', 'acquaintance', 'stranger']

run()

async function run() {
  if (!SENTENCE || !FILENAME) {
    console.log('SENTENCE and FILENAME have to be set to run this script')
    process.exit(0)
  }

  const testCases = generateTestCases(SENTENCE)

  const results = await Promise.all(
    testCases.map(async (testCase) => {
      const transformedSentence = await openai.convertSentence(testCase)

      const cleanedSentence = transformedSentence?.result.replace(/^"|"$/g, '')

      return {
        platform: testCase.context,
        recipient: testCase.recipient,
        style: testCase.communication,
        original: testCase.sentence,
        adjusted: cleanedSentence,
      }
    }),
  )

  await saveResultsToFile(results)
}

function generateTestCases(sentence: string) {
  return contexts.flatMap<Request>((context) => {
    const recipients =
      context === 'SNS (Social Media)'
        ? recipientsForCasual
        : recipientsForBusiness

    return recipients.flatMap((recipient) =>
      communications.map((communication) => ({
        context,
        recipient,
        communication,
        sentence,
      })),
    )
  })
}

async function saveResultsToFile(data: any) {
  const dirPath = path.join(process.cwd(), 'samples')
  const filePath = path.join(dirPath, `${FILENAME}.json`)

  try {
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`Results saved to ${filePath}`)
  } catch (error) {
    console.error('Failed to save results:', error)
  }
}
