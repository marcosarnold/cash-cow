// Universal price detection for all merchant sites
(function() {
  'use strict';

  const MERCHANT_DOMAINS = {
    'amazon.com': 'Amazon',
    'ubereats.com': 'Uber Eats',
    'doordash.com': 'DoorDash',
    'grubhub.com': 'Grubhub',
    'costco.com': 'Costco',
    'walmart.com': 'Walmart',
    'shell.com': 'Shell',
    'chevron.com': 'Chevron',
    'exxon.com': 'Exxon',
  };

  // Wait for page to load
  setTimeout(() => {
    const hostname = window.location.hostname.toLowerCase().replace(/^www\./, '');
    
    // Check if this is a known merchant
    if (!MERCHANT_DOMAINS[hostname]) {
      // Not a known checkout site, don't run
      return;
    }
    
    const merchantName = MERCHANT_DOMAINS[hostname];

    // Universal price detection - works for all sites
    let amount = null;
    
    // Common price selectors across all merchants
    const priceSelectors = [
      // Amazon-specific
      '#sc-subtotal-amount-buybox',
      '#sc-subtotal-amount-activecart',
      '.a-price-whole',
      '[class*="sc-price"]',
      
      // Generic patterns
      '[class*="total"]',
      '[class*="amount"]',
      '[class*="price"]',
      '[class*="subtotal"]',
      '[id*="total"]',
      '[id*="amount"]',
      '[id*="subtotal"]',
      '[data-testid*="total"]',
      '[data-testid*="amount"]',
      '[data-testid*="price"]',
    ];

    // Try each selector
    for (const selector of priceSelectors) {
      const elements = document.querySelectorAll(selector);
      
      for (const element of elements) {
        const text = element.textContent || '';
        // Look for dollar amounts
        const match = text.match(/\$?([\d,]+\.?\d*)/);
        if (match) {
          const value = parseFloat(match[1].replace(/,/g, ''));
          if (value && value > 0.01 && value < 10000) {
            // Keep track of the largest reasonable amount (likely the total)
            if (!amount || value > amount) {
              amount = value;
            }
          }
        }
      }
    }

    // Store the amount and merchant
    if (amount) {
      chrome.storage.local.set({
        lastDetectedAmount: amount,
        lastDetectedMerchant: merchantName,
        lastDetectedDomain: hostname,
        lastUrl: window.location.href,
        timestamp: Date.now()
      });
      
      // Show badge on extension icon (Honey-style)
      chrome.runtime.sendMessage({
        type: 'CHECKOUT_DETECTED',
        merchant: merchantName
      });
      
      console.log('🛒 Harmony: Checkout detected at', merchantName, '- Amount: $' + amount.toFixed(2));
    }
  }, 1500); // Wait 1.5 seconds for page to fully load

})();

