import clipboardy from 'clipboardy'

export const copyToClipboard = (text: string) => {
  clipboardy.writeSync(text)
}
