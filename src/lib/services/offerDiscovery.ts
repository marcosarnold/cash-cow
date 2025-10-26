// Offer discovery service (simulating MCP web scraping)
// This provides dynamic offer detection based on merchant and category

import { CreditCardRewardsJSON } from "../creditCardTypes";
import cardData from "../credit_card_rewards.json";

// Mock offer discovery results (would normally come from MCP scraping)
const MOCK_OFFERS: Record<string, {
  merchant: string;
  cardName: string;
  bonusRate: number;
  rationale: string;
  expiresAt: string;
}> = {
  'chipotle': {
    merchant: 'chipotle',
    cardName: 'Chase Sapphire Preferred',
    bonusRate: 0.01,
    rationale: 'Chipotle is considered dining - earn 3x points',
    expiresAt: '2026-12-31',
  },
  'amazon': {
    merchant: 'amazon',
    cardName: 'Capital One Venture X',
    bonusRate: 0.02,
    rationale: 'Amazon purchases earn 2x miles on everything',
    expiresAt: '2026-12-31',
  },
  'ubereats': {
    merchant: 'ubereats',
    cardName: 'American Express Gold',
    bonusRate: 0.03,
    rationale: 'Uber Eats is dining - earn 4x Membership Rewards points',
    expiresAt: '2026-12-31',
  },
};

/**
 * Discovers current offers for a merchant and category
 */
export function discoverOffers(merchantId: string, category: string): {
  cardName: string;
  bonusRate: number;
  rationale: string;
  expiresAt: string;
}[] {
  const offers: Array<{
    cardName: string;
    bonusRate: number;
    rationale: string;
    expiresAt: string;
  }> = [];
  
  // Check for known offers
  if (MOCK_OFFERS[merchantId.toLowerCase()]) {
    offers.push(MOCK_OFFERS[merchantId.toLowerCase()]);
  }
  
  // Find cards with category bonuses from JSON data
  const jsonData = cardData as CreditCardRewardsJSON;
  
  for (const card of jsonData.offers) {
    const rewardsProgram = card.rewards_program;
    
    if (!rewardsProgram) continue;
    
    // Check for category-specific bonuses
    const cashBack = rewardsProgram.cash_back_percentages;
    if (cashBack && typeof cashBack === 'object') {
      const categoryKey = mapHarmonyCategoryToJSONKey(category);
      
      if (cashBack[categoryKey]) {
        const bonusRate = parsePercentage(cashBack[categoryKey]);
        offers.push({
          cardName: card.cardName,
          bonusRate: bonusRate - 0.01, // Subtract base rate to get bonus
          rationale: `${capitalizeCategory(category)} bonus: ${cashBack[categoryKey]}`,
          expiresAt: '2026-12-31',
        });
      }
    }
  }
  
  return offers;
}

function mapHarmonyCategoryToJSONKey(category: string): string {
  const mapping: Record<string, string> = {
    'dining': 'dining',
    'groceries': 'grocery_stores',
    'gas': 'gas_stations',
    'entertainment': 'entertainment',
    'travel': 'travel',
    'online': 'other_purchases',
  };
  
  return mapping[category.toLowerCase()] || 'other_purchases';
}

function parsePercentage(percentage: string): number {
  const match = percentage.match(/(\d+)%/);
  if (match) {
    return parseInt(match[1]) * 0.01;
  }
  return 0.01;
}

function capitalizeCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Gets bonus rate for a specific card on a merchant
 */
export function getBonusRate(cardName: string, merchantId: string, category: string): number {
  const offers = discoverOffers(merchantId, category);
  
  for (const offer of offers) {
    if (offer.cardName.toLowerCase().includes(cardName.toLowerCase())) {
      return offer.bonusRate;
    }
  }
  
  return 0;
}

