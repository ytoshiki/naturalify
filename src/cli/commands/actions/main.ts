import promptUser from '../../prompts/prompt.js'
import convert from '../../helpers/convert.js'

async function action() {
  const answers = await promptUser()

  await convert(answers)
}

export default action
