# Mocks Found in the Codebase

## 🔴 High Priority - Needs Real Implementation

### 1. **Background Worker Mock Engine** 
**File:** `src/pages/background/index.ts` (lines 25-65)
- ❌ Only 2 hardcoded cards (Amex Gold, Chase Sapphire)
- ❌ Simple if/else logic
- ✅ Should use the real engine from `src/lib/rewards/engine.ts`

**Fix:** Import and use the real recommend() function

---

### 2. **Content Script Fallback Mock**
**File:** `src/pages/content/index.tsx` (lines 69-82)
- ❌ Shows fake recommendation when transaction not detected
- ❌ Shows hardcoded values

**Fix:** Don't show overlay if no real transaction

---

### 3. **Default Amount = $100**
**File:** `src/pages/content/merchant/detect.ts` (lines 184, 190, 206)
- ❌ Hardcoded to $100 when amount not detected
- ✅ Should be more intelligent

**Fix:** Extract from page or don't show amount

---

### 4. **MOCK_OFFERS Dictionary**
**File:** `src/lib/services/offerDiscovery.ts` (lines 8-36)
- ❌ Hardcoded offer data
- ⚠️ This uses JSON file which is real data, but MOCK_OFFERS is fake

**Fix:** Use BrightData scraper instead

---

### 5. **USE_MOCK_DATA Feature Flag**
**Files:** Multiple files
- ❌ Still set to `true` by default
- ✅ Should be `false` now that we have real APIs

**Fix:** Change default to false

---

## 🟡 Low Priority - Acceptable

### 6. **sampleCards in MainPopup**
**File:** `src/components/MainPopup.tsx` (lines 13-41)
- ✅ These are demo cards for the carousel
- ✅ This is okay - it's just for the UI

**Keep it** - Users will add their own cards via the UI

---

## 📋 Action Items

1. ✅ Create `agent_smart.py` with real Anthropic API
2. ✅ Create `brightdata_scraper.py` structure
3. ⚠️ Update background worker to use real engine
4. ⚠️ Remove default $100 amount
5. ⚠️ Change USE_MOCK_DATA to false
6. ⚠️ Handle "no transaction" gracefully

