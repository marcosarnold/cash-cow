import { HarmonyMessage } from "../../lib/types";
import { onMessage } from "../../lib/bus";
import { getFeatureFlags } from "../../lib/storage";

// Handle messages from popup and content scripts
onMessage((message: HarmonyMessage, sender, sendResponse) => {
  if (message.type === "HARMONY_EVAL") {
    handleEvaluationRequest(sender.tab?.id, sendResponse);
    return true; // Keep message channel open for async response
  }
  
  if (message.type === "HARMONY_CTX") {
    // Handle context updates if needed
    sendResponse({ success: true });
  }
});

async function handleEvaluationRequest(tabId: number | undefined, sendResponse: (response?: any) => void) {
  if (!tabId) {
    sendResponse({ error: "No active tab" });
    return;
  }

  try {
    // Check if feature flags allow evaluation
    const flags = await getFeatureFlags();
    if (!flags.USE_MOCK_DATA) {
      sendResponse({ error: "Mock data disabled" });
      return;
    }

    // Send message to content script to trigger evaluation
    chrome.tabs.sendMessage(tabId, { type: "HARMONY_EVAL" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Failed to send message to content script:", chrome.runtime.lastError);
        sendResponse({ error: "Failed to communicate with content script" });
      } else {
        sendResponse({ success: true, data: response });
      }
    });
  } catch (error) {
    console.error("Error handling evaluation request:", error);
    sendResponse({ error: "Internal error" });
  }
}

// Optional: Set up alarms for rotating promos (behind feature flag)
if (chrome.alarms) {
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "rotate-promos") {
      const flags = await getFeatureFlags();
      if (flags.ENABLE_ADS) {
        // Rotate mock promos weekly
        console.log("Rotating mock promos...");
        // This would update stored promo data in a real implementation
      }
    }
  });

  // Set up weekly promo rotation alarm (if enabled)
  chrome.runtime.onStartup.addListener(async () => {
    const flags = await getFeatureFlags();
    if (flags.ENABLE_ADS) {
      chrome.alarms.create("rotate-promos", {
        delayInMinutes: 60 * 24 * 7, // 1 week
        periodInMinutes: 60 * 24 * 7  // Repeat weekly
      });
    }
  });
}

console.log("Harmony background script loaded");
