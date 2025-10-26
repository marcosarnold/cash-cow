# Cash Cow — AI-Powered Credit Card Rewards Optimizer

A Chrome extension that maximizes your credit card rewards by automatically detecting checkout pages and recommending the optimal card based on real-time AI merchant classification and transaction amount analysis.

## 🎯 Overview

Cash Cow integrates **Fetch.AI** with **Anthropic Claude** to intelligently classify merchants and recommend the best card using real reward data scraped from **BrightData**. The extension works like Honey or Rakuten — appearing when you're at checkout to guide your payment decision with data-driven insights.

## ✨ Features

- **AI-Powered Classification**: Uses Claude AI via Fetch.AI agent to intelligently categorize merchants
- **Real Credit Card Data**: Loads 13+ cards with actual reward structures from BrightData
- **Dynamic Calculations**: Calculates best card by expected value (transaction amount × reward rate)
- **Smart Detection**: Automatically detects checkout pages and transaction amounts
- **Badge Notifications**: Shows exclamation mark when checkout is detected
- **Popup Recommendations**: View optimal card with detailed rationale and card carousel
- **Real Reward Data**: Uses scraped data including annual fees, APR, cashback rates

## 🏪 Supported Merchants

The extension works on major e-commerce and service platforms:

- **Amazon.com** - E-commerce/Online shopping
- **Uber Eats** - Food delivery/Dining
- **DoorDash** - Food delivery/Dining
- **Grubhub** - Food delivery/Dining
- **Costco** - Groceries/Bulk shopping
- **Walmart** - Groceries/Retail
- **Shell, Chevron, Exxon** - Gas stations
- Additional merchants supported via AI classification

## 🔧 How It Works

### Architecture Overview

```
┌─────────────────┐
│ Checkout Page   │
│ (Amazon, etc.)  │
└────────┬────────┘
         │ 1. Page Load
         ▼
┌─────────────────────────┐
│ Content Script          │
│ Detects: Merchant, $    │
└────────┬────────────────┘
         │ 2. Checkout Detected
         ▼
┌─────────────────────────┐
│ Background Worker       │
│ Updates Badge: "!"      │
└────────┬────────────────┘
         │ 3. User Clicks Icon
         ▼
┌─────────────────────────┐
│ Extension Popup         │
│ Calls Agent API         │
└────────┬────────────────┘
         │ 4. POST /classify
         ▼
┌─────────────────────────┐
│ Fetch.AI Agent          │
│ Calls Claude AI         │
└────────┬────────────────┘
         │ 5. Category Response
         ▼
┌─────────────────────────┐
│ Cash Cow Extension      │
│ Calculates Best Card    │
└────────┬────────────────┘
         │ 6. Display Recommendation
         ▼
┌─────────────────────────┐
│ User Sees:              │
│ • Best Card             │
│ • Expected Points        │
│ • Rationale             │
└─────────────────────────┘
```

### Component Breakdown

1. **Content Script** (`src/pages/content/amazon-amount.js`)
   - Runs on all pages, detects checkout state
   - Extracts merchant name and transaction amount
   - Only activates on known merchant sites
   - Sends `CHECKOUT_DETECTED` message

2. **Background Service Worker** (`src/pages/background/index.ts`)
   - Receives checkout detection events
   - Updates extension badge with "!" notification
   - Handles keyboard shortcuts (Ctrl+Shift+H)
   - Manages Chrome runtime messaging

3. **Fetch.AI Agent** (`fetchai_agent.py`)
   - FastAPI server on localhost:8080
   - Integrates with Anthropic Claude API
   - Classifies merchant domains into categories:
     - **DINING**: Restaurants, food delivery
     - **E-COMMERCE**: Online shopping
     - **GROCERIES**: Grocery stores
     - **GAS**: Gas stations
     - **TRAVEL**: Airlines, hotels, booking
     - **ENTERTAINMENT**: Streaming, music, events
     - **FINANCE**: Banks, payment processors
     - **ONLINE**: Digital services, purchases
     - **OTHER**: Everything else

4. **Recommendation Engine** (`src/lib/rewards/`)
   - **Loads 13+ real credit cards** from BrightData JSON
   - Extracts reward rates by category (dining, groceries, gas, etc.)
   - Calculates expected value: `amount × rewardRate`
   - Sorts cards by expected reward value (best first)
   - Provides detailed rationale for recommendations

### BrightData Integration

The extension uses **scraped credit card data** from BrightData (`credit_card_rewards.json`):

- **13+ Real Credit Cards** including:
  - Capital One Savor Student
  - U.S. Bank Shield Visa
  - Capital One Venture Rewards
  - And 10+ more cards

- **Real Reward Structures**:
  - Cashback percentages by category
  - Annual fees
  - APR rates
  - Sign-up bonuses
  - Key benefits

- **Data Processing** (`src/lib/rewards/cardDataService.ts`):
  - Converts JSON to internal Card format
  - Extracts category multipliers (dining: 3%, groceries: 3%, etc.)
  - Parses base rates and rewards programs
  - Maps cards to networks (Visa, Amex, etc.)

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- Python 3.10+ with pydantic v1
- Chrome browser
- Anthropic Claude API key
- BrightData API key (for data scraping)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cash-cow-extension.git
   cd cash-cow-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install fastapi anthropic python-dotenv uvicorn "pydantic<2.0" "anthropic<0.30"
   ```

3. **Configure API keys**
   Create a `.env` file in the root directory:
   ```
   ANTHROPIC_API_KEY=your-anthropic-api-key-here
   BRIGHTDATA_API_KEY=your-brightdata-api-key-here
   ```

4. **Start the Fetch.AI agent**
   ```bash
   python fetchai_agent.py
   ```
   Server runs on `http://localhost:8080`

5. **Build the extension**
   ```bash
   npm run build:all
   ```

6. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## 💳 Example Workflow

1. **User visits Amazon checkout** for $100 purchase
2. Extension detects checkout and extracts merchant + amount
3. Popup calls Fetch.AI agent with URL
4. Agent calls Claude API and classifies as **"E-COMMERCE"**
5. Extension calculates:
   - Chase Sapphire Preferred: $100 × 3% = **300 points** ✅ BEST
   - Amex Gold: $100 × 1% = **100 points**
   - Discover It: $100 × 1% = **100 points**
6. Extension displays: "Chase Sapphire Preferred - 3× points on E-COMMERCE"

## 📊 Data Sources

- **BrightData**: Scraped credit card reward data (13+ cards with real rates)
- **Anthropic Claude**: AI-powered merchant classification
- **Fetch.AI**: Agent framework for intelligent routing

## 📦 Project Structure

```
cash-cow-extension/
├── src/
│   ├── components/
│   │   ├── CardCarousel.tsx           # Card carousel display
│   │   ├── CreditCardDisplay.tsx     # Individual card UI
│   │   ├── HarmonyLogo.tsx           # Cash Cow branding
│   │   └── MainPopup.tsx             # Recommendation interface
│   ├── lib/
│   │   ├── credit_card_rewards.json  # BrightData scraped data
│   │   ├── rewards/
│   │   │   ├── cardDataService.ts    # BrightData data loader
│   │   │   ├── engine.ts             # Reward calculation logic
│   │   │   └── rules.ts              # Card definitions
│   │   └── types.ts                  # TypeScript definitions
│   ├── pages/
│   │   ├── background/
│   │   │   └── index.ts              # Service worker
│   │   ├── content/
│   │   │   ├── amazon-amount.js     # Checkout detection
│   │   │   ├── index.tsx            # Content overlay
│   │   │   └── merchant/detect.ts   # Merchant logic
│   │   └── popup/
│   │       └── index.html           # Popup UI
│   └── assets/
│       └── logos/
│           └── cash-cow-logo.png    # Branding
├── fetchai_agent.py                  # Fetch.AI + Claude server
├── start_agent.ps1                   # Agent startup script
├── manifest.json                     # Chrome manifest
└── package.json                      # Dependencies
```

## 🔑 Key Technologies

- **Frontend**: React + TypeScript + Tailwind CSS
- **Build**: Vite
- **AI Agent**: Fetch.AI framework
- **AI Model**: Anthropic Claude (via agent)
- **Data Source**: BrightData (credit card rewards)
- **Backend**: FastAPI (Python)
- **Storage**: Chrome Storage API

## 🧪 Testing

1. Start the agent:
   ```bash
   python fetchai_agent.py
   ```

2. Load extension in Chrome

3. Visit a merchant (e.g., Amazon.com)

4. Add to cart and go to checkout

5. Click the Cash Cow extension icon (or press Ctrl+Shift+H)

6. Verify recommendation shows best card for that merchant category

## 💰 How Recommendations Work

The extension calculates the optimal card using this formula:

```
Expected Value = Transaction Amount × Category Reward Rate
```

**Example:**
- Purchase: $100 at Amazon (E-COMMERCE category)
- Chase Sapphire Preferred: $100 × 3% = **300 points**
- Amex Gold: $100 × 1% = **100 points**
- **Recommended: Chase Sapphire Preferred**

The card with the highest expected value is displayed first, with all cards sorted by potential rewards.

## 📝 Development

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build:all

# Content script only
npm run build:content
```

### Data Updates

Credit card data is loaded from `src/lib/credit_card_rewards.json`, which contains scraped data from BrightData including:

- Card names and issuers
- Reward rates by category
- Annual fees
- APR information
- Sign-up bonuses
- Key benefits

To update card data, re-run the BrightData scraper.

## ⚠️ Important Notes

- Requires Fetch.AI agent server running on `localhost:8080`
- Uses real scraped credit card data from BrightData
- AI classification powered by Anthropic Claude
- Only activates on known merchant sites
- No real banking integrations (mock data for demo)

## 🤝 Contributing

This is a Chrome MV3 extension built with:
- Minimal permissions
- Client-first architecture
- Real data from BrightData
- AI-powered merchant classification
- TypeScript strict mode

## 📄 License

MIT License
