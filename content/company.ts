// Company pages copy (spec B9.1 About, B9.2 Design Partners).
// CHANGED (3 Oct 2026, Rajesh): the About page is a founders' letter signed by
// both co-founders, with a card each and three beliefs. This reverses the
// 29 Sep "no team section" decision. No Careers page.
import { launch } from './waitlist';

export const about = {
  eyebrow: 'About MindX AI',
  // The page H1 is "Why we built MindX", with "MindX" in brand blue.
  titleLead: 'Why we built',
  titleBrand: 'MindX',
  dateLabel: 'October 2026',
  greeting: 'Hello,',
  intro:
    'If you run a Shopify store, you\'ve probably wondered what an "Ecommerce Brain" is. Here are three answers, in the order merchants ask.',
  letter: [
    {
      q: 'What is MindX?',
      a: "One brain for your whole store. It reads Shopify, your helpdesk and the other tools you already use, and tells you in plain English what's going on: which product is slipping, which orders are running late, which good customer has gone quiet. Then it suggests what to do. Nothing happens until you approve it.",
    },
    {
      q: 'Why does it exist?',
      a: 'Your store runs on a dozen tools, and none of them talk to each other. Each has its own dashboard, and none of them tell you that falling sales, a spike in returns and a pile of upset tickets are the same problem. Big brands pay analysts to connect those dots. Most merchants find out weeks later, in a spreadsheet, late at night. We think AI can connect them for you every morning.',
    },
    {
      q: 'Who is it for?',
      a: "Shopify merchants with a real business and a small team: founders who are also the support desk, the buyer and the marketer. If you've ever heard about a problem from a customer before your own reports showed it, MindX is for you.",
    },
  ],
  closing:
    "We're building MindX with a small group of merchants right now. If that sounds like you, start with a free Brain Scan. We read every signup.",
  signOff: 'Onward,',
  contactEmail: 'founders@themindx.com',
  foundersTitle: 'The founders',
  founders: [
    {
      name: 'Rajesh Dayalan',
      role: 'Co-founder & CEO',
      bio: 'Engineer and product builder focused on using AI to transform how e-commerce businesses serve their customers.',
      photo: '/team/rajesh-dayalan.webp',
      linkedin: 'https://www.linkedin.com/in/rajesh-dayalan-82849073',
    },
    {
      name: 'Sharmila Kabilar',
      role: 'Co-founder & Product',
      bio: 'Product leader focused on turning customer problems into simple, AI-first experiences for e-commerce businesses.',
      photo: '/team/sharmila-kabilar.webp',
      linkedin: 'https://www.linkedin.com/in/sharmila-kabilar-747739153/',
    },
  ],
  beliefsTitle: 'What we believe',
  // Rajesh's wording, 3 Oct 2026.
  beliefs: [
    'AI becomes powerful when it understands the full context of the customer, order, product and business.',
    'Agents should resolve, not just respond.',
    'The best AI disappears into the workflow.',
  ],
  ctaHeading: 'See what MindX finds in your store.',
  ctaBody: 'Start with a free Brain Scan. Read-only, and no credit card.',
} as const;

export const designPartners = {
  eyebrow: 'Design Partner Program',
  title: 'Build MindX with us',
  subtitle: "We're partnering with [25] US Shopify brands to prove one measurable outcome together in 30 days.",
  whoTitle: "Who it's for",
  who: 'US Shopify brands with [300+] orders a month, a real support queue, and an owner who wants their numbers to move.',
  getTitle: 'What you get',
  get: [
    'Growth plan at [$199/month], locked for 12 months (outcome fees apply)',
    'A weekly call with our founders',
    'Workflows built around your store',
    // CHANGED: the spec says "First access to MindX Convert"; Convert is live.
    'First access to MindX Grow',
  ],
  askTitle: 'What we ask',
  ask: [
    'One named owner on your side',
    'Access to Shopify and your helpdesk',
    'An honest baseline and a monthly review',
    "Permission to share results anonymously, and a case study if you're happy",
  ],
  planTitle: 'The 30-day plan',
  plan: [
    { title: 'Week 1', body: 'Pick one outcome (for example, cut where-is-my-order tickets 20%) and record the baseline' },
    { title: 'Week 2', body: 'Resolve runs in draft mode; you approve replies' },
    { title: 'Week 3', body: 'Safe requests switch to automatic' },
    { title: 'Week 4', body: 'Review the result together and choose the next outcome' },
  ],
  formTitle: 'Apply now',
  // ADDED: ties the program to the confirmed launch date.
  formNote: `Founding partners start before MindX opens to everyone on ${launch.dateLabel}.`,
} as const;
