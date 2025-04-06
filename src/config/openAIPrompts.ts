const promptForSlack = (style: string, sentence: string) => {
  return `Adjust the tone of the following sentence to be ${style}, keeping the meaning and context intact.  
   Only make a change if necessary to make the sentence sound more natural, clear, and appropriate for Slack communication.
   Return the adjusted sentence without any additional explanation.
    
   Original: "${sentence}"
   Adjusted:`
}

export { promptForSlack }
