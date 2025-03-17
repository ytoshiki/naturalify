import sqlite3 from 'sqlite3'
import { DB_FILE } from '../config/env.js'

export default class Database {
  private static instance: sqlite3.Database | null = null

  static getInstance(): sqlite3.Database {
    if (!Database.instance) {
      Database.instance = new sqlite3.Database(DB_FILE)
    }
    return Database.instance
  }
}
