// NOTE: This script is for experimental purposes only
import fs from 'fs/promises'
import path from 'path'
import OpenAIClient from '../src/services/openaiClient.js'

// NOTE: Set the following values to run the script
// SENTENCE: sentence to adjust
// FILENAME: filename to save the result
const SENTENCE =
  'Quick question, have you applied this change in production or just in staging environment?'
const FILENAME = 'a'

const openai = new OpenAIClient()

const communications = ['neutral', 'casual', 'polite']

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
        style: testCase.communication,
        original: testCase.sentence,
        adjusted: cleanedSentence,
      }
    }),
  )

  await saveResultsToFile(results)
}

function generateTestCases(sentence: string) {
  return communications.map((communication) => ({
    communication,
    sentence,
  }))
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
