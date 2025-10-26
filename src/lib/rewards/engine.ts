import { TransactionContext, Card, PromoRule, Recommendation } from "../types";
import { discoverOffers } from "../services/offerDiscovery";

export function recommend(
  ctx: TransactionContext,
  cards: Card[],
  promos: PromoRule[]
): Recommendation {
  let bestCard: Card | null = null;
  let bestEffectiveRate = 0;
  let bestRationale: string[] = [];

  // Discover current offers for this merchant/category
  const currentOffers = discoverOffers(ctx.merchantId, ctx.category);
  
  for (const card of cards) {
    let effectiveRate = card.baseRate;
    const rationale: string[] = [];

    // Apply category multiplier
    const categoryMultiplier = card.categoryMultipliers[ctx.category];
    if (categoryMultiplier) {
      effectiveRate = card.baseRate * categoryMultiplier;
      rationale.push(`${ctx.category} ×${categoryMultiplier}`);
    } else {
      rationale.push(`Base ${(card.baseRate * 100).toFixed(1)}%`);
    }

    // Apply promotional rules
    const applicablePromos = promos.filter(promo => 
      promo.appliesToCardId === card.id &&
      (!promo.merchantIds || promo.merchantIds.includes(ctx.merchantId)) &&
      (!promo.categories || promo.categories.includes(ctx.category)) &&
      (!promo.expiresAt || new Date(promo.expiresAt) > new Date())
    );

    for (const promo of applicablePromos) {
      if (promo.multiplier) {
        effectiveRate *= promo.multiplier;
        rationale.push(`Promo ×${promo.multiplier}`);
      }
      if (promo.bonusRate) {
        effectiveRate += promo.bonusRate;
        rationale.push(`+${(promo.bonusRate * 100).toFixed(1)}% bonus`);
      }
      if (promo.rationale) {
        rationale.push(promo.rationale);
      }
    }
    
    // Apply discovered offers from MCP scraping
    for (const offer of currentOffers) {
      if (card.displayName.toLowerCase().includes(offer.cardName.toLowerCase())) {
        effectiveRate += offer.bonusRate;
        rationale.push(`Offer: ${offer.rationale}`);
      }
    }

    // Track best card
    if (effectiveRate > bestEffectiveRate) {
      bestCard = card;
      bestEffectiveRate = effectiveRate;
      bestRationale = rationale;
    }
  }

  if (!bestCard) {
    throw new Error("No cards available for recommendation");
  }

  const estimatedValue = ctx.amount * bestEffectiveRate;

  return {
    card: bestCard,
    effectiveRate: bestEffectiveRate,
    estimatedValue,
    rationale: bestRationale
  };
}







