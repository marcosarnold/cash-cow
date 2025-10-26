# ⚡ Quick Start - Get Everything Running

## ✅ What You Need:

1. **Agent server running** (for AI recommendations)
2. **Extension loaded in Chrome**

---

## 🚀 Step 1: Start the AI Agent

Open PowerShell and run:
```powershell
cd C:\Users\User\Desktop\template\Cash Cow-main
python simple_agent.py
```

**Look for this:**
```
🚀 Starting Fetch.AI agent server...
📡 Listening on http://localhost:8080
```

**Keep this running!** Don't close the window.

---

## 🚀 Step 2: Load Extension in Chrome

1. Go to `chrome://extensions/`
2. Remove old Cash Cow extension
3. Click "Load unpacked"
4. Select: `C:\Users\User\Desktop\template\Cash Cow-main\dist`
5. ✅ Extension loaded!

---

## 🧪 Step 3: Test It!

### Test on Amazon:

1. Go to **amazon.com**
2. Add items to cart
3. **Click Cash Cow extension icon**
4. **Popup opens** showing:
   - Current merchant: Amazon
   - Amount: Your cart total
   - Best card: **Chase Sapphire Preferred** (3x points!)
   - Why: "Earns 3× rewards on online"

### Test on Uber Eats:

1. Go to **ubereats.com**
2. Add food to cart
3. **Click Cash Cow extension icon**
4. **Popup opens** showing:
   - Best card: **Amex Gold** (4x points!)
   - Why: "Earns 4× rewards on dining"
   - Comparison: Shows you'd lose 1x using Chase

---

## 🎯 How Recommendations Work:

### Logic Flow:

```
Amazon → AI classifies as "E-COMMERCE"
  → Calculates: Amex (1x) vs Chase (3x) vs Discover (1x)
  → Picks Chase (3x wins!)
  
Uber Eats → AI classifies as "ENTERTAINMENT"
  → Calculates: Amex (4x) vs Chase (3x) vs Discover (1x)
  → Picks Amex (4x wins!)
```

---

## 📊 What Gets Displayed:

### Your 3 Cards & Best Match:

- **Amex Gold** - Best for dining/groceries (4x)
- **Chase Sapphire** - Best for online/travel (3x)
- **Discover It** - Best for rotating categories (5%)

### Smart Comparisons:

Shows you:
- ✅ Which card is best
- ✅ Why it's best
- ✅ What you'd lose using others
- ✅ Exact reward amounts

---

## ✅ Status Check:

**Everything working if you see:**

1. Agent server running on port 8080
2. Extension loaded in Chrome
3. Console shows: "🤖 Fetch.AI agent classified as: X"
4. Popup shows different cards for different sites

---

**Start agent → Load extension → Test on multiple sites!** 🚀
