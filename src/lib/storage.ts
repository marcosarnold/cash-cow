import { FeatureFlags, StoredRecommendation, DomainAllowlist } from "./types";

export async function getFeatureFlags(): Promise<FeatureFlags> {
  try {
    const result = await chrome.storage.sync.get("featureFlags");
    return result.featureFlags || {
      USE_MOCK_DATA: true,
      ENABLE_FETCH_AGENT: false,
      ENABLE_ADS: false
    };
  } catch (error) {
    console.error("Failed to get feature flags:", error);
    return {
      USE_MOCK_DATA: true,
      ENABLE_FETCH_AGENT: false,
      ENABLE_ADS: false
    };
  }
}

export async function setFeatureFlags(flags: FeatureFlags): Promise<void> {
  try {
    await chrome.storage.sync.set({ featureFlags: flags });
  } catch (error: any) {
    console.error("Failed to set feature flags:", error);
    // Don't throw error for extension context invalidation - just log it
    if (error && (error.message?.includes("Extension context invalidated") || 
                  error.toString?.()?.includes("Extension context invalidated"))) {
      console.log("Extension context invalidated - this is normal when reloading extension");
      return;
    }
    throw error;
  }
}

export async function getLastRecommendation(): Promise<StoredRecommendation | null> {
  try {
    const result = await chrome.storage.local.get("lastRecommendation");
    return result.lastRecommendation || null;
  } catch (error) {
    console.error("Failed to get last recommendation:", error);
    return null;
  }
}

export async function setLastRecommendation(recommendation: StoredRecommendation): Promise<void> {
  try {
    await chrome.storage.local.set({ lastRecommendation: recommendation });
  } catch (error: any) {
    console.error("Failed to set last recommendation:", error);
    // Don't throw error for extension context invalidation - just log it
    if (error && (error.message?.includes("Extension context invalidated") || 
                  error.toString?.()?.includes("Extension context invalidated"))) {
      console.log("Extension context invalidated - this is normal when reloading extension");
      return;
    }
    throw error;
  }
}

export async function getDomainAllowlist(): Promise<DomainAllowlist> {
  try {
    const result = await chrome.storage.sync.get("domainAllowlist");
    return result.domainAllowlist || { domains: [] };
  } catch (error) {
    console.error("Failed to get domain allowlist:", error);
    return { domains: [] };
  }
}

export async function setDomainAllowlist(allowlist: DomainAllowlist): Promise<void> {
  try {
    await chrome.storage.sync.set({ domainAllowlist: allowlist });
  } catch (error: any) {
    console.error("Failed to set domain allowlist:", error);
    // Don't throw error for extension context invalidation - just log it
    if (error && (error.message?.includes("Extension context invalidated") || 
                  error.toString?.()?.includes("Extension context invalidated"))) {
      console.log("Extension context invalidated - this is normal when reloading extension");
      return;
    }
    throw error;
  }
}
