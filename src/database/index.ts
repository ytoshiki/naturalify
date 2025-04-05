import sqlite3 from 'sqlite3'
import { DB_FILE, NATURALIFY_DB_PATH } from '../config/env.js'
import path from 'path'
import fs from 'fs'
import os from 'os'

const dbDirectory = path.resolve(NATURALIFY_DB_PATH)
const dbFilePath = path.join(dbDirectory, DB_FILE)

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

  static deleteDatabase(): void {
    try {
      if (fs.existsSync(dbFilePath)) {
        fs.unlinkSync(dbFilePath)
        console.log('The database has been deleted')
      } else {
        console.log('The database file does not exist')
      }
    } catch (error) {
      console.error('An error occurred while deleting the database:', error)
    }
  }
}
