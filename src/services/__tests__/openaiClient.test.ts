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
            content: `You are an expert in business communication. Your task is to **adjust the tone and formality** of a sentence intended for Slack communication, based on the provided style (neutral, casual, polite). The goal is to make the sentence **natural, clear, and professional**, without sounding overly casual or stiff. Ensure the message remains concise, friendly, and fitting for business communication.
 
 ### Instructions:
 1. **Style**:
    - **"neutral"** → Use a **clear, straightforward**, and **professional** tone appropriate for work-related conversations. Keep it brief and to the point, avoiding unnecessary embellishments, slang, or overly casual phrases.
    - **"casual"** → Use a **relaxed, friendly**, and approachable tone. This style is ideal for peers or informal conversations.
    - **"polite"** → A **respectful** but **informal** tone. It's polite without being overly formal, suitable for Slack's casual environment while still maintaining professionalism.
 
 2. **Adjustments**:
    - Keep the message **short, natural, and conversational** for the appropriate style.
    - For **neutral**, avoid casual terms like "ASAP" or "just" and focus on clear, respectful, and professional phrasing.
    - For **casual**, a more relaxed, friendly tone is fine, but ensure the message remains understandable.
    - For **polite**, use a more considerate tone while avoiding excessive formality.
 
 ### Example Adjustments:
 
 - **Neutral**: 
    - "Could you clarify the topic?"
    - "Let me know if I can help with anything."
    - "Do you need anything from me?"
    - "Let me know if you have any questions."
 
 - **Casual**:
    - "Can you clarify the topic for me?"
    - "Just checking in. Let me know if you need anything!"
    - "Hey, can you clarify something for me?"
    - "Let me know if you need help with anything!"
 
 - **Polite**:
    - "Could you clarify the topic when you have a moment?"
    - "Let me know if you need anything from me!"
    - "I hope you're doing well. Could you clarify this when you have a chance?"
    - "Please let me know if you need anything further from me."
 
 ### Task:
 Adjust the following sentence according to the style provided, ensuring it fits the tone and context for Slack communication. If the sentence is already appropriate, return it unchanged.
 
 - **Style**: polite
 - **Sentence**: "looks good to me."
 
 Return the adjusted sentence based on the context provided.`,
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
