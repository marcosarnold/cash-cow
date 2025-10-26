// Background service worker for Harmony extension
import { TransactionContext } from '../content/merchant/detect';
import { recommend } from '../../lib/rewards/engine';
import { CARDS } from '../../lib/rewards/rules';

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

// Use the real reward engine
function calculateRecommendation(context: TransactionContext): Recommendation {
  try {
    // Use the real engine from lib/rewards/engine.ts
    const result = recommend(context, CARDS, []);
    
    // Convert to the format expected by the message handler
    return {
      card: {
        id: result.card.id,
        name: result.card.displayName,
        type: result.card.network,
        last4: "0000", // Real cards would have last4 from storage
        color: getCardColor(result.card.network),
        rewardType: "Points",
        network: result.card.network.toLowerCase(),
      },
      effectiveRate: `${(result.effectiveRate * 100).toFixed(1)}%`,
      estimatedValue: `$${result.estimatedValue.toFixed(2)}`,
      rationale: result.rationale
    };
  } catch (error) {
    console.error('Error calculating recommendation:', error);
    throw error;
  }
}

function getCardColor(network: string): string {
  const colors: Record<string, string> = {
    'Amex': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    'Visa': 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
    'Mastercard': 'linear-gradient(135deg, #EB001B 0%, #FF5F00 100%)',
    'Discover': 'linear-gradient(135deg, #8B0000 0%, #A0522D 100%)',
  };
  return colors[network] || 'linear-gradient(135deg, #2E5266 0%, #1A3A4A 100%)';
}


// Handle checkout detection - auto-open popup
chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  console.log('Harmony background received message:', message);

  switch (message.type) {
    case 'CHECKOUT_DETECTED':
      // Show badge on extension icon (Honey-style)
      console.log('🛒 Checkout detected! Updating badge...');
      
      // Update badge
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#F59E0B' });
      
      sendResponse({ success: true });
      return false;

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

    case 'HARMONY_SHOW_READY':
      // Show badge and update icon
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#F59E0B' });
      console.log('✅ Harmony ready - user should click icon');
      sendResponse({ success: true });
      return false;

    default:
      sendResponse({ success: false, error: 'Unknown message type' });
      return false;
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-popup') {
    chrome.action.openPopup().catch(() => {
      console.log('Popup could not be opened programmatically');
    });
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Harmony extension installed:', details);
  
  // Set default settings
  chrome.storage.sync.set({
    USE_MOCK_DATA: false, // Now using real data!
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
