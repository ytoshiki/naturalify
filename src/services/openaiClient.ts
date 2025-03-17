import axios from 'axios'
import chalk from 'chalk'
import {
  API_KEY,
  API_URL,
  MAX_TOKEN,
  MODEL,
  TEMPERATURE,
} from '../config/env.js'

export default class OpenAIClient {
  constructor() {
    if (!API_KEY) throw new Error('❌ Missing API_KEY in .env file.')
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
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )

      return response.data.choices[0].message.content
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(chalk.red('❌ API Error:'))
        console.error(`Status: ${error.response?.status}`)
        console.error(`Data: ${JSON.stringify(error.response?.data, null, 2)}`)
      }

      return null
    }
  }
}
