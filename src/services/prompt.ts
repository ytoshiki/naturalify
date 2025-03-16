import inquirer from "inquirer";
import chalk from "chalk";

const promptUser = async () => {
  return inquirer.prompt([
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
        {
          name: "Super Casual (Chill & Laid-Back) 🍕",
          value: "Super Casual",
        },
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
};

export default promptUser;
