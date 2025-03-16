import Database from "./database.js";

export default class History {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async save(
    inputType: string,
    style: string,
    originalSentence: string,
    transformedSentence: string
  ) {
    await this.db.saveHistory(
      inputType,
      style,
      originalSentence,
      transformedSentence
    );
  }

  async show() {
    const history = await this.db.getHistory();
    console.log("Translation History:");
    history.forEach((row) => {
      console.log(`
        Input Type: ${row.inputType}
        Style: ${row.style}
        Original: ${row.original_sentence}
        Transformed: ${row.transformed_sentence}
      `);
    });
  }

  async clear() {
    await this.db.dropHistory();
    console.log("✅ History cleared.");
  }
}
