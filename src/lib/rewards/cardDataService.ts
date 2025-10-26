import { Card } from "../types";
import { CreditCardData, CreditCardRewardsJSON } from "../creditCardTypes";
import cardData from "../credit_card_rewards.json";

// Convert credit card JSON data to our Card format
export function loadCardsFromJSON(): Card[] {
  const jsonData = cardData as CreditCardRewardsJSON;
  
  return jsonData.offers.map((offer: CreditCardData, index: number) => {
    // Extract base rate from rewards program
    const baseRate = extractBaseRate(offer);
    
    // Extract category multipliers
    const categoryMultipliers = extractCategoryMultipliers(offer);
    
    // Get network from card name or bank
    const network = extractNetwork(offer);
    
    return {
      id: `card-${index}`,
      displayName: offer.cardName || offer.card_name,
      network: network,
      baseRate: baseRate,
      categoryMultipliers: categoryMultipliers,
      notes: formatNotes(offer)
    };
  });
}

function extractBaseRate(offer: CreditCardData): number {
  // Try to extract from cash back percentages
  if (offer.cash_back_percentages && typeof offer.cash_back_percentages === 'object') {
    const percentages = offer.cash_back_percentages;
    
    // Look for a general or other_purchases rate
    if (percentages.other_purchases) {
      return parsePercentage(percentages.other_purchases);
    }
    if (percentages.general) {
      return parsePercentage(percentages.general);
    }
  }
  
  // Try rewards program
  if (offer.rewards_program) {
    if (offer.rewards_program.general_rewards) {
      const match = offer.rewards_program.general_rewards.match(/(\d+)X/);
      if (match) return parseInt(match[1]) * 0.01;
    }
    if (offer.rewards_program.base_rewards) {
      const match = offer.rewards_program.base_rewards.match(/(\d+)X/);
      if (match) return parseInt(match[1]) * 0.01;
    }
  }
  
  return 0.01; // Default 1%
}

function extractCategoryMultipliers(offer: CreditCardData): Partial<Record<string, number>> {
  const multipliers: Partial<Record<string, number>> = {};
  
  // Extract from cash_back_percentages
  if (offer.cash_back_percentages && typeof offer.cash_back_percentages === 'object') {
    const percentages = offer.cash_back_percentages;
    
    if (percentages.dining) {
      multipliers.dining = parsePercentage(percentages.dining);
    }
    if (percentages.grocery_stores) {
      multipliers.groceries = parsePercentage(percentages.grocery_stores);
    }
    if (percentages.entertainment) {
      multipliers.entertainment = parsePercentage(percentages.entertainment);
    }
    if (percentages.gas_stations) {
      multipliers.gas = parsePercentage(percentages.gas_stations);
    }
  }
  
  // Extract from rewards program
  if (offer.rewards_program) {
    if (offer.rewards_program.bonus_rewards) {
      // Try to extract 5X miles on hotels, etc.
      const match = offer.rewards_program.bonus_rewards.match(/(\d+)X/);
      if (match) {
        multipliers.travel = parseInt(match[1]) * 0.01;
      }
    }
    if (offer.rewards_program.points_per_dollar) {
      const p = offer.rewards_program.points_per_dollar;
      if (p.flights) {
        multipliers.travel = parsePointsToRate(p.flights);
      }
      if (p.hotels) {
        multipliers.travel = parsePointsToRate(p.hotels);
      }
    }
  }
  
  return multipliers;
}

function parsePercentage(percentage: string): number {
  const match = percentage.match(/(\d+)%/);
  if (match) {
    return parseInt(match[1]) * 0.01;
  }
  return 0.01;
}

function parsePointsToRate(points: string): number {
  const match = points.match(/(\d+)\s*points?/);
  if (match) {
    return parseInt(match[1]) * 0.01;
  }
  return 0.01;
}

function extractNetwork(offer: CreditCardData): "Visa" | "Mastercard" | "Amex" | "Discover" {
  const cardName = (offer.cardName || offer.card_name || "").toLowerCase();
  
  if (cardName.includes("visa")) return "Visa";
  if (cardName.includes("mastercard")) return "Mastercard";
  if (offer.issuing_bank.toLowerCase().includes("american express") || cardName.includes("amex")) return "Amex";
  if (offer.issuing_bank.toLowerCase().includes("discover") || cardName.includes("discover")) return "Discover";
  if (offer.issuing_bank.toLowerCase().includes("chase")) return "Visa";
  if (offer.issuing_bank.toLowerCase().includes("capital one")) return "Visa";
  
  return "Visa"; // Default
}

function formatNotes(offer: CreditCardData): string {
  const notes: string[] = [];
  
  if (offer.sign_up_bonus?.details) {
    notes.push(offer.sign_up_bonus.details);
  }
  
  if (offer.annual_fee) {
    notes.push(`Annual fee: ${offer.annual_fee}`);
  }
  
  if (offer.key_benefits?.[0]) {
    notes.push(offer.key_benefits[0]);
  }
  
  return notes.join(" | ");
}

// Get card by name for quick lookup
export function getCardByName(cardName: string): Card | undefined {
  const cards = loadCardsFromJSON();
  return cards.find(card => card.displayName.toLowerCase().includes(cardName.toLowerCase()));
}





