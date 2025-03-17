import dotenv from 'dotenv'

dotenv.config()

export const API_URL = process.env.API_URL || ''
export const API_KEY = process.env.API_KEY || ''
export const MODEL = process.env.MODEL || 'gpt-4o-mini'
export const MAX_TOKEN = Number(process.env.MAX_TOKEN) || 250
export const TEMPERATURE = Number(process.env.TEMPERATURE) || 1
export const DB_FILE = process.env.DB_FILE || 'naturalify.db'
