const promptForSlack = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in business communication. Rewrite the given sentence based on the recipient and communication style.

Rules:

Recipient:
"manager" → A superior (e.g., boss, supervisor).
"colleague" → A peer or coworker.
"stranger" → Someone you do not know well.

Communication Style:
"direct" → Concise and to the point, but not abrupt or demanding.
"indirect" → Softer and polite (e.g., "Would you be able to...").
"polite" → Very polite and formal (e.g., "I was wondering if...").

Examples:
Manager, Direct: "Can you review this?"
Manager, Indirect: "Would you be able to review this?"
Manager, Polite: "I was wondering if you could review this."
Colleague, Direct: "Check this for me."
Colleague, Indirect: "Could you take a look at this?"
Colleague, Polite: "I’d appreciate it if you could review this."
Stranger, Direct: "Can you send the report?"
Stranger, Indirect: "Would it be possible to send the report?"
Stranger, Polite: "I was wondering if you could send the report."

Now, adjust the following sentence accordingly:
recipient: ${recipient}
communication style: ${communication}
sentence: ${sentence}`
}

const promptForGithub = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in professional communication. Rewrite the given sentence based on the recipient and communication style, with a focus on technical discussions and documentation.

Rules:

Recipient:
"manager" → A superior (e.g., boss, supervisor).
"colleague" → A peer or coworker.
"stranger" → Someone you do not know well (e.g., an external contributor).

Communication Style:
"direct" → Brief and clear; for quick technical discussions or requests, but not too abrupt.
"indirect" → More polite and considerate, but still focused on clarity.
"polite" → Respectful and formal, for interactions that may involve detailed code reviews or formal communication.

Examples:
Manager, Direct: "Please review this PR."
Manager, Indirect: "Could you review this PR when you have a chance?"
Manager, Polite: "I was wondering if you could take a look at this PR when you have time."
Colleague, Direct: "Check this issue."
Colleague, Indirect: "Could you take a look at this issue when possible?"
Colleague, Polite: "I’d appreciate it if you could provide feedback on this issue."
Stranger, Direct: "Can you merge this?"
Stranger, Indirect: "Would it be possible to merge this when you get the chance?"
Stranger, Polite: "I was wondering if you could merge this pull request when it's convenient for you."

Now rewrite this sentence accordingly:
recipient: ${recipient}
communication style: ${communication}
sentence: ${sentence}`
}

const promptForSNS = (
  recipient: string,
  communication: string,
  sentence: string,
) => {
  return `You are an expert in social communication. Rewrite the given sentence based on the recipient and communication style, with a focus on informal discussions (e.g., social media messages or Facebook).

Rules:

Recipient:
"friend" → A close friend or someone with a personal connection.
"acquaintance" → A person you know but with less familiarity, like a casual connection.
"stranger" → Someone you do not know well (e.g., an external person or someone you have not met personally).

Communication Style:
"direct" → Brief and clear; for quick social interactions, but not too abrupt.
"indirect" → More polite and considerate, but still friendly and informal.
"polite" → Slightly formal and respectful, suitable for messages to people you don’t know well.

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
recipient: ${recipient}
communication style: ${communication}
sentence: ${sentence}`
}

export { promptForSlack, promptForGithub, promptForSNS }
