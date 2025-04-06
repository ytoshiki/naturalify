# Naturalify

Automatically adjusts your sentence to correct grammar and match the desired communication style.

![Image](https://github.com/user-attachments/assets/f56023f8-0cd0-4a68-bd11-365380ff969a)

## Installation

### Prerequisites

- **Node.js** version `>= 18.17.0` is required.

### Install via npm

```bash
npm install -g naturalify
```

Or clone the repository and run:

```bash
git clone https://github.com/ytoshiki/naturalify.git
cd naturalify
npm install
```

## API Key Setup

To use Naturalify, you need to set your OpenAI API key as an environment variable.

> 💡 Each request consumes approximately **500 tokens**, which costs around **$0.0003** when using the `gpt-4o-mini` model.

### Set the `NATURALIFY_API_KEY` Environment Variable

#### For Windows (CMD):

```cmd
set NATURALIFY_API_KEY="your-api-key"
```

#### For Windows (PowerShell):

```powershell
$env:NATURALIFY_API_KEY="your-api-key"
```

#### For macOS/Linux:

```bash
export NATURALIFY_API_KEY="your-api-key"
```

### Or Use a `.env` File

If you're running Naturalify locally, you can create a `.env` file in the root directory and add your API key like this:

```env
NATURALIFY_API_KEY=your-api-key
```

## Environment Variables

You can configure Naturalify with the following environment variables:

| Variable             | Description                                      | Default                          |
| -------------------- | ------------------------------------------------ | -------------------------------- |
| `NATURALIFY_API_KEY` | **(Required)** Your OpenAI API key               | –                                |
| `MODEL`              | OpenAI model to use                              | `gpt-4o-mini`                    |
| `MAX_TOKEN`          | Maximum number of tokens for a single completion | `250`                            |
| `TEMPERATURE`        | Sampling temperature (controls randomness)       | `1`                              |
| `NATURALIFY_DB_PATH` | Directory path to store the SQLite database      | `~/.naturalify` or `.naturalify` |
| `DB_FILE`            | SQLite database file name                        |

## Usage

Simply run the following command:

```bash
naturalify
```

Or if you're running locally, run the following command:

```bash
npm run dev
```

![Image](https://github.com/user-attachments/assets/f56023f8-0cd0-4a68-bd11-365380ff969a)

## Available Commands

| Command                      | Description                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| `naturalify`                 | Adjust your sentence to be more natural and fluent.                     |
| `naturalify history`         | Show the history of all adjusted texts.                                 |
| `naturalify clear-history`   | Clear all the text adjustment history.                                  |
| `naturalify delete-database` | Delete the entire history database.                                     |
| `naturalify examples`        | Pick a useful sentence from common work-related communication examples. |

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.
