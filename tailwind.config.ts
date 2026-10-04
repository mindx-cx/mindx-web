import type { Config } from 'tailwindcss';

// Design tokens from spec section A5, with the color palette swapped for the
// current themindx.ai blue brand (decision 28 Sep 2026). The color and
// font-size scales are replaced (not extended) so only approved tokens exist.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',

      // --- MindX design tokens ------------------------------------------------
      // Values live in public/brand/mindx-tokens.css (the shared master file,
      // also copied into the product); these names just point at them.
      // --- Prototype v3 tokens (2 Oct 2026) ---------------------------------
      // A three-colour system: one brand colour paired with a dark and a light
      // of the same temperature. The point is the shared surfaces -- `chrome`
      // is the website nav AND the product top bar, `cream` is the website body
      // AND the product sidebar -- so signing in feels like staying put rather
      // than arriving somewhere else. Values converted from youspot.com's
      // lab() originals, orange rotated to blue.
      chrome: 'rgb(var(--chrome-rgb) / <alpha-value>)', // nav, product top bar, CTA band, footer
      cream: 'rgb(var(--cream-rgb) / <alpha-value>)', // page background, product main area
      'cream-2': 'rgb(var(--cream-2-rgb) / <alpha-value>)', // a shade under cream: alternate bands, product sidebar
      brand: { DEFAULT: 'rgb(var(--brand-rgb) / <alpha-value>)', dark: 'rgb(var(--brand-dark-rgb) / <alpha-value>)' }, // CTAs, active states
      line: 'rgb(var(--line-rgb) / <alpha-value>)', // borders and dividers
      fg: 'rgb(var(--fg-rgb) / <alpha-value>)', // body text
      surface: 'rgb(var(--surface-rgb) / <alpha-value>)', // avatar tiles, chips, inset fills
      'muted-bg': 'rgb(var(--muted-bg-rgb) / <alpha-value>)', // muted fills on cream
      'muted-fg': 'rgb(var(--muted-fg-rgb) / <alpha-value>)', // secondary text
      'subtle-fg': 'rgb(var(--subtle-fg-rgb) / <alpha-value>)', // tertiary text, placeholder
      // Meaning, not decoration: one colour per kind of problem, so a merchant
      // learns the colour once and reads the card without reading the label.
      signal: {
        revenue: 'rgb(var(--signal-revenue-rgb) / <alpha-value>)',
        fulfilment: 'rgb(var(--signal-fulfilment-rgb) / <alpha-value>)',
        product: 'rgb(var(--signal-product-rgb) / <alpha-value>)',
        live: 'rgb(var(--signal-live-rgb) / <alpha-value>)',
      },
      // Text on light backgrounds: navy-tinted, not black (Atlassian-style).
      ink: {
        950: '#0F1A3A', // text
        700: '#44546F', // subtle text
      },
      // Dark backgrounds (spec "ink" role).
      navy: {
        950: '#071A45', // hero, dark sections, nav pill, footer
        900: '#0A2050', // cards on dark
        850: '#10286A', // floating nav pill: visibly lighter than navy-950
        800: '#12306B', // tertiary dark fill (e.g. "coming later" card)
        700: '#1C3470', // borders on dark
      },
      // Brand blue (spec "lime" + "violet" roles on light).
      blue: {
        600: '#1358D0', // primary buttons (white text 6.3:1), links and eyebrows on white
        500: '#1A6FFF', // large headings, icons, glows, focus ring. Not for small text
        200: '#C8DAFF',
        50: '#EEF4FF', // soft highlight backgrounds
      },
      // Highlights on dark: eyebrows, links, live dots (spec "lime on dark" role).
      mint: {
        400: '#6EE7B7',
      },
      gray: {
        50: '#F7F8FA', // light sections and cards
        200: '#DCDFE4', // borders on light
        300: '#AEB8D2', // secondary text on dark
        500: '#626F86', // subtlest text on light (5.0:1 on white, 4.7:1 on gray-50)
      },
      // Worker family: one color per AI Worker, used for its icon tile, page
      // accent and chips. White text/icons pass 4.5:1 on every DEFAULT.
      // Never reuse these for status meaning.
      worker: {
        brain: { DEFAULT: '#1358D0', soft: '#EEF4FF' },
        resolve: { DEFAULT: '#0E8074', soft: '#E3F6F3' },
        convert: { DEFAULT: '#C25100', soft: '#FFF0E5' },
        grow: { DEFAULT: '#6E5DC6', soft: '#F3F0FF' },
      },
      // Semantic status (DEFAULT = solid, soft = chip background, strong = text on soft).
      success: { DEFAULT: '#1F845A', soft: '#DCFFF1', strong: '#164B35' },
      warning: { DEFAULT: '#CF9F02', soft: '#FFF7D6', strong: '#533F04' },
      danger: { DEFAULT: '#C9372C', soft: '#FFECEB', strong: '#5D1F1A' },
      info: { DEFAULT: '#1358D0', soft: '#E9F2FF', strong: '#09326C' },
      discovery: { DEFAULT: '#6E5DC6', soft: '#F3F0FF', strong: '#352C63' },
      status: {
        live: '#1F845A',
        beta: '#CF9F02',
      },
    },
    fontFamily: {
      sans: ['var(--font-geist-sans)', '-apple-system', 'Segoe UI', 'system-ui', 'sans-serif'],
      // Headlines: Newsreader serif, regular weight. Shared with the product's
      // page titles so the site and the app speak in the same voice.
      display: ['var(--font-newsreader)', 'Georgia', 'Times New Roman', 'serif'],
    },
    // [size, line-height]. "-m" variants are the mobile sizes from A5.
    fontSize: {
      xs: ['12px', '16px'],
      small: ['14px', '22px'],
      btn: ['16px', '24px'],
      'body-m': ['16px', '26px'],
      body: ['17px', '28px'],
      'body-l-m': ['18px', '28px'],
      'body-l': ['20px', '32px'],
      eyebrow: ['13px', { lineHeight: '20px', letterSpacing: '0.12em' }],
      'h3-m': ['20px', '28px'],
      h3: ['22px', '30px'],
      'h2-m': ['28px', '34px'],
      h2: ['36px', '44px'],
      'h1-m': ['34px', '40px'],
      h1: ['48px', '56px'],
      'display-m': ['40px', '44px'],
      display: ['60px', '64px'],
      'stat-m': ['36px', '40px'],
      stat: ['44px', '48px'],
    },
    borderRadius: {
      none: '0',
      sm: '6px',
      ctl: '9px', // nav + CTA buttons
      row: '8px', // list rows, avatar tiles
      input: '10px',
      btn: '12px',
      card: '16px',
      pill: '999px',
    },
    extend: {
      maxWidth: {
        container: '1200px',
        text: '720px',
      },
      spacing: {
        'section-m': '72px',
        section: '112px',
      },
      backgroundImage: {
        // Signature gradients from the current site: hero fades navy to light
        // blue; the closing CTA runs the reverse into the navy footer. White
        // text must sit in the dark part: above ~85% of the hero, below ~30%
        // of the CTA (the CTA fade is shortened from the current site for this).
        hero: 'linear-gradient(180deg, #071A45 0%, #0D2B6E 35%, #1358D0 70%, #1B4FCB 80%, #C8DAFF 93%, #EEF4FF 100%)',
        cta: 'linear-gradient(180deg, #EEF4FF 0%, #C8DAFF 10%, #1B4FCB 30%, #0D2B6E 65%, #071A45 100%)',
        // Inner-page heroes are short, so their buttons would land on the
        // bright-blue band of `hero` and the blue button would vanish. This
        // stays deep navy so the primary button always stands out.
        'hero-page': 'linear-gradient(180deg, #071A45 0%, #0A2050 60%, #0D2B6E 100%)',
      },
      boxShadow: {
        // Soft shadow for floating mocks (A5) and the floating nav pill.
        mock: '0 24px 60px -20px rgba(7, 26, 69, 0.45)',
        nav: '0 4px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        card: '0 2px 8px rgba(19, 20, 25, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
