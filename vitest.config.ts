import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest/mock.ts'],
    globals: true,
    include: ['src/**/*.test.{ts,js}'],
  },
})
