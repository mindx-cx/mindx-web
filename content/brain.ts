// MindX Brain page copy (spec B3). Changes are marked CHANGED / ADDED.

export const brainHero = {
  eyebrow: 'MindX Brain',
  title: 'The brain your business never had',
  subtitle:
    'MindX Brain connects every tool you run, from Shopify to your helpdesk, carriers and returns, into one live model of your business. It knows what happened, why, and what should happen next.',
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
} as const;

export const brainHow = {
  title: 'Every tool feeds one Brain, and every Worker acts through it',
  body: 'Your tools each hold one slice of the truth. MindX Brain joins them: every order, customer, shipment, conversation and policy becomes one connected picture. Workers read from it before they act, and write their results back, so the Brain gets sharper with every job.',
} as const;

export const brainUnderstands = {
  // ADDED: B3.3 is a table with no heading.
  title: 'What the Brain understands',
  rows: [
    { area: 'Your store', knows: 'Your goals, policies and what you allow MindX to do' },
    { area: 'Customers', knows: 'Who they are, what they bought, how valuable they are' },
    { area: 'Products', knows: 'Stock, variants, reviews and which items cause problems' },
    { area: 'Orders', knows: 'What was bought, paid, promised and delivered' },
    { area: 'Service', knows: 'Why customers contact you and how it was resolved' },
    { area: 'Operations', knows: 'Late shipments, carrier issues and exceptions' },
    { area: 'Money', knows: 'Revenue, refunds, discounts and what each action saved' },
  ],
} as const;

export const brainModes = {
  // ADDED: B3.4 section title.
  title: 'Three ways to use it',
  modes: [
    {
      name: 'Ask',
      body: 'Ask anything in plain English. You get the answer, the evidence and a suggested fix.',
      example: 'Why did refunds go up last week?',
    },
    {
      name: 'Work',
      body: 'Give MindX a goal. It plans the work and routes it to the right Worker.',
      example: 'Cut where-is-my-order tickets by 20% this month.',
    },
    {
      name: 'Configure',
      body: 'Set the rules. MindX follows them every time.',
      example: 'Refund orders under $50 automatically when the item is unopened.',
    },
  ],
} as const;

export const brainQuestions = {
  title: 'Questions the Brain answers',
  questions: [
    'What changed in my business this week, and why?',
    'Which products create the most support tickets?',
    'Which customers are at risk after a bad delivery?',
    'Which carrier or region is causing late orders?',
    'What should my team work on today?',
    'What did MindX do yesterday, and what happened afterward?',
  ],
} as const;

export const brainLedger = {
  title: 'Every action, and what it achieved',
  body: 'MindX records the goal, the evidence, the rule that allowed the action and the result it produced. You can trace any change back to why it happened.',
  example: [
    { label: 'Goal', value: 'Reduce late-delivery tickets' },
    { label: 'Baseline', value: '1,200 a week' },
    { label: 'Action', value: 'Proactive delay notices' },
    { label: 'Result', value: '940 a week' },
  ],
  placeholder: '[Replace with a real merchant result before launch.]',
} as const;

export const brainIsNot = {
  // ADDED: B3.8 heading.
  title: 'What MindX Brain is not',
  nots: [
    'Not another Shopify admin.',
    'Not a dashboard that only reports the past.',
    'Not a chatbot.',
    'Not a pile of disconnected AI agents.',
  ],
  is: 'It is the layer that understands your business and makes your AI Workers safe and useful.',
} as const;

export const brainAiTools = {
  title: 'Use MindX Brain inside Claude and ChatGPT',
  body: 'MindX Brain will be callable from the AI assistants your team already uses, with the same permissions and audit trail.',
  status: '[Launch status: coming soon.]',
} as const;

export const brainCta = {
  heading: 'See your business through its Brain',
} as const;
