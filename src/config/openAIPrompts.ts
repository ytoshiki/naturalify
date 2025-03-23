const promptForSlack = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in business communication. Rewrite the following sentence based on the recipient and communication style **only if a change is necessary**.

Rules:
1. Recipient:
   - "manager" → A superior (e.g., boss, supervisor).
   - "colleague" → A peer or coworker.
   - "stranger" → Someone you do not know well.
   
2. Communication Style:
   - "direct" → Clear and concise, without being overly formal or wordy.
   - "indirect" → Softer, more polite language, but still straightforward.
   - "polite" → Respectful but casual, without sounding too formal or stiff.

Examples:
- Manager, Direct: "Please approve this document."
- Manager, Indirect: "Would you mind reviewing this document?"
- Manager, Polite: "I’d appreciate it if you could review this document."
- Colleague, Direct: "Please check this out."
- Colleague, Indirect: "Could you take a look at this when you have a moment?"
- Colleague, Polite: "I’d appreciate it if you could review this."
- Stranger, Direct: "Please send the report."
- Stranger, Indirect: "Would it be possible to send the report?"
- Stranger, Polite: "I was wondering if you could send the report."

Now, rewrite the following sentence based on the recipient and communication style:

- Recipient: ${recipient}
- Communication style: ${communication}
- Sentence: ${sentence}

If the sentence already matches the desired tone and communication style, return it unchanged. If a change is necessary, rewrite it to fit the desired tone and style, **while keeping the original meaning**. Ensure the language remains natural, concise, and conversational—especially for Slack.`
}

const promptForGithub = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in professional and technical communication. Rewrite the following sentence based on the recipient and communication style, ensuring it remains appropriate for GitHub discussions such as code reviews, issue tracking, and pull request comments. The rewritten sentence should maintain the original meaning, be respectful, and align with the conventions commonly used on GitHub.

### Rules:

1. Recipient:
   - "manager" → A superior (e.g., boss, supervisor). Communications should be respectful and professional, keeping a tone of authority while being clear.
   - "colleague" → A peer or coworker. The tone should be collaborative, clear, and professional but not overly formal.
   - "stranger" → Someone you don’t know well (e.g., an external contributor). This requires a more formal and respectful tone, possibly including some politeness to ease the interaction.

2. Communication Style:
   - "direct" → Clear and concise. Suitable for quick technical discussions or requests. It should be professional but not overly abrupt, especially for colleagues or managers.
   - "indirect" → Polite and considerate. Making requests in a less forceful manner while maintaining clarity. Suitable for when you want to sound respectful without being overly formal.
   - "polite" → Respectful, courteous, and professional, often used in formal reviews or when addressing someone unfamiliar. This style should be used for addressing someone you don’t know well or when the situation requires formality.

### Examples:

- Manager, Direct: "Please review this PR."
- Manager, Indirect: "Could you review this PR when you have a chance?"
- Manager, Polite: "I’d appreciate it if you could review this PR when you have time."
- Colleague, Direct: "Take a look at this issue."
- Colleague, Indirect: "Could you take a look at this issue when you get a chance?"
- Colleague, Polite: "I’d appreciate your feedback on this issue."
- Stranger, Direct: "Please merge this."
- Stranger, Indirect: "Would you be able to merge this when you have a moment?"
- Stranger, Polite: "If it's convenient, I’d appreciate it if you could merge this pull request."

### Instructions:
Now, rewrite the following sentence to match the recipient and communication style while keeping its original meaning. Ensure that the adjusted sentence:
- Reflects the appropriate level of formality and respect for the recipient.
- Aligns with common GitHub communication norms.
- Is concise, professional, and clear.

- Recipient: ${recipient}
- Communication Style: ${communication}
- Sentence: "${sentence}"

If the sentence already aligns with the desired tone and communication style, return it unchanged. Otherwise, adjust it to ensure it remains professional, concise, and suitable for GitHub discussions.`
}

const promptForSNS = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in social communication. Rewrite the following sentence based on the recipient and communication style, focusing on informal discussions (e.g., social media messages on platforms like Facebook, Instagram, or Twitter).

Rules:

Recipient:
"friend" → A close friend or someone with a personal connection. The tone should be relaxed and familiar.
"acquaintance" → A person you know but with less familiarity, like a casual connection. The tone should be friendly but slightly less informal.
"stranger" → Someone you don’t know well (e.g., an external person or someone you have not met personally). The tone should be polite and respectful but still informal.

Communication Style:
"direct" → Brief and clear; suitable for quick social interactions, but not too abrupt or blunt.
"indirect" → Friendly, but polite and considerate; making a request or suggestion without being too forward.
"polite" → Slightly more formal, respectful, but still within an informal context, suitable for someone you don't know well.

Examples:
Friend, Direct: "Check this out!"
Friend, Indirect: "Could you check this out when you have time?"
Friend, Polite: "I’d appreciate it if you could take a look at this when you can."
Acquaintance, Direct: "Look at this when you can."
Acquaintance, Indirect: "Would you mind taking a look at this when you get a moment?"
Acquaintance, Polite: "I was wondering if you could take a look at this when you have a chance."
Stranger, Direct: "Can you send this to me?"
Stranger, Indirect: "Would you mind sending this to me when you get a chance?"
Stranger, Polite: "I was wondering if you could send this to me at your earliest convenience."

Now rewrite this sentence accordingly:
Recipient: ${recipient}
Communication Style: ${communication}
Sentence: ${sentence}`
}

export { promptForSlack, promptForGithub, promptForSNS }
