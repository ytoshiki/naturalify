import { describe, it, expect, vi } from 'vitest'
import PreferenceRepository from '../preferenceRepository.js'
import { Preference } from '../../types/preference.js'

const preferenceData: Preference = {
  context: 'Github',
  recipient: 'Colleague',
  communication: 'InDirect',
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

describe('repositories/PreferenceRepository.ts', () => {
  let preferenceRepository: PreferenceRepository

  beforeEach(() => {
    vi.clearAllMocks()
    preferenceRepository = new PreferenceRepository()
  })

  it('should save Preference correctly', async () => {
    await expect(
      preferenceRepository.savePreference(preferenceData),
    ).resolves.not.toThrow()

    expect(mockRun).toHaveBeenCalledWith(
      'INSERT INTO preference (context, recipient, communication) VALUES (?, ?, ?)',
      [
        preferenceData.context,
        preferenceData.recipient,
        preferenceData.communication,
      ],
      expect.any(Function),
    )
  })

  it('should get preference correctly', async () => {
    const rows: Preference[] = [preferenceData]

    mockAll.mockImplementation((_, callback) => {
      callback(null, rows)
    })

    await expect(preferenceRepository.getPreference()).resolves.toEqual(rows)

    expect(mockAll).toHaveBeenCalledWith(
      'SELECT * FROM preference ORDER BY timestamp DESC',
      expect.any(Function),
    )
  })

  it('should clear preference correctly', async () => {
    mockRun.mockImplementation((_, callback) => {
      callback(null)
    })

    await expect(preferenceRepository.clearPreference()).resolves.not.toThrow()

    expect(mockRun).toHaveBeenCalledWith(
      'DELETE FROM preference',
      expect.any(Function),
    )
  })

  it('should handle error in savePreference', async () => {
    mockRun.mockImplementation((_, __, callback) =>
      callback(new Error('Database error')),
    )

    await expect(
      preferenceRepository.savePreference(preferenceData),
    ).rejects.toThrow('Database error')
  })

  it('should handle error in getPreference', async () => {
    mockAll.mockImplementation((_, callback) =>
      callback(new Error('Database error'), null),
    )

    await expect(preferenceRepository.getPreference()).rejects.toThrow(
      'Database error',
    )
  })

  it('should handle error in clearPreference', async () => {
    mockRun.mockImplementation((_, callback) =>
      callback(new Error('Database error')),
    )

    await expect(preferenceRepository.clearPreference()).rejects.toThrow(
      'Database error',
    )
  })
})
