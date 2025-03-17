import axios from 'axios'
import chalk from 'chalk'
import {
  NATURALIFY_API_KEY,
  API_URL,
  MAX_TOKEN,
  MODEL,
  TEMPERATURE,
} from '../config/env.js'

export default class OpenAIClient {
  constructor() {
    if (!NATURALIFY_API_KEY)
      throw new Error('✖ Missing NATURALIFY_API_KEY in the environment.')
  }

  async convertSentence(
    sentence: string,
    style: string,
    inputType: string,
    formalityLevel: string,
  ): Promise<string | null> {
    const systemPrompt =
      'You are an expert at making English sentences sound natural and fluent.'

    const userPrompt = `Please improve the following sentence to make it sound more natural in English.
    - Type: ${inputType}
    - Style: ${style}
    - Formality Level: ${formalityLevel}
  
    Sentence: "${sentence}"`

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]

    try {
      const response = await axios.post(
        API_URL,
        {
          model: MODEL,
          messages: messages,
          max_tokens: MAX_TOKEN,
          temperature: TEMPERATURE,
        },
        {
          headers: {
            Authorization: `Bearer ${NATURALIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )

      return response.data.choices[0].message.content
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red('\n✖ API Error: '), error?.message)
        console.log(error)
      } else {
        if (axios.isAxiosError(error)) {
          console.error(chalk.red('\n✖ API Error:'))
          console.error(`Status: ${error.response?.status}`)
          console.error(
            `Data: ${JSON.stringify(error.response?.data, null, 2)}`,
          )
        }
      }

      return null
    }
  }
}
