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

    const sentence = 'This is a test sentence.'
    const style = 'Formal'
    const inputType = 'Conversation'
    const formalityLevel = 'Formal but not too formal'

    const result = await client.convertSentence(
      sentence,
      style,
      inputType,
      formalityLevel,
    )

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            content:
              'You are an expert at making English sentences sound natural and fluent.',
            role: 'system',
          },
          {
            content: `Please improve the following sentence to make it sound more natural in English.
    - Type: Conversation
    - Style: Formal
    - Formality Level: Formal but not too formal
  
    Sentence: \"This is a test sentence.\"`,
            role: 'user',
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

    expect(result).toBe('This sentence sounds more natural.')
  })

  it('should return null if the API request fails', async () => {
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('API request failed'))
    const result = await client.convertSentence(
      'Test sentence',
      'Formal',
      'Conversation',
      'Formal but not too formal',
    )

    expect(result).toBeNull()
  })
})
