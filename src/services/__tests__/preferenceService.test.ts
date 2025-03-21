import Preference from '../preferenceService.js'

const savePreferenceMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue(undefined),
)
const getPreferenceMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue([
    {
      context: 'Slack',
      recipient: 'manager',
      communication: 'polite',
      original_sentence: 'I need to talk. Do you have time?',
      transformed_sentence:
        'Could we find a moment to discuss something? I appreciate your time.',
    },
  ]),
)
const clearPreferenceMock = vi.hoisted(() =>
  vi.fn().mockResolvedValue(undefined),
)

vi.mock('../../repositories/preferenceRepository.ts', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      savePreference: savePreferenceMock,
      getPreference: getPreferenceMock,
      clearPreference: clearPreferenceMock,
    })),
  }
})

describe('services/preferenceService.ts', () => {
  let preference: Preference

  beforeEach(() => {
    vi.clearAllMocks()
    preference = new Preference()
  })

  it('should save a preference entry', async () => {
    await preference.save({
      context: 'Github',
      recipient: 'Colleague',
      communication: 'InDirect',
    })

    expect(savePreferenceMock).toHaveBeenCalledWith({
      context: 'Github',
      recipient: 'Colleague',
      communication: 'InDirect',
    })
  })

  it('should fetch and show preference', async () => {
    await preference.show()

    expect(getPreferenceMock).toHaveBeenCalled()
  })

  it('should clear the preference', async () => {
    await preference.clear()

    expect(clearPreferenceMock).toHaveBeenCalled()
  })
})
