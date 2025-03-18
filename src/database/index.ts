import sqlite3 from 'sqlite3'
import { DB_FILE } from '../config/env.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbDirectory = path.resolve(__dirname, 'db')

export default class Database {
  private static instance: sqlite3.Database | null = null

  static getInstance(): sqlite3.Database {
    if (!Database.instance) {
      if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true })
      }

      Database.instance = new sqlite3.Database(
        path.resolve(__dirname, 'db', DB_FILE),
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
