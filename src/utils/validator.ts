export const isValidEnglishSentence = (input: string): boolean => {
  return /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(input)
}
