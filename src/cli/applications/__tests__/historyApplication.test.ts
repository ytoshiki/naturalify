import HistoryApplication from '../historyApplication.js'
import chalk from 'chalk'

const mockPrompt = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ confirm: true }),
)
vi.mock('inquirer', () => ({
  default: {
    prompt: mockPrompt,
  },
}))

vi.mock('../../helpers/spinner.ts')

const mockHistoryData = vi.hoisted(() => [
  {
    communication: 'polite',
    original_sentence: 'I need to talk. Do you have time?',
    transformed_sentence:
      'Could we find a moment to discuss something? I appreciate your time.',
  },
])

const mockSave = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))
const mockShow = vi.hoisted(() => vi.fn().mockResolvedValue(mockHistoryData))
const mockClear = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))

vi.mock('../../../services/historyService.ts', () => ({
  default: vi.fn().mockImplementation(() => ({
    save: mockSave,
    show: mockShow,
    clear: mockClear,
  })),
}))

describe('applications/historyApplication.ts', () => {
  let historyApplication: HistoryApplication

  beforeEach(() => {
    historyApplication = new HistoryApplication()
  })

  it('should save history correctly', async () => {
    const historyData = {
      communication: 'polite',
      original_sentence: 'I need to talk. Do you have time?',
      transformed_sentence:
        'Could we find a moment to discuss something? I appreciate your time.',
    }

    await historyApplication.saveHistory(historyData)

    expect(mockSave).toHaveBeenCalledWith(historyData)
  })

  it('should show history correctly when history is available', async () => {
    console.log = vi.fn()

    await historyApplication.showHistory()

    expect(console.log).toHaveBeenCalledWith(
      chalk.bold('\n🪄 Text Adjustment History:\n'),
    )
    expect(console.log).toHaveBeenCalledWith(
      chalk.cyan(`${1}. ${mockHistoryData[0].communication}`) +
        '\n' +
        chalk.gray(`Original: ${mockHistoryData[0].original_sentence}\n`) +
        chalk.white(`Adjusted: ${mockHistoryData[0].transformed_sentence}`) +
        '\n',
    )
  })

  it('should show "No history found" message when history is empty', async () => {
    mockShow.mockResolvedValue([])

    console.log = vi.fn()

    await historyApplication.showHistory()

    expect(console.log).toHaveBeenCalledWith(chalk.yellow('No history found.'))
  })

  it('should clear history after confirmation', async () => {
    await historyApplication.clearHistory()

    expect(mockClear).toHaveBeenCalled()
  })

  it('should cancel clear history operation if not confirmed', async () => {
    mockPrompt.mockResolvedValue({ confirm: false })

    console.log = vi.fn()

    await historyApplication.clearHistory()

    expect(console.log).toHaveBeenCalledWith(
      chalk.red('✖ Operation cancelled.'),
    )
  })
})
