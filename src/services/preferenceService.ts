import { Preference as TPreference } from '../types/preference.js'
import PreferenceRepository from '../repositories/preferenceRepository.js'

export default class Preference {
  private preferenceRepo = new PreferenceRepository()

  async save(preference: TPreference) {
    await this.preferenceRepo.savePreference(preference)
  }

  async show() {
    return this.preferenceRepo.getPreference()
  }

  async clear() {
    await this.preferenceRepo.clearPreference()
  }
}
