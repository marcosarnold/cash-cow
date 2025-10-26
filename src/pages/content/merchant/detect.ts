// Merchant detection logic for content script
import { TransactionContext as TransactionContextType, Category } from "../../../lib/types";

export type TransactionContext = TransactionContextType;

// Merchant mapping
const MERCHANT_MAP: Record<string, { name: string; category: Category }> = {
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

// Amount detection patterns (including Amazon-specific)
const AMOUNT_PATTERNS = [
  // Amazon-specific
  '#sc-subtotal-amount-buybox',
  '#sc-subtotal-amount-activecart',
  '.sc-price',
  '[class*="sc-price"]',
  '[class*="price-display"]',
  '[data-a-color="price"]',
  '[data-a-color="secondary"]',
  '[class*="order-summary"]',
  '[id*="sc-subtotal"]',
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

function extractMerchantFromUrl(url: string): { id: string; name: string; category: Category } | null {
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
    // For now, use traditional detection (synchronous)
    // Async agentic detection is handled in content script
    const merchantInfo = extractMerchantFromUrl(window.location.href);
    
    if (!merchantInfo) {
      // Don't show overlay if no merchant detected
      return null;
    }
    
    // Extract amount from page
    const amount = extractAmountFromPage();
    
    // Use default amount if not detected (so overlay still shows)
    const finalAmount = amount && amount > 0 ? amount : null;
    
    return {
      merchantId: merchantInfo.id,
      merchantName: merchantInfo.name,
      category: merchantInfo.category as Category,
      amount: finalAmount || 0, // Allow 0 so overlay shows
      url: window.location.href,
    };
  } catch (error) {
    console.warn('Harmony: Error extracting transaction context', error);
    // Don't show overlay if error
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
