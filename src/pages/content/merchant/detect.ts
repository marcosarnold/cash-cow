import { MerchantId, Category, TransactionContext } from "../../../lib/types";
import { MERCHANT_MAP, CATEGORY_MAP } from "../../../lib/config";

export function canonicalizeMerchant(hostname: string): MerchantId {
  const domain = hostname.replace(/^www\./, "");
  return MERCHANT_MAP[domain] || domain;
}

export function inferCategory(merchant: MerchantId): Category {
  return (CATEGORY_MAP[merchant] as Category) || "online";
}

export function isCheckoutPage(): boolean {
  const url = window.location.href.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();
  
  console.log('Harmony Debug - Checking page:', {
    url: window.location.href,
    pathname,
    title: document.title
  });
  
  // Check URL patterns for checkout pages
  const checkoutPatterns = [
    '/checkout',
    '/cart',
    '/payment',
    '/order',
    '/confirm',
    '/review',
    '/place-order',
    '/complete-purchase',
    '/billing',
    '/shipping',
    '/buy',
    '/purchase'
  ];
  
  // Check if URL contains checkout indicators
  const urlMatch = checkoutPatterns.some(pattern => pathname.includes(pattern));
  if (urlMatch) {
    console.log('Harmony Debug - URL pattern match found');
    return true;
  }
  
  // Check for checkout-specific elements
  const checkoutSelectors = [
    '[data-testid*="checkout"]',
    '[data-testid*="cart"]',
    '[data-testid*="payment"]',
    '[data-testid*="order"]',
    '.checkout',
    '.cart-summary',
    '.payment-form',
    '.order-summary',
    '.billing-form',
    '.shipping-form',
    '#checkout',
    '#cart',
    '#payment',
    '#order-summary',
    '[class*="cart"]',
    '[class*="checkout"]',
    '[id*="cart"]',
    '[id*="checkout"]'
  ];
  
  for (const selector of checkoutSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      console.log('Harmony Debug - Element match found:', selector);
      return true;
    }
  }
  
  // Check page title for checkout indicators
  const title = document.title.toLowerCase();
  const checkoutTitleWords = ['checkout', 'cart', 'payment', 'order', 'purchase', 'billing', 'buy'];
  const titleMatch = checkoutTitleWords.some(word => title.includes(word));
  if (titleMatch) {
    console.log('Harmony Debug - Title match found');
    return true;
  }
  
  console.log('Harmony Debug - No checkout indicators found');
  return false;
}

export function extractAmount(document: Document): number | null {
  // Merchant-specific selectors for better accuracy
  const merchantSelectors: Record<string, string[]> = {
    'amazon': [
      '#sc-subtotal-amount-buybox',
      '.a-size-medium.a-color-base.sc-price',
      '[data-testid="price"]',
      '.a-price-whole',
      '#sc-subtotal-label-activecart',
      '.sc-price'
    ],
    'ubereats': [
      '[data-testid="order-total"]',
      '.order-total',
      '.total-amount',
      '[data-testid="total"]'
    ],
    'doordash': [
      '.order-total',
      '.total-price',
      '[data-testid="total"]',
      '.checkout-total'
    ],
    'grubhub': [
      '.order-total',
      '.total-amount',
      '[data-testid="total"]'
    ],
    'costco': [
      '.order-total',
      '.total-price',
      '.checkout-total'
    ],
    'walmart': [
      '.order-total',
      '.total-price',
      '.checkout-total'
    ]
  };
  
  const hostname = window.location.hostname.replace(/^www\./, '');
  const merchantId = MERCHANT_MAP[hostname];
  
  // Try merchant-specific selectors first
  if (merchantId && merchantSelectors[merchantId]) {
    for (const selector of merchantSelectors[merchantId]) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent || "";
        const amount = parseAmountFromText(text);
        if (amount && amount > 0) {
          return amount;
        }
      }
    }
  }
  
  // Try common selectors for total amounts
  const commonSelectors = [
    '[id*="total"]',
    '[data-test*="total"]',
    '.order-total',
    '.grand-total',
    '.summary-total',
    '.checkout-total',
    '.cart-total',
    '.subtotal',
    '.total-price',
    '.amount-total',
    '[class*="total"]',
    '[class*="amount"]',
    '[data-testid*="total"]',
    '[data-testid*="price"]',
    '[data-testid*="amount"]'
  ];

  for (const selector of commonSelectors) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      const text = element.textContent || "";
      const amount = parseAmountFromText(text);
      if (amount && amount > 0) {
        return amount;
      }
    }
  }

  // Fallback: scan visible text for $ patterns
  const allText = document.body.textContent || "";
  const amounts = extractAllAmounts(allText);
  
  if (amounts.length > 0) {
    // Return the largest amount found (likely the total)
    return Math.max(...amounts);
  }

  return null;
}

function parseAmountFromText(text: string): number | null {
  // Match patterns like $123.45, $1,234.56, 123.45, etc.
  const match = text.match(/\$?([0-9,]+\.?[0-9]*)/);
  if (match) {
    const amountStr = match[1].replace(/,/g, "");
    const amount = parseFloat(amountStr);
    return isNaN(amount) ? null : amount;
  }
  return null;
}

function extractAllAmounts(text: string): number[] {
  const amounts: number[] = [];
  const matches = text.matchAll(/\$?([0-9,]+\.?[0-9]*)/g);
  
  for (const match of matches) {
    const amountStr = match[1].replace(/,/g, "");
    const amount = parseFloat(amountStr);
    if (!isNaN(amount) && amount > 0) {
      amounts.push(amount);
    }
  }
  
  return amounts;
}

export function getTransactionContext(): TransactionContext | null {
  const hostname = window.location.hostname;
  const merchantId = canonicalizeMerchant(hostname);
  const category = inferCategory(merchantId);
  
  console.log('Harmony Debug - Transaction context check:', {
    hostname,
    merchantId,
    category
  });
  
  // Only show overlay on checkout pages
  if (!isCheckoutPage()) {
    console.log('Harmony Debug - Not a checkout page, returning null');
    return null;
  }
  
  const amount = extractAmount(document);
  console.log('Harmony Debug - Amount extracted:', amount);
  
  if (!amount || amount <= 0) {
    console.log('Harmony Debug - No valid amount found, returning null');
    return null;
  }

  // Get merchant name from page title or meta tags
  let merchantName = merchantId;
  const title = document.title;
  if (title) {
    // Extract merchant name from title (e.g., "Amazon.com: Online Shopping" -> "Amazon")
    const titleMatch = title.match(/^([^:]+)/);
    if (titleMatch) {
      merchantName = titleMatch[1].trim();
    }
  }

  // Try to get site name from meta tags
  const siteNameMeta = document.querySelector('meta[property="og:site_name"]');
  if (siteNameMeta) {
    const siteName = siteNameMeta.getAttribute("content");
    if (siteName) {
      merchantName = siteName;
    }
  }

  return {
    merchantId,
    merchantName,
    category,
    amount,
    url: window.location.href
  };
}
