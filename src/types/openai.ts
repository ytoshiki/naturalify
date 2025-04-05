export type Request = {
  communication: string
  sentence: string
}

export type Response = {
  result: string
  tokens: number
} | null
