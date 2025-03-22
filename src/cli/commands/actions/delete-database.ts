import Database from '../../../database/index.js'

function action() {
  Database.deleteDatabase()
}

export default action
