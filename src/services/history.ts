import Database from "./database.js";
import chalk from "chalk";
import ora from "ora";

export default class History {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  async initDB() {
    await this.db.init();
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
    console.log(chalk.bold("\n📜 Translation History:\n"));
    history.forEach((row, index) => {
      console.log(
        chalk.green(`${index + 1}. ${row.inputType} | ${row.style}`) +
          chalk.cyan(` (${row.transformed_sentence})`) +
          "\n" +
          chalk.gray(`Original: ${row.original_sentence}\n`)
      );
    });
  }

  async clear() {
    const spinner = ora(chalk.blue("⏳ Clearing history...")).start();

    await this.db.dropHistory();

    spinner.succeed(chalk.green("✅ History cleared."));
  }
}
