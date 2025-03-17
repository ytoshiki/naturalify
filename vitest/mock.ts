import { vi } from 'vitest'

vi.mock('../src/config/env.ts', () => {
  return {
    API_URL: 'mocked_api_key',
    API_KEY: 'mocked_api_url',
    MODEL: 'gpt-4o-mini',
    MAX_TOKEN: 250,
    TEMPERATURE: 1,
    DB_FILE: 'naturalify.db',
  }
})
