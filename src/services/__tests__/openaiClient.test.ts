import axios from 'axios'
import OpenAIClient from '../openaiClient.js'

const MOCK_API_KEY = vi.hoisted(() => 'mocked_api_key')
const MOCK_API_URL = vi.hoisted(() => 'mock_api_url')

vi.mock('axios')
vi.mock('../../config/env.ts', () => {
  return {
    API_URL: MOCK_API_URL,
    NATURALIFY_API_KEY: MOCK_API_KEY,
    MODEL: 'gpt-4o-mini',
    MAX_TOKEN: 250,
    TEMPERATURE: 1,
    DB_FILE: 'naturalify.db',
  }
})

describe('services/openAIClient.ts', () => {
  let client: OpenAIClient

  beforeEach(() => {
    vi.clearAllMocks()
    client = new OpenAIClient()
  })

  it('should send the correct request and return a response', async () => {
    const mockResponse = {
      data: {
        choices: [
          { message: { content: 'This sentence sounds more natural.' } },
        ],
      },
    }

    vi.spyOn(axios, 'post').mockResolvedValue(mockResponse)

    const result = await client.convertSentence({
      context: 'Github',
      recipient: 'Colleague',
      communication: 'InDirect',
      sentence: 'looks good to me.',
    })

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            content: `
You are helping a non-native English speaker refine their writing.  
Rewrite the sentence naturally based on:  

- **Platform**: Github 
- **Recipient**: Colleague  
- **Tone**: InDirect 

Follow these platform-specific guidelines:  
- **SNS**: Casual, concise, abbreviations/slang allowed when appropriate.  
- **GitHub**: Logical, concise, and technically precise.  
- **Slack**: Business casual, clear, and friendly.  
- **Mail**: Formal, polite, and well-structured.  

Ensure that the **tone** matches both the platform and the intended formality level.  

Original: "looks good to me."  

Respond with **only the improved sentence**, nothing else.`,
            role: 'system',
          },
        ],
        max_tokens: 250,
        temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${MOCK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    expect(result?.result).toBe('This sentence sounds more natural.')
  })
})
