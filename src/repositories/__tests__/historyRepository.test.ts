import { describe, it, expect, vi } from 'vitest'
import HistoryRepository from '../historyRepository.js'
import { History } from '../../types/history.js'

const historyData: History = {
  context: 'Github',
  recipient: 'Colleague',
  communication: 'InDirect',
  original_sentence: 'looks good to me.',
  transformed_sentence: 'I think it appears to be quite good.',
}

const mockRun = vi.hoisted(() =>
  vi.fn().mockImplementation((_, __, callback) => {
    callback(null)
  }),
)
const mockAll = vi.hoisted(() =>
  vi.fn().mockImplementation((_, callback) => {
    callback(null)
  }),
)

vi.mock('../../database/index.ts', () => ({
  default: {
    getInstance: vi.fn().mockReturnValue({
      run: mockRun,
      all: mockAll,
    }),
  },
}))

describe('repositories/historyRepository.ts', () => {
  let historyRepository: HistoryRepository

  beforeEach(() => {
    vi.clearAllMocks()
    historyRepository = new HistoryRepository()
  })

  it('should save history correctly', async () => {
    await expect(
      historyRepository.saveHistory(historyData),
    ).resolves.not.toThrow()

    expect(mockRun).toHaveBeenCalledWith(
      'INSERT INTO history (context, recipient, communication, original_sentence, transformed_sentence) VALUES (?, ?, ?, ?, ?)',
      [
        historyData.context,
        historyData.recipient,
        historyData.communication,
        historyData.original_sentence,
        historyData.transformed_sentence,
      ],
      expect.any(Function),
    )
  })

  it('should get history correctly', async () => {
    const rows: History[] = [historyData]

    mockAll.mockImplementation((_, callback) => {
      callback(null, rows)
    })

    await expect(historyRepository.getHistory()).resolves.toEqual(rows)

    expect(mockAll).toHaveBeenCalledWith(
      'SELECT * FROM history ORDER BY timestamp DESC',
      expect.any(Function),
    )
  })

  it('should clear history correctly', async () => {
    mockRun.mockImplementation((_, callback) => {
      callback(null)
    })

    await expect(historyRepository.clearHistory()).resolves.not.toThrow()

    expect(mockRun).toHaveBeenCalledWith(
      'DELETE FROM history',
      expect.any(Function),
    )
  })

  it('should handle error in saveHistory', async () => {
    mockRun.mockImplementation((_, __, callback) =>
      callback(new Error('Database error')),
    )

    await expect(historyRepository.saveHistory(historyData)).rejects.toThrow(
      'Database error',
    )
  })

  it('should handle error in getHistory', async () => {
    mockAll.mockImplementation((_, callback) =>
      callback(new Error('Database error'), null),
    )

    await expect(historyRepository.getHistory()).rejects.toThrow(
      'Database error',
    )
  })

  it('should handle error in clearHistory', async () => {
    mockRun.mockImplementation((_, callback) =>
      callback(new Error('Database error')),
    )

    await expect(historyRepository.clearHistory()).rejects.toThrow(
      'Database error',
    )
  })
})
