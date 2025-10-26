# 🤖 How the AI Agent Works

## The Flow:

### Step 1: Popup Opens
When you click the Cash Cow icon, the extension calls:
```
POST http://localhost:8080/classify
Body: { "url": "https://amazon.com" }
```

### Step 2: Agent Classifies
The agent (Claude AI) looks at the URL and decides:
- `amazon.com` → **E-COMMERCE**
- `ubereats.com` → **ENTERTAINMENT**
- `shell.com` → **UTILITIES**

### Step 3: Extension Maps Categories
```
E-COMMERCE → online (Chase Sapphire 3x!)
ENTERTAINMENT → dining (Amex Gold 4x!)
UTILITIES → groceries or gas (Discover 5%!)
```

### Step 4: Best Card Chosen
Extension calculates which of your 3 cards earns most:
- **Amazon**: Chase (3x) vs Amex (1x) vs Discover (1x) → **Chase wins!**
- **Uber Eats**: Amex (4x) vs Chase (3x) vs Discover (1x) → **Amex wins!**
- **Shell**: Discover (5%) vs Amex (1x) vs Chase (1x) → **Discover wins!**

## 🧪 Test It:

**In Console, you'll see:**
```
🤖 Agent classified as: E-COMMERCE → Extension category: online
🏪 Merchant: Amazon → Category: online
🎯 Best card: Chase Sapphire Preferred earns 3× rewards on online
```

## ✅ That's It!

The agent tells you the category → Extension picks the best card for that category → You see the recommendation!




