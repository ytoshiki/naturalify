import { describe, it, expect, vi, beforeEach } from 'vitest'
import History from '../history.js'

const saveHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))
const getHistoryMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue([
    {
      inputType: 'Conversation',
      style: 'Casual',
      original_sentence: 'Hello, how are you?',
      transformed_sentence: "Hey, what's up?",
    },
  ]),
)
const clearHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))

vi.mock('../../database/historyRepo.ts', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      saveHistory: saveHistoryMock,
      getHistory: getHistoryMock,
      clearHistory: clearHistoryMock,
    })),
  }
})

describe('services/history.ts', () => {
  let history: History

  beforeEach(() => {
    vi.clearAllMocks()
    history = new History()
  })

  it('should save a history entry', async () => {
    await history.save('Conversation', 'Casual', 'Hello!', 'Hey!')

    expect(saveHistoryMock).toHaveBeenCalledWith(
      'Conversation',
      'Casual',
      'Hello!',
      'Hey!',
    )
  })

  it('should fetch and show history', async () => {
    await history.show()

    expect(getHistoryMock).toHaveBeenCalled()
  })

  it('should clear the history', async () => {
    await history.clear()

    expect(clearHistoryMock).toHaveBeenCalled()
  })
})
