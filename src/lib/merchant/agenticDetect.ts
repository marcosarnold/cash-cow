// Agentic merchant detection using category classification
// This simulates the agent_one.py logic in TypeScript

export type Category = "TRAVEL" | "ENTERTAINMENT" | "E-COMMERCE" | "FINANCE" | "UTILITIES" | "OTHER";
export type HarmonyCategory = "travel" | "dining" | "gas" | "groceries" | "online" | "general" | "other" | "entertainment" | "finance";

// Domain to category mapping (based on agent logic)
const CATEGORY_MAP: Record<string, HarmonyCategory> = {
  // Travel
  'airline': 'travel',
  'hotel': 'travel',
  'booking': 'travel',
  'expedia': 'travel',
  'airbnb': 'travel',
  'priceline': 'travel',
  'kayak': 'travel',
  
  // Entertainment
  'netflix': 'entertainment',
  'spotify': 'entertainment',
  'hulu': 'entertainment',
  'disney': 'entertainment',
  'amazon prime': 'entertainment',
  'ticketmaster': 'entertainment',
  
  // Dining
  'restaurant': 'dining',
  'dining': 'dining',
  'food': 'dining',
  'grubhub': 'dining',
  'doordash': 'dining',
  'ubereats': 'dining',
  'postmates': 'dining',
  'chipotle': 'dining',
  
  // Gas
  'shell': 'gas',
  'chevron': 'gas',
  'exxon': 'gas',
  'bp': 'gas',
  'mobil': 'gas',
  'conoco': 'gas',
  
  // Groceries
  'costco': 'groceries',
  'walmart': 'groceries',
  'safeway': 'groceries',
  'kroger': 'groceries',
  'whole foods': 'groceries',
  'trader joe': 'groceries',
  
  // E-commerce / Online
  'amazon': 'online',
  'ebay': 'online',
  'etsy': 'online',
  'target': 'online',
  'best buy': 'online',
};

/**
 * Classifies a domain into a category (simulating the agent's LLM classification)
 */
export function classifyDomain(domain: string): Category {
  const lowerDomain = domain.toLowerCase();
  
  // Check against category map
  for (const [key] of Object.entries(CATEGORY_MAP)) {
    if (lowerDomain.includes(key)) {
      return mapToAgentCategory(key);
    }
  }
  
  return "OTHER";
}

/**
 * Maps Harmony categories to agent categories
 */
function mapToAgentCategory(key: string): Category {
  const harmonyCategory = CATEGORY_MAP[key] || 'general';
  
  switch (harmonyCategory) {
    case 'travel':
      return "TRAVEL";
    case 'entertainment':
    case 'dining':
      return "ENTERTAINMENT";
    case 'online':
      return "E-COMMERCE";
    case 'groceries':
    case 'gas':
      return "UTILITIES";
    case 'finance':
      return "FINANCE";
    default:
      return "OTHER";
  }
}

/**
 * Converts agent category to Harmony category
 */
export function agentCategoryToHarmony(category: Category): HarmonyCategory {
  const map: Record<Category, HarmonyCategory> = {
    "TRAVEL": "travel",
    "ENTERTAINMENT": "dining",
    "E-COMMERCE": "online",
    "FINANCE": "general",
    "UTILITIES": "groceries",
    "OTHER": "general",
  };
  
  return map[category] || "general";
}

/**
 * Smart merchant detection using agentic approach
 * This function now actually calls the Fetch.AI agent (when enabled)
 */
export async function detectMerchantWithAgent(url: string): Promise<{ 
  merchantId: string; 
  merchantName: string; 
  category: HarmonyCategory;
  agentCategory: Category;
} | null> {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    const domain = hostname.replace(/^www\./, '');
    
    // Check if Fetch.AI agent is enabled
    let agentCategory: Category;
    
    try {
      // Try to call the real Fetch.AI agent
      // This will only work if the agent is running and feature flag is enabled
      const response = await fetch('http://localhost:8080/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(2000) // 2 second timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        agentCategory = data.category as Category;
        console.log('✓ Fetch.AI agent classification:', agentCategory);
      } else {
        throw new Error('Agent request failed');
      }
    } catch (error) {
      // Agent not available - return null to trigger fallback
      console.warn('⚠ Fetch.AI agent not available, using static mapping:', error);
      agentCategory = classifyDomain(domain);
    }
    
    const harmonyCategory = agentCategoryToHarmony(agentCategory);
    
    // Extract merchant name from domain
    const merchantName = domain.split('.')[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      merchantId: domain,
      merchantName: merchantName,
      category: harmonyCategory,
      agentCategory: agentCategory,
    };
  } catch (error) {
    console.warn('Harmony: Error in agentic merchant detection', error);
    return null;
  }
}

/**
 * Enhanced transaction context with agentic classification
 */
export interface AgenticTransactionContext {
  merchantId: string;
  merchantName: string;
  category: HarmonyCategory;
  agentCategory: Category;
  amount: number;
  url: string;
  confidence?: 'high' | 'medium' | 'low';
}

