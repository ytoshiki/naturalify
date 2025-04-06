import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export const API_URL = 'https://api.openai.com/v1/chat/completions'
export const NATURALIFY_API_KEY = process.env.NATURALIFY_API_KEY || ''
export const MODEL = process.env.MODEL || 'gpt-4o-mini'
export const MAX_TOKEN = Number(process.env.MAX_TOKEN) || 250
export const TEMPERATURE = Number(process.env.TEMPERATURE) || 1
export const NATURALIFY_DB_PATH =
  process.env.NATURALIFY_DB_PATH ||
  (process.env.HOME
    ? path.join(process.env.HOME, '.naturalify')
    : path.resolve('.naturalify'))
export const DB_FILE = process.env.DB_FILE || 'naturalify.db'
