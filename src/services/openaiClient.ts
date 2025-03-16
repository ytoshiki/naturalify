import axios from "axios";
import chalk from "chalk";

export default class OpenAIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("❌ Missing API_KEY in .env file.");
    this.apiKey = apiKey;
  }

  async convertSentence(
    sentence: string,
    style: string,
    inputType: string,
    formalityLevel: string
  ): Promise<string | null> {
    const systemPrompt =
      "You are an expert at making English sentences sound natural and fluent.";

    const userPrompt = `Please improve the following sentence to make it sound more natural in English.  
    - Type: ${inputType}  
    - Style: ${style}  
    - Formality Level: ${formalityLevel}  
  
    Sentence: "${sentence}"`;
    //   - Type: ${inputType}
    //   - Style: ${style}
    //   - Formality Level: ${formalityLevel}

    //   Keep the meaning the same but improve fluency, clarity, and naturalness. Respond only with the revised sentence.

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    console.log(messages);

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
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(chalk.red("❌ API Error:"));
        console.error(`Status: ${error.response?.status}`);
        console.error(`Data: ${JSON.stringify(error.response?.data, null, 2)}`);
      }

      return null;
    }
  }
}
