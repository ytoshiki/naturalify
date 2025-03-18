import promptUser from '../../prompts/main.js'
import convert from '../../helpers/convert.js'

async function action() {
  const answers = await promptUser()

  await convert(answers)
}

export default action
