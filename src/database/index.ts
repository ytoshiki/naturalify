import sqlite3 from 'sqlite3'
import { DB_FILE } from '../config/env.js'
import path from 'path'
import fs from 'fs'
import os from 'os'

const dbDirectory = path.join(os.homedir(), '.naturalify')
if (!fs.existsSync(dbDirectory)) fs.mkdirSync(dbDirectory, { recursive: true })

export default class Database {
  private static instance: sqlite3.Database | null = null

  static getInstance(): sqlite3.Database {
    if (!Database.instance) {
      if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true })
      }

      Database.instance = new sqlite3.Database(
        path.join(dbDirectory, DB_FILE),
        (err) => {
          if (err) {
            console.error('Failed to open database:', err.message)
          }
        },
      )
    }
    return Database.instance
  }
}
