import axios from 'axios'
import chalk from 'chalk'
import {
  NATURALIFY_API_KEY,
  API_URL,
  MAX_TOKEN,
  MODEL,
  TEMPERATURE,
} from '../config/env.js'
import { Request, Response } from '../types/openai.js'

export default class OpenAIClient {
  constructor() {
    if (!NATURALIFY_API_KEY)
      throw new Error('✖ Missing NATURALIFY_API_KEY in the environment.')
  }

  async convertSentence({
    context,
    recipient,
    communication,
    sentence,
  }: Request): Promise<Response> {
    const prompt = `
You are helping a non-native English speaker refine their writing.  
Rewrite the sentence naturally based on:  

- **Platform**: ${context} 
- **Recipient**: ${recipient}  
- **Tone**: ${communication} 

Follow these platform-specific guidelines:  
- **SNS**: Casual, concise, abbreviations/slang allowed when appropriate.  
- **GitHub**: Logical, concise, and technically precise.  
- **Slack**: Business casual, clear, and friendly.  
- **Mail**: Formal, polite, and well-structured.  

Ensure that the **tone** matches both the platform and the intended formality level.  

Original: "${sentence}"  

Respond with **only the improved sentence**, nothing else.`

    const messages = [{ role: 'system', content: prompt }]

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

      const tokensUsed = Number(response.data.usage?.total_tokens) ?? 0

      return {
        result: response.data.choices[0].message.content,
        tokens: tokensUsed,
      }
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
