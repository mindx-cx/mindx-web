// Trust & security page copy (spec B7). Changes are marked CHANGED / ADDED.

export const trustHero = {
  eyebrow: 'Trust & security',
  title: 'Autonomy you control',
  subtitle:
    'MindX acts only inside the rules you set. Every action is checked before it happens, verified after, and logged so you can see exactly what was done and why.',
} as const;

export const trustLevels = {
  title: 'How MindX decides what it can do',
  columns: ['Level', 'What MindX does', 'Example'],
  levels: [
    { name: 'Observe', cells: ['Spots something', 'Where-is-my-order tickets jumped 30%'] },
    { name: 'Recommend', cells: ['Suggests an action', '"Send delay notices to affected customers"'] },
    { name: 'Draft', cells: ['Writes the reply or action for you', 'A reply waiting for your click'] },
    { name: 'Act on safe requests', cells: ['Handles low-risk requests on its own', 'Sends tracking updates'] },
    { name: 'Act within your limits', cells: ['Handles money or order changes under your rules', 'Refunds under $50 on unopened items'] },
    { name: 'Run full workflows', cells: ['Resolves a problem across steps', 'Late order → notify → reship → follow up'] },
  ],
  note: 'You choose the level for each request type, and can change it anytime.',
} as const;

export const safeguards = {
  title: 'Six safeguards',
  items: [
    { title: 'Rules in code, not prompts', body: 'Your limits are enforced by software, not by asking the AI nicely.' },
    { title: 'Check before acting', body: 'Every money or order change is checked against your policy and fresh data first.' },
    { title: 'Verify after acting', body: 'MindX confirms the change actually happened in Shopify.' },
    { title: 'Human approval for risk', body: 'Anything outside your rules, or uncertain, goes to a person with full context.' },
    { title: 'Complete audit log', body: 'Every action records the reason, the evidence, the rule that allowed it and the result.' },
    { title: 'Kill switch', body: 'Pause any worker instantly from one button.' },
  ],
} as const;

export const whenUnsure = {
  title: "When MindX isn't sure, it stops",
  items: [
    { when: "It can't identify the customer", then: 'it asks, never guesses' },
    { when: 'A system is down', then: "it doesn't invent the answer" },
    { when: 'Two systems disagree', then: 'it flags the conflict' },
    { when: 'Your policy is unclear', then: 'it asks for approval' },
    { when: 'An action only half-completes', then: 'it records it and fixes it, or escalates' },
  ],
} as const;

export const yourData = {
  title: 'Your data',
  items: [
    { title: 'You own your data.', body: 'We use it to run MindX for you.' },
    { title: 'Least access.', body: 'We request only the Shopify and helpdesk permissions each feature needs. The Brain Scan is read-only.' },
    { title: 'Isolation.', body: "Each merchant's data is kept separate from every other merchant's." },
    { title: 'Encryption.', body: 'Data is encrypted in transit and at rest. [Confirm with engineering.]' },
    {
      title: 'Learning across stores.',
      body: "MindX improves from anonymized patterns across merchants, never by sharing your customers' personal data with anyone. You can opt out. [Legal to confirm wording.]",
    },
    {
      title: 'AI providers.',
      body: "We use leading model providers under agreements that don't allow them to train on your data. [List providers on /subprocessors.]",
    },
    { title: 'Deletion.', body: 'Disconnect anytime; we delete your data within [30] days on request.' },
  ],
} as const;

export const compliance = {
  title: 'Compliance status',
  body: 'SOC 2 Type I: [in progress, expected date]. GDPR and CCPA: data processing agreement available. [Show only what is true at launch; no badge until earned.]',
} as const;

export const trustCta = {
  heading: 'Have a security questionnaire?',
  body: "Send it to security@themindx.ai and we'll reply within 2 business days.",
  // CHANGED: the spec's "Download security overview (PDF)" needs a PDF that
  // doesn't exist yet, so the button emails the security inbox instead.
  button: { label: 'Request the security overview', href: 'mailto:security@themindx.ai?subject=Security%20overview%20request' },
  placeholders: '[Confirm the security@ inbox and the 2-day reply time before launch.]',
} as const;
