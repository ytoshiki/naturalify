import axios from "axios";
import inquirer from "inquirer";
import Database from "./db/index.js";
import clipboardy from "clipboardy";
import chalk from "chalk";
import boxen from "boxen";
import ora from "ora";
import "dotenv/config";

const apiKey = process.env.API_KEY;

const db = new Database();

const showHistory = async () => {
  const history = await db.getHistory();

  console.log("Translation History:");

  if (history && history.length > 0) {
    history.forEach((row) => {
      console.log(`
          Input Type: ${row.inputType}
          Style: ${row.style}
          Original Sentence: ${row.original_sentence}
          Transformed Sentence: ${row.transformed_sentence}
        `);
    });
  }
};

const getInput = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "inputType",
      message: "Choose the type of input:",
      choices: [
        { name: chalk.yellow("Conversation 🗣️"), value: "Conversation" },
        { name: chalk.yellow("Text ✍️"), value: "Text" },
      ],
    },
    {
      type: "list",
      name: "style",
      message: "Choose the style of English:",
      choices: [
        { name: chalk.yellow("Formal 🤝"), value: "Formal" },
        { name: chalk.yellow("Casual 😎"), value: "Casual" },
      ],
    },
    {
      type: "list",
      name: "formalLevel",
      message: "How formal should it be?",
      choices: [
        {
          name: "Slightly Formal (Professional but Friendly) 🤝",
          value: "Slightly formal, but friendly)",
        },
        {
          name: "Formal (suitable for workplace communication) 📜",
          value: "Formal but not too formal",
        },
        {
          name: "Very Formal (Highly Polite and Diplomatic) 🏛️",
          value: "Formal",
        },
      ],
      when: (answers) => answers.style === "Formal",
    },
    {
      type: "list",
      name: "casualLevel",
      message: "How casual should it be?",
      choices: [
        {
          name: "Slightly Casual (Friendly & Natural) 💬",
          value: "Slightly Casual",
        },
        { name: "Casual (Everyday Conversational) 😎", value: "Casual" },
        { name: "Super Casual (Chill & Laid-Back) 🍕", value: "Super Casual" },
      ],
      when: (answers) => answers.style === "Casual",
    },
    {
      type: "input",
      name: "sentence",
      message: "Enter the sentence you want to naturalify:",
      validate: (input) => {
        if (!input.trim()) {
          return "Sentence cannot be empty";
        }
        if (!/^[a-zA-Z0-9\s.,!?'"()-]+$/.test(input)) {
          return "Please enter the sentence in English only.";
        }
        return true;
      },
      transformer: (input) => chalk.yellow(`${input}`),
    },
  ]);

  const transformedSentence = await convertSentence(
    answers.sentence,
    answers.style,
    answers.inputType,
    answers.casualLevel || "",
    answers.formalLevel || ""
  );

  if (transformedSentence) {
    console.log(
      boxen(chalk.cyanBright(transformedSentence), {
        padding: 1,
        margin: 1,
      })
    );

    await saveToHistory(
      answers.inputType,
      answers.style,
      answers.sentence,
      transformedSentence
    );
  }
};

const saveToHistory = async (
  inputType: string,
  style: string,
  originalSentence: string,
  transformedSentence: string
) => {
  await db.saveHistory(inputType, style, originalSentence, transformedSentence);
};

const convertSentence = async (
  sentence: string,
  style: string,
  inputType: string,
  casualLevel: string,
  formalLevel: string
) => {
  if (!apiKey) {
    console.error(chalk.red("❌ Missing API_KEY in .env file."));
    process.exit(1);
  }

  const systemMessage =
    inputType === "Conversation"
      ? "You adjust the tone of conversation-style English."
      : "You adjust the tone of text-style English.";

  let instruction = "";

  instruction = casualLevel
    ? `a ${casualLevel.toLowerCase()} tone.`
    : formalLevel
    ? `a ${formalLevel.toLowerCase()} tone`
    : "";

  const prompt = `Your task is to make the following sentence sound more natural in English.

    - Type: ${inputType}
    - Style: ${style}
    - Formality Level: ${casualLevel || formalLevel}
    
    Keep the meaning the same but improve fluency, clarity, and naturalness. Respond only with the revised sentence without explanations.
    `;

  const messages = [
    { role: "system", content: prompt },
    {
      role: "user",
      content: `${sentence}`,
    },
  ];

  console.log(messages);

  const spinner = ora(chalk.blue("⏳ Converting sentence...")).start();

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 250,
        temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content;

    clipboardy.writeSync(result);

    spinner.succeed(chalk.green("📋 Copied to clipboard!"));

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(chalk.red("❌ API Error:"));
      console.error(`Status: ${error.response?.status}`);
      console.error(`Data: ${JSON.stringify(error.response?.data, null, 2)}`);

      return null;
    }

    console.error("❌ Unexpected Error:", error);
  }
};

const run = async () => {
  const args = process.argv.slice(2);

  if (args.includes("--history")) {
    await showHistory();
    return;
  }

  if (args.includes("--drop-history")) {
    await db.dropHistoryTable();
    return;
  }

  if (args.length > 0) {
    console.error(chalk.red("❌ Unknown option:", args.join(" ")));
    console.log("Available options:");
    console.log("  --history         Show translation history");
    console.log("  --drop-history    Drop the history table");
    process.exit(1);
  }

  await getInput();
};

run().catch((error) => {
  console.error("Error:", error);
});
