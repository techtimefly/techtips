export type CategoryId = 'phone' | 'security' | 'wifi' | 'shortcuts';

export interface CategoryMeta {
  id: CategoryId;
  /** Full display name */
  label: string;
  /** Short label for compact pills */
  short: string;
  /** Accent color (also a Tailwind theme color of the same name) */
  color: string;
  /** One-line description for the category card */
  blurb: string;
  /** Path to the Higgsfield-generated category illustration */
  art: string;
}

export interface Tip {
  id: string;
  category: CategoryId;
  /** Short headline shown on the card */
  title: string;
  /** One-line hook shown on the card */
  summary: string;
  /** Roughly how long the tip takes to apply */
  effort: string;
  /** Full step-by-step detail shown in the modal */
  steps: string[];
}

export const categories: CategoryMeta[] = [
  {
    id: 'phone',
    label: 'Phone & Storage',
    short: 'Phone',
    color: '#34d399',
    blurb: 'Free up space, save battery, and find things faster.',
    art: '/assets/tips/phone.webp',
  },
  {
    id: 'security',
    label: 'Security & Privacy',
    short: 'Security',
    color: '#fb7185',
    blurb: 'Simple habits that keep scammers and snoops out.',
    art: '/assets/tips/security.webp',
  },
  {
    id: 'wifi',
    label: 'Wi-Fi & Internet',
    short: 'Wi-Fi',
    color: '#38bdf8',
    blurb: 'A stronger signal and quick fixes when it drops.',
    art: '/assets/tips/wifi.webp',
  },
  {
    id: 'shortcuts',
    label: 'Shortcuts & Productivity',
    short: 'Shortcuts',
    color: '#fbbf24',
    blurb: 'Small keyboard tricks that save real time.',
    art: '/assets/tips/shortcuts.webp',
  },
];

export const categoryMap: Record<CategoryId, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryMeta>;

export const tips: Tip[] = [
  {
    id: 'free-storage',
    category: 'phone',
    title: 'Free up storage fast',
    summary: "Reclaim gigabytes without deleting a single photo.",
    effort: '5 min',
    steps: [
      "Open Settings → Storage to see what is actually taking up space.",
      "Clear app caches — browsers, social and map apps quietly hoard hundreds of MB.",
      "Offload (don't delete) apps you rarely use: the icon stays and data returns on reinstall.",
      "Empty the Recently Deleted album — photos sit there for 30 days still using space.",
    ],
  },
  {
    id: 'battery-drain',
    category: 'phone',
    title: 'Stop background battery drain',
    summary: 'Find the apps quietly eating your battery.',
    effort: '3 min',
    steps: [
      'Open Settings → Battery to see usage ranked by app.',
      "Look for apps with high “background” activity that you don't actively use.",
      'Turn off Background App Refresh for those specific apps.',
      'Lower screen brightness and shorten auto-lock — the display is the biggest drain.',
    ],
  },
  {
    id: 'global-search',
    category: 'phone',
    title: 'Find anything with global search',
    summary: 'Stop hunting through home screens and folders.',
    effort: '1 min',
    steps: [
      'Swipe down on the home screen (iPhone) or open the app-drawer search (Android).',
      'Type the first few letters of any app, contact, setting or file.',
      'Search also handles quick math, unit conversions and word definitions.',
      'Use it to jump straight to a buried setting instead of digging through menus.',
    ],
  },
  {
    id: 'phishing',
    category: 'security',
    title: 'Spot a phishing email',
    summary: 'Three quick checks that catch most scam messages.',
    effort: '1 min',
    steps: [
      'Check the real sender address, not just the display name — tap it to expand.',
      'Hover over links before clicking to preview the true destination URL.',
      "Be suspicious of urgency: “act now”, “account suspended”, “verify immediately”.",
      'When in doubt, open the site by typing its address yourself — never via the email link.',
    ],
  },
  {
    id: 'two-factor',
    category: 'security',
    title: 'Turn on two-factor authentication',
    summary: "A stolen password alone won't get anyone in.",
    effort: '5 min',
    steps: [
      "In each account's security settings, enable two-factor (2FA) authentication.",
      'Prefer an authenticator app or hardware key over SMS codes where offered.',
      'Save the backup recovery codes somewhere safe and offline.',
      'Start with what matters most: email, bank and your password manager.',
    ],
  },
  {
    id: 'password-manager',
    category: 'security',
    title: 'Use a password manager',
    summary: 'One strong password instead of one weak one reused everywhere.',
    effort: '15 min',
    steps: [
      'Install a reputable password manager on your phone and computer.',
      'Create one long, memorable master password — the only one you need to know.',
      'Let it generate a unique random password for every account.',
      'Update your most-used logins first, then replace reused passwords over time.',
    ],
  },
  {
    id: 'faster-wifi',
    category: 'wifi',
    title: 'Make your Wi-Fi faster',
    summary: 'Better speed without paying for a new plan.',
    effort: '10 min',
    steps: [
      'Place the router central, elevated and in the open — not in a cabinet or on the floor.',
      'Keep it away from metal, microwaves and thick walls that block the signal.',
      'Connect nearby devices to the 5GHz band for speed; use 2.4GHz for range.',
      'Reboot the router occasionally and keep its firmware up to date.',
    ],
  },
  {
    id: 'slow-connection',
    category: 'wifi',
    title: 'Fix a slow connection',
    summary: 'The restart sequence that solves most outages.',
    effort: '3 min',
    steps: [
      'Unplug the router and modem, wait a full 30 seconds, then plug them back in.',
      'Wait for every light to return to normal before testing.',
      "Restart the device you're using too — it may be holding onto a bad connection.",
      'Still slow? Run a speed test and compare it to your plan before calling support.',
    ],
  },
  {
    id: 'copy-paste',
    category: 'shortcuts',
    title: 'Master copy & paste shortcuts',
    summary: 'The keyboard moves that save hours every week.',
    effort: '2 min',
    steps: [
      'Ctrl+C / Cmd+C copies, Ctrl+V / Cmd+V pastes, Ctrl+X / Cmd+X cuts.',
      'Ctrl+Z / Cmd+Z undoes a mistake; add Shift to redo it.',
      'Ctrl+Shift+V / Cmd+Shift+V pastes as plain text — no messy formatting.',
      'These work in almost every app, browser and text field.',
    ],
  },
  {
    id: 'reopen-tab',
    category: 'shortcuts',
    title: 'Reopen a closed browser tab',
    summary: 'Bring back the tab you closed by accident.',
    effort: '1 min',
    steps: [
      'Press Ctrl+Shift+T on Windows or Linux, or Cmd+Shift+T on a Mac.',
      'Keep pressing it to reopen tabs in the order you closed them.',
      'It can even restore entire windows you closed.',
      'For anything older, check your browser history for the full list.',
    ],
  },
];
