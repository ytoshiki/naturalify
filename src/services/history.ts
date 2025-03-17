import HistoryRepository from '../database/historyRepo.js'

export default class History {
  private historyRepo = new HistoryRepository()

  async save(
    inputType: string,
    style: string,
    originalSentence: string,
    transformedSentence: string,
  ) {
    await this.historyRepo.saveHistory(
      inputType,
      style,
      originalSentence,
      transformedSentence,
    )
  }

  async show() {
    return this.historyRepo.getHistory()
  }

  async clear() {
    await this.historyRepo.clearHistory()
  }
}
