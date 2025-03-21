import { describe, it, expect, vi, beforeEach } from 'vitest'
import PreferenceApplication from '../preferenceApplication.js'
import chalk from 'chalk'

const mockPrompt = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ confirm: true }),
)
vi.mock('inquirer', () => ({
  default: {
    prompt: mockPrompt,
  },
}))

vi.mock('boxen')
vi.mock('../../helpers/spinner.ts')

const mockPreferenceData = vi.hoisted(() => [
  {
    context: 'Slack',
    recipient: 'manager',
    communication: 'polite',
  },
])
const mockSave = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))
const mockShow = vi.hoisted(() => vi.fn().mockResolvedValue(mockPreferenceData))
const mockClear = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))

vi.mock('../../../services/preferenceService.ts', () => ({
  default: vi.fn().mockImplementation(() => ({
    save: mockSave,
    show: mockShow,
    clear: mockClear,
  })),
}))

describe('PreferenceApplication', () => {
  let preferenceApplication: PreferenceApplication

  beforeEach(() => {
    preferenceApplication = new PreferenceApplication()
  })

  it('should save preference correctly', async () => {
    const preferenceData = {
      context: 'Slack',
      recipient: 'manager',
      communication: 'polite',
    }

    await preferenceApplication.savePreference(preferenceData)

    expect(mockSave).toHaveBeenCalledWith(preferenceData)
  })

  it('should show preference correctly when preference is available', async () => {
    console.log = vi.fn()

    await preferenceApplication.showPreference()

    expect(console.log).toHaveBeenCalledWith(chalk.bold('\n✨ Preferences:\n'))
    expect(console.log).toHaveBeenCalledWith(
      chalk.cyan(
        `${1}. ${mockPreferenceData[0].context} | ${mockPreferenceData[0].recipient} | ${mockPreferenceData[0].communication}`,
      ),
    )
  })

  it('should show "No preferences found" message when preferences are empty', async () => {
    mockShow.mockResolvedValue([])

    console.log = vi.fn()

    await preferenceApplication.showPreference()

    expect(console.log).toHaveBeenCalledWith(
      chalk.yellow('No preferences found.'),
    )
  })

  it('should clear preferences after confirmation', async () => {
    await preferenceApplication.clearPreference()

    expect(mockClear).toHaveBeenCalled()
  })

  it('should cancel clear preference operation if not confirmed', async () => {
    mockPrompt.mockResolvedValue({ confirm: false })

    console.log = vi.fn()

    await preferenceApplication.clearPreference()

    expect(console.log).toHaveBeenCalledWith(
      chalk.red('✖ Operation cancelled.'),
    )
  })

  it('should handle duplicate preference save correctly', async () => {
    mockSave.mockRejectedValue({ code: 'SQLITE_CONSTRAINT' })

    console.log = vi.fn()

    const preferenceData = {
      context: 'Slack',
      recipient: 'manager',
      communication: 'polite',
    }

    await expect(
      preferenceApplication.savePreference(preferenceData),
    ).rejects.toThrow('process.exit unexpectedly called with "0"')
  })
})
