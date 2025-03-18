import chalk from 'chalk'
import boxen from 'boxen'
import { NATURALIFY_API_KEY } from '../../config/env.js'

const message = `
${chalk.red('👀 It looks like the NATURALIFY_API_KEY key is not set in the environment.')}

Please set the NATURALIFY_API_KEY key environment variable:

  ${chalk.green('For Windows (CMD):')}
  ${chalk.yellow('set NATURALIFY_API_KEY="your-api-key"')}
  
  ${chalk.green('For Windows (PowerShell):')}
  ${chalk.yellow('$env:NATURALIFY_API_KEY="your-api-key"')}
  
  ${chalk.green('For macOS/Linux:')}
  ${chalk.yellow('export NATURALIFY_API_KEY="your-api-key"')}

To make it permanent:

  ${chalk.green('For Windows (PowerShell):')}
  ${chalk.yellow('[System.Environment]::SetEnvironmentVariable("naturalify_openai_api", "your-api-key", "User")')}
  
  ${chalk.green('For macOS/Linux:')}
  ${chalk.yellow('# Add `export naturalify_openai_api="your-api-key"` to ~/.bash_profile or ~/.zshrc')}

  
For more details, please refer to the README: ${chalk.cyan('https://github.com/ytoshiki/naturalify')}
`

const boxedMessage = boxen(message, {
  padding: 1,
  margin: 1,
  borderStyle: 'round',

  borderColor: 'cyan',
})

const ensureAPIKey = () => {
  if (!NATURALIFY_API_KEY) {
    console.log(boxedMessage)
    return false
  }

  return true
}

export default ensureAPIKey
