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
      communication: 'polite',
      sentence: 'looks good to me.',
    })

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            content: `Adjust the tone of the following sentence to be polite, keeping the meaning and context intact.  
   Only make a change if necessary to make the sentence sound more natural, clear, and appropriate for Slack communication.
   Return the adjusted sentence without any additional explanation.
    
   Original: "looks good to me."
   Adjusted:`,
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
