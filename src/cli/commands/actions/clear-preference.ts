import PreferenceCLI from '../../applications/preferenceApplication.js'

const preferenceCli = new PreferenceCLI()

async function action() {
  await preferenceCli.clearPreference()
}

export default action
