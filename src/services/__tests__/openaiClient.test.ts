import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import OpenAIClient from '../openaiClient.js'

vi.mock('axios')

describe('openAIClient.ts', () => {
  const mockApiKey = 'test-api-key'
  let client: OpenAIClient

  beforeEach(() => {
    vi.clearAllMocks()
    client = new OpenAIClient(mockApiKey)
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
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        model: 'gpt-4o-mini',
        messages: expect.any(Array),
        max_tokens: 250,
        temperature: 1,
      }),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${mockApiKey}`,
          'Content-Type': 'application/json',
        },
      }),
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
