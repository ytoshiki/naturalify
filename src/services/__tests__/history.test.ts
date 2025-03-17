import History from '../history.js'

const saveHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined))
const getHistoryMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue([
    {
      context: 'Slack',
      recipient: 'Boss',
      communication: 'Polite',
      original_sentence: 'I need to talk. Do you have time?',
      transformed_sentence:
        'Could we find a moment to discuss something? I appreciate your time.',
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
    await history.save({
      context: 'Github',
      recipient: 'Colleague',
      communication: 'InDirect',
      original_sentence: 'looks good to me.',
      transformed_sentence: 'I think it appears to be quite good.',
    })

    expect(saveHistoryMock).toHaveBeenCalledWith({
      context: 'Github',
      recipient: 'Colleague',
      communication: 'InDirect',
      original_sentence: 'looks good to me.',
      transformed_sentence: 'I think it appears to be quite good.',
    })
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
