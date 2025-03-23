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
      communication: 'indirect',
      sentence: 'looks good to me.',
    })

    expect(axios.post).toHaveBeenCalledWith(
      MOCK_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            content: `You are an expert in professional and technical communication. Rewrite the following sentence based on the recipient and communication style, ensuring it remains appropriate for GitHub discussions such as code reviews, issue tracking, and pull request comments. The rewritten sentence should maintain the original meaning, be respectful, and align with the conventions commonly used on GitHub.

### Rules:

1. Recipient:
   - "manager" → A superior (e.g., boss, supervisor). Communications should be respectful and professional, keeping a tone of authority while being clear.
   - "colleague" → A peer or coworker. The tone should be collaborative, clear, and professional but not overly formal.
   - "stranger" → Someone you don’t know well (e.g., an external contributor). This requires a more formal and respectful tone, possibly including some politeness to ease the interaction.

2. Communication Style:
   - "direct" → Clear and concise. Suitable for quick technical discussions or requests. It should be professional but not overly abrupt, especially for colleagues or managers.
   - "indirect" → Polite and considerate. Making requests in a less forceful manner while maintaining clarity. Suitable for when you want to sound respectful without being overly formal.
   - "polite" → Respectful, courteous, and professional, often used in formal reviews or when addressing someone unfamiliar. This style should be used for addressing someone you don’t know well or when the situation requires formality.

### Examples:

- Manager, Direct: "Please review this PR."
- Manager, Indirect: "Could you review this PR when you have a chance?"
- Manager, Polite: "I’d appreciate it if you could review this PR when you have time."
- Colleague, Direct: "Take a look at this issue."
- Colleague, Indirect: "Could you take a look at this issue when you get a chance?"
- Colleague, Polite: "I’d appreciate your feedback on this issue."
- Stranger, Direct: "Please merge this."
- Stranger, Indirect: "Would you be able to merge this when you have a moment?"
- Stranger, Polite: "If it's convenient, I’d appreciate it if you could merge this pull request."

### Instructions:
Now, rewrite the following sentence to match the recipient and communication style while keeping its original meaning. Ensure that the adjusted sentence:
- Reflects the appropriate level of formality and respect for the recipient.
- Aligns with common GitHub communication norms.
- Is concise, professional, and clear.

- Recipient: colleague
- Communication Style: indirect
- Sentence: "looks good to me."

If the sentence already aligns with the desired tone and communication style, return it unchanged. Otherwise, adjust it to ensure it remains professional, concise, and suitable for GitHub discussions.`,
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
