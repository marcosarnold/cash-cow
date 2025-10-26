// Amazon-specific amount extraction
(function() {
  'use strict';

  // Wait for page to load
  setTimeout(() => {
    // Try to find the cart/subtotal amount on Amazon
    const amountSelectors = [
      '#sc-subtotal-amount-buybox',
      '#sc-subtotal-amount-activecart',
      '#sc-subtotal-label-buybox',
      '[data-a-color="price"]',
      '[class*="sc-price"]',
      '[class*="price-display"]',
      '.a-price-whole',
      '[id*="subtotal"]',
    ];

    let amount: number | null = null;
    
    // Try each selector
    for (const selector of amountSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent || '';
        // Look for dollar amounts
        const match = text.match(/\$?([\d,]+\.?\d*)/);
        if (match) {
          amount = parseFloat(match[1].replace(/,/g, ''));
          if (amount && amount > 0 && amount < 10000) {
            break;
          }
        }
      }
    }

    // Also try looking for any price text on the page
    if (!amount) {
      const allText = document.body.textContent || '';
      const prices = allText.match(/\$([\d,]+\.?\d*)/g) || [];
      
      for (const price of prices) {
        const match = price.match(/\$([\d,]+\.?\d*)/);
        if (match) {
          const value = parseFloat(match[1].replace(/,/g, ''));
          if (value && value > 0 && value < 10000) {
            // Assume largest amount is the total
            if (!amount || value > amount) {
              amount = value;
            }
          }
        }
      }
    }

    // Store the amount if found
    if (amount) {
      chrome.storage.local.set({
        lastDetectedAmount: amount,
        lastDetectedMerchant: 'amazon.com',
        lastUrl: window.location.href
      });
      console.log('Harmony: Detected amount:', amount);
    }
  }, 2000); // Wait 2 seconds for page to fully load

})();




