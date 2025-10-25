import { HarmonyMessage } from "./types";

export function sendMessage(message: HarmonyMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export function onMessage(
  callback: (message: HarmonyMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void
): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    callback(message, sender, sendResponse);
    return true; // Keep message channel open for async response
  });
}

export function sendMessageToTab(tabId: number, message: HarmonyMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}
