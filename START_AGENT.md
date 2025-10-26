# 🚀 Start Agent Server - REQUIRED!

## The agent server must be running for AI recommendations!

### Step 1: Start the Agent

**Option A - PowerShell (Easiest):**
```powershell
cd C:\Users\User\Desktop\template\Cash Cow-main
python simple_agent.py
```

**You should see:**
```
🚀 Starting Fetch.AI agent server...
📡 Listening on http://localhost:8080
🔗 Extension can now connect to this agent!
```

**Keep this window open!** ✅

---

## Step 2: Load Extension

1. Go to `chrome://extensions/`
2. **Remove** old Cash Cow
3. **Load unpacked** → Select `dist` folder
4. ✅ **DONE!**

---

## Step 3: Test with AI

1. Visit **amazon.com**
2. Add items to cart
3. Click the extension icon
4. **Check console** - you'll see:

```
🤖 Fetch.AI agent classified as: e-commerce
🏪 Merchant: Amazon → Category: e-commerce
🎯 Best card: Chase Sapphire Preferred earns 3× rewards
📊 All rates: [{index: 0, rate: 1...}, {index: 1, rate: 3...}]
```

---

## Without Agent (Fallback):

If agent not running:
```
⚠️ Agent not available, using fallback
```

Uses static category mapping instead.

---

## 🎯 What You Need:

✅ Python running  
✅ Agent server on port 8080  
✅ Extension loaded  
✅ ANTHROPIC_API_KEY in .env  

**See `QUICK_START.md` for complete setup!**




