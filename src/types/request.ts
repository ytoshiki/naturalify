export type RequestInput = {
  context: string
  recipient: string
  communication: string
  sentence: string
}

export type Response = {
  result: string
  tokens: number
} | null
