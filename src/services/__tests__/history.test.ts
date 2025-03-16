import { describe, it, expect, vi, beforeEach } from 'vitest'
import History from '../history.js'

const initMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))
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
const dropHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))

vi.mock('../database.ts', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      init: initMock,
      saveHistory: saveHistoryMock,
      getHistory: getHistoryMock,
      dropHistory: dropHistoryMock,
    })),
  }
})

describe('history.ts', () => {
  let history: History

  beforeEach(() => {
    vi.clearAllMocks()
    history = new History()
  })

  it('should initialize the database', async () => {
    await history.initDB()
    expect(initMock).toHaveBeenCalled()
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
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await history.show()

    expect(getHistoryMock).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('📜 Translation History:'),
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Conversation | Casual'),
    )

    consoleSpy.mockRestore()
  })

  it('should clear the history', async () => {
    await history.clear()

    expect(dropHistoryMock).toHaveBeenCalled()
  })
})
