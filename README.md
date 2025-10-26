# Cash Cow — Card Optimizer

A Chrome extension that helps you optimize credit card rewards by finding the best card for each purchase.

## Features

- **Smart Detection**: Automatically detects checkout pages on supported merchants
- **Card Recommendations**: Shows the best credit card with effective reward rate
- **Real-time Overlay**: Floating overlay appears on checkout pages with recommendations
- **Popup Interface**: View last recommendation and trigger evaluations
- **Options Page**: Configure feature flags and domain allowlist
- **Mock Data**: Uses fictionalized card data for testing (no real integrations)

## Supported Merchants

- Amazon.com
- Uber Eats
- DoorDash
- Grubhub
- Costco
- Walmart
- Shell
- Chevron
- Exxon

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Build**
   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build:chrome
   ```

4. **Load Extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Architecture

### Core Components

- **Reward Engine** (`src/lib/rewards/`): Pure calculation logic for card recommendations
- **Merchant Detection** (`src/pages/content/merchant/`): Detects merchants and extracts transaction data
- **Content Script** (`src/pages/content/`): React overlay that appears on checkout pages
- **Background Script** (`src/pages/background/`): Service worker for message handling
- **Popup** (`src/pages/popup/`): Extension popup interface
- **Options** (`src/pages/options/`): Settings and configuration page

### Mock Data

The extension uses fictionalized credit cards and promotional rules:

- **Amex Gold Card**: 4x dining/groceries, 3x travel
- **Chase Freedom Flex**: 3x online/groceries/gas (rotating)
- **Citi Custom Cash**: 5x top spending category
- **Discover it**: 5x rotating quarterly categories
- **Capital One Venture**: 2x flat rate

### Permissions

Minimal permissions used:
- `activeTab`: Access current tab for evaluation
- `scripting`: Inject content scripts
- `storage`: Store settings and recommendations

## Testing

Visit checkout pages on supported merchants to see the overlay in action:

1. Go to Amazon.com and add items to cart
2. Go to Uber Eats and add items to cart
3. The overlay should appear with card recommendations

## File Structure

```
src/
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   ├── rewards/
│   │   ├── engine.ts         # Pure reward calculation logic
│   │   ├── rules.ts          # Mock cards and promotional rules
│   │   └── test.ts           # Test harness for engine
│   ├── storage.ts            # Chrome storage utilities
│   ├── bus.ts               # Message passing utilities
│   └── config.ts            # Configuration constants
├── pages/
│   ├── background/
│   │   └── index.ts          # Service worker
│   ├── content/
│   │   ├── index.tsx         # React content script
│   │   ├── style.css         # Scoped overlay styles
│   │   └── merchant/
│   │       └── detect.ts     # Merchant detection logic
│   ├── popup/
│   │   ├── index.html        # Popup HTML
│   │   ├── index.tsx         # Popup React component
│   │   └── index.css         # Popup styles
│   └── options/
│       ├── index.html        # Options HTML
│       ├── index.tsx         # Options React component
│       └── index.css         # Options styles
└── manifest.json             # Chrome extension manifest
```

## Acceptance Criteria ✅

- [x] Overlay appears within 2s on demo sites after checkout page loads
- [x] Merchant + amount correct without manual input
- [x] Best card shows name, effective rate, and 1–3 rationales
- [x] Popup "Run on this tab" triggers fresh evaluation
- [x] Options toggles persist and affect behavior after reload
- [x] No console errors; service worker responds; manifest validates
- [x] TypeScript strict mode; ESLint/Prettier clean
- [x] Works on Amazon and Uber Eats demo domains
- [x] Scoped CSS with Cash Cow- prefix prevents conflicts
- [x] Pure reward engine with no external dependencies