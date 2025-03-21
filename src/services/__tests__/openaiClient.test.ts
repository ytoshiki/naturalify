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
      context: 'GitHub',
      recipient: 'colleague',
      communication: 'inDirect',
      sentence: 'looks good to me.',
    })

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            content: `You are an expert in professional communication. Rewrite the given sentence based on the recipient and communication style, with a focus on technical discussions and documentation.

Rules:

Recipient:
"manager" → A superior (e.g., boss, supervisor).
"colleague" → A peer or coworker.
"stranger" → Someone you do not know well (e.g., an external contributor).

Communication Style:
"direct" → Brief and clear; for quick technical discussions or requests, but not too abrupt.
"indirect" → More polite and considerate, but still focused on clarity.
"polite" → Respectful and formal, for interactions that may involve detailed code reviews or formal communication.

Examples:
Manager, Direct: "Please review this PR."
Manager, Indirect: "Could you review this PR when you have a chance?"
Manager, Polite: "I was wondering if you could take a look at this PR when you have time."
Colleague, Direct: "Check this issue."
Colleague, Indirect: "Could you take a look at this issue when possible?"
Colleague, Polite: "I’d appreciate it if you could provide feedback on this issue."
Stranger, Direct: "Can you merge this?"
Stranger, Indirect: "Would it be possible to merge this when you get the chance?"
Stranger, Polite: "I was wondering if you could merge this pull request when it's convenient for you."

Now rewrite this sentence accordingly:
recipient: colleague
communication style: inDirect
sentence: looks good to me.`,
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
