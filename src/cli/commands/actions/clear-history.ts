import HistoryCLI from '../../../applications/historyApplication.js'

const historyCli = new HistoryCLI()

async function action() {
  await historyCli.clearHistory()
}

export default action
