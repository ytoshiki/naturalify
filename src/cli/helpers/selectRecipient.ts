export const selectRecipient = (platform: string) => {
  if (platform !== 'SNS (Social Media)') {
    return [
      { value: 'colleague', label: 'Colleague' },
      { value: 'manager', label: 'Manager' },
      { value: 'stranger', label: 'Stranger' },
    ]
  }

  return [
    { value: 'friend', label: 'Friend' },
    { value: 'acquaintance', label: 'Acquaintance' },
    { value: 'stranger', label: 'Stranger' },
  ]
}
