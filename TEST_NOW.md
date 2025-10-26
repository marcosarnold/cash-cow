# 🚀 Test Your Extension Now!

## ✅ Agent Server Running
I've started the AI agent server on `http://localhost:8080` with your Anthropic API key!

---

## Step 1: Load Extension in Chrome

1. **Open Chrome** → `chrome://extensions/`
2. **Enable "Developer mode"** (toggle top right)
3. **Click "Load unpacked"**
4. **Navigate to:** `C:\Users\User\Desktop\template\harmony-main\dist`
5. **Select the `dist` folder**

✅ Extension loaded!

---

## Step 2: Test Real Features

### 🛍️ Test on Amazon

1. Go to `amazon.com`
2. Add an item to cart
3. Go to checkout/cart page
4. **Look for the Harmony overlay** (bottom right)

**What you should see:**
- ✅ Real merchant name: "Amazon"
- ✅ Real transaction amount (from page)
- ✅ Best card recommendation
- ✅ Real reward calculation

---

### 🍔 Test on Uber Eats

1. Go to `ubereats.com`
2. Add food to cart
3. **Look for overlay**

**Expected:**
- Merchant: "Uber Eats"
- Category: Dining (classified by AI!)
- Best card: Should recommend dining cards

---

### 🛒 Test on Costco

1. Go to `costco.com`
2. Shop for groceries
3. **Look for overlay**

**Expected:**
- Merchant: "Costco"
- Category: Groceries
- Best card: Should recommend grocery cards

---

## 🎯 What's New (No More Mocks!)

### Before (Mock):
- ❌ Always showed $100
- ❌ Hardcoded "Chipotle"
- ❌ Only 2 fake cards
- ❌ Simple if/else logic

### Now (Real):
- ✅ Extracts real amount from page
- ✅ Shows actual merchant name
- ✅ Uses all 40+ cards from JSON
- ✅ Real reward calculation engine
- ✅ AI classification (if agent running)

---

## 🐛 Troubleshooting

### Overlay not showing?

**Check:**
1. ✅ Agent server running? (I started it for you)
2. ✅ On a supported merchant? (Amazon, Uber Eats, etc.)
3. ✅ On checkout/cart page?
4. ✅ Browser console for errors?

### Wrong amount detected?

The extension tries to extract the total from the page. If it can't find it:
- **Old behavior:** Showed $100 ❌
- **New behavior:** Doesn't show overlay ✅

This is more honest!

---

## 🔍 What to Check in Console

Open DevTools (F12) → Console tab

**Look for:**
```
✓ Harmony: Transaction detected
✓ Harmony: Recommendation generated
✓ Fetch.AI agent classification: E-COMMERCE
```

**If errors:**
- Check that agent server is running
- Check that extension is loaded
- Try refreshing the page

---

## 📊 Test All Features

Try these sites:
- ✅ `amazon.com` - E-commerce
- ✅ `ubereats.com` - Dining
- ✅ `doordash.com` - Dining  
- ✅ `costco.com` - Groceries
- ✅ `walmart.com` - Groceries
- ✅ `shell.com` - Gas

Each should:
1. Detect merchant correctly
2. Extract real amount
3. Show appropriate card recommendation
4. Calculate real rewards

---

## 🎉 You're Ready!

Your extension now uses:
- ✅ Real card data (40+ cards from JSON)
- ✅ Real reward calculations
- ✅ Real merchant detection
- ✅ Real transaction amounts
- ✅ AI classification (via agent server)

**No more mocks!** Everything is real! 🚀

