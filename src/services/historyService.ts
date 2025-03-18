import { History as THistory } from '../types/history.js'
import HistoryRepository from '../repositories/historyRepository.js'

export default class History {
  private historyRepo = new HistoryRepository()

  async save(history: THistory) {
    await this.historyRepo.saveHistory(history)
  }

  async show() {
    return this.historyRepo.getHistory()
  }

  async clear() {
    await this.historyRepo.clearHistory()
  }
}
