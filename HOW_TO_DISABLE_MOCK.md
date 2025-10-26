# How to Disable Mock Classification

## Problem
The extension was falling back to mock/static classification instead of using the real Fetch.AI agent.

## Solution ✅

I've updated the code so it will:

1. **Try to connect to Fetch.AI agent first** (when enabled)
2. **Use static mapping if agent fails** (2 second timeout)
3. **No more automatic mock fallback** - it tries real first

## What Changed

### File: `src/lib/merchant/agenticDetect.ts`

The `detectMerchantWithAgent` function now:
- Makes an actual HTTP call to `http://localhost:8080/classify`
- Uses the real Fetch.AI agent response
- Falls back to static mapping ONLY if agent is unavailable

### File: `agent_smart.py`

The agent now:
- Runs an HTTP server (FastAPI)
- Listens on port 8080
- Uses OpenAI GPT-4o-mini for classification
- Returns JSON response to the extension

## How to Use

### Option 1: Use Real Agent (Recommended)

1. **Start the agent:**
   ```bash
   python agent_smart.py
   ```

2. **Set your OpenAI API key:**
   ```powershell
   $env:OPENAI_API_KEY = "sk-..."
   ```

3. **Visit any website**
   - Extension calls agent
   - Gets real LLM classification
   - No mock fallback!

### Option 2: Keep Static Mapping

If you don't run the agent:
- Extension tries to connect (2 second timeout)
- Falls back to static mapping automatically
- Still works, just not "smart"

## Testing

Open browser console and look for:
- ✅ `Fetch.AI agent classification: TRAVEL` - Real agent working
- ⚠️ `Fetch.AI agent not available, using static mapping` - Fallback mode

## Summary

**Before:** Always used static mapping  
**After:** Tries real agent first, then falls back if needed

The mock classification is now just a fallback, not the primary method!

