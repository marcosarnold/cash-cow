// Background service worker for Harmony extension
import { TransactionContext } from '../content/merchant/detect';

// Message types
interface Message {
  type: string;
  payload?: any;
}

interface Recommendation {
  card: {
    id: string;
    name: string;
    type: string;
    last4: string;
    color: string;
    rewardType: string;
    network: string;
  };
  effectiveRate: string;
  estimatedValue: string;
  rationale: string[];
}

// Mock reward engine (in a real app, this would be more sophisticated)
function calculateRecommendation(context: TransactionContext): Recommendation {
  // Mock cards data
  const cards = [
    {
      id: "1",
      name: "Amex Gold",
      type: "American Express",
      last4: "7997",
      color: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
      rewardType: "Points",
      network: "amex",
    },
    {
      id: "2",
      name: "Chase Sapphire Preferred",
      type: "Chase",
      last4: "1234",
      color: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
      rewardType: "Points",
      network: "visa",
    },
  ];

  // Simple logic: Amex Gold for dining, Chase Sapphire for others
  const bestCard = context.category === 'dining' ? cards[0] : cards[1];
  const multiplier = context.category === 'dining' ? 4 : 2;
  const points = Math.round(context.amount * multiplier);
  const value = (points * 0.01).toFixed(2);

  return {
    card: bestCard,
    effectiveRate: `${multiplier}×`,
    estimatedValue: `$${value}`,
    rationale: [
      `${bestCard.name} earns ${multiplier}× points on ${context.category}`,
      `Maximize rewards for this purchase`,
      `${points} bonus points earned`
    ]
  };
}

// Message handler
chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  console.log('Harmony background received message:', message);

  switch (message.type) {
    case 'HARMONY_EVAL':
      // Evaluate transaction context
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
              // This will be executed in the content script context
              return (window as any).getTransactionContext?.();
            }
          }).then((results) => {
            const context = results[0]?.result as TransactionContext;
            
            if (context) {
              const recommendation = calculateRecommendation(context);
              
              // Store recommendation
              chrome.storage.local.set({
                lastRecommendation: recommendation,
                lastContext: context,
                timestamp: Date.now()
              });

              sendResponse({ success: true, recommendation, context });
            } else {
              sendResponse({ success: false, error: 'No transaction context found' });
            }
          }).catch((error) => {
            console.error('Harmony: Error executing script:', error);
            sendResponse({ success: false, error: error.message });
          });
        }
      });
      return true; // Keep message channel open for async response

    case 'HARMONY_GET_LAST':
      // Get last recommendation
      chrome.storage.local.get(['lastRecommendation', 'lastContext', 'timestamp'], (result) => {
        sendResponse({
          success: true,
          recommendation: result.lastRecommendation,
          context: result.lastContext,
          timestamp: result.timestamp
        });
      });
      return true;

    case 'HARMONY_CLEAR':
      // Clear stored data
      chrome.storage.local.clear(() => {
        sendResponse({ success: true });
      });
      return true;

    default:
      sendResponse({ success: false, error: 'Unknown message type' });
      return false;
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Harmony extension installed:', details);
  
  // Set default settings
  chrome.storage.sync.set({
    USE_MOCK_DATA: true,
    ENABLE_FETCH_AGENT: false,
    ENABLE_ADS: false,
    enabledDomains: [
      'amazon.com',
      'ubereats.com',
      'doordash.com',
      'grubhub.com',
      'costco.com',
      'walmart.com',
      'shell.com',
      'chevron.com',
      'exxon.com'
    ]
  });
});


console.log('Harmony background script loaded');
