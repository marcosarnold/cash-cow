// Merchant detection logic for content script
export interface TransactionContext {
  merchantId: string;
  merchantName: string;
  category: string;
  amount: number;
  url: string;
}

// Merchant mapping
const MERCHANT_MAP: Record<string, { name: string; category: string }> = {
  'amazon.com': { name: 'Amazon', category: 'online' },
  'ubereats.com': { name: 'Uber Eats', category: 'dining' },
  'doordash.com': { name: 'DoorDash', category: 'dining' },
  'grubhub.com': { name: 'Grubhub', category: 'dining' },
  'costco.com': { name: 'Costco', category: 'groceries' },
  'walmart.com': { name: 'Walmart', category: 'groceries' },
  'shell.com': { name: 'Shell', category: 'gas' },
  'chevron.com': { name: 'Chevron', category: 'gas' },
  'exxon.com': { name: 'Exxon', category: 'gas' },
};

// Amount detection patterns
const AMOUNT_PATTERNS = [
  // Common checkout selectors
  '[data-testid*="total"]',
  '[data-testid*="amount"]',
  '[data-testid*="price"]',
  '.total',
  '.amount',
  '.price',
  '.subtotal',
  '.order-total',
  // Generic patterns
  '[class*="total"]',
  '[class*="amount"]',
  '[class*="price"]',
  '[id*="total"]',
  '[id*="amount"]',
  '[id*="price"]',
];

function extractMerchantFromUrl(url: string): { id: string; name: string; category: string } | null {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    
    // Remove www. prefix
    const cleanHostname = hostname.replace(/^www\./, '');
    
    // Check direct matches
    if (MERCHANT_MAP[cleanHostname]) {
      return {
        id: cleanHostname,
        name: MERCHANT_MAP[cleanHostname].name,
        category: MERCHANT_MAP[cleanHostname].category,
      };
    }
    
    // Check partial matches
    for (const [domain, info] of Object.entries(MERCHANT_MAP)) {
      if (cleanHostname.includes(domain)) {
        return {
          id: domain,
          name: info.name,
          category: info.category,
        };
      }
    }
    
    return null;
  } catch (error) {
    console.warn('Harmony: Error parsing URL', error);
    return null;
  }
}

function extractAmountFromPage(): number | null {
  // Try to find amount using common selectors
  for (const selector of AMOUNT_PATTERNS) {
    const elements = document.querySelectorAll(selector);
    
    for (const element of elements) {
      const text = element.textContent || '';
      const amount = parseAmountFromText(text);
      
      if (amount && amount > 0) {
        return amount;
      }
    }
  }
  
  // Fallback: scan all visible text for dollar amounts
  const allText = document.body.textContent || '';
  const amounts = allText.match(/\$[\d,]+\.?\d*/g) || [];
  
  // Find the largest amount (likely the total)
  let maxAmount = 0;
  for (const amountStr of amounts) {
    const amount = parseAmountFromText(amountStr);
    if (amount && amount > maxAmount) {
      maxAmount = amount;
    }
  }
  
  return maxAmount > 0 ? maxAmount : null;
}

function parseAmountFromText(text: string): number | null {
  // Remove common prefixes/suffixes
  const cleanText = text
    .replace(/total|subtotal|amount|price|order/gi, '')
    .replace(/[^\d.,$]/g, '')
    .trim();
  
  // Extract dollar amount
  const match = cleanText.match(/\$?([\d,]+\.?\d*)/);
  
  if (match) {
    const amountStr = match[1].replace(/,/g, '');
    const amount = parseFloat(amountStr);
    
    // Reasonable amount range check
    if (amount >= 0.01 && amount <= 10000) {
      return amount;
    }
  }
  
  return null;
}

function isCheckoutPage(): boolean {
  const pathname = window.location.pathname.toLowerCase();
  
  // Common checkout page indicators
  const checkoutIndicators = [
    '/checkout',
    '/cart',
    '/basket',
    '/payment',
    '/order',
    '/confirm',
    '/review',
    '/place-order',
    '/complete',
  ];
  
  // Check URL path
  for (const indicator of checkoutIndicators) {
    if (pathname.includes(indicator)) {
      return true;
    }
  }
  
  // Check for common checkout elements
  const checkoutElements = [
    '[data-testid*="checkout"]',
    '[data-testid*="cart"]',
    '[data-testid*="payment"]',
    '.checkout',
    '.cart',
    '.payment',
    '.order-summary',
    '.billing',
    '.shipping',
  ];
  
  for (const selector of checkoutElements) {
    if (document.querySelector(selector)) {
      return true;
    }
  }
  
  return false;
}

export function getTransactionContext(): TransactionContext | null {
  try {
    // Check if we're on a checkout page
    if (!isCheckoutPage()) {
      return null;
    }
    
    // Extract merchant info
    const merchantInfo = extractMerchantFromUrl(window.location.href);
    if (!merchantInfo) {
      return null;
    }
    
    // Extract amount
    const amount = extractAmountFromPage();
    if (!amount) {
      return null;
    }
    
    return {
      merchantId: merchantInfo.id,
      merchantName: merchantInfo.name,
      category: merchantInfo.category,
      amount: amount,
      url: window.location.href,
    };
  } catch (error) {
    console.warn('Harmony: Error extracting transaction context', error);
    return null;
  }
}

// Export for testing
export {
  extractMerchantFromUrl,
  extractAmountFromPage,
  isCheckoutPage,
  parseAmountFromText,
};
