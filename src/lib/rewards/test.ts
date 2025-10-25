import { recommend } from "./engine";
import { CARDS, PROMOS } from "./rules";
import { TransactionContext } from "../types";

// Test the reward engine with sample data
const testContext: TransactionContext = {
  merchantId: "ubereats",
  merchantName: "Uber Eats",
  category: "dining",
  amount: 25.50,
  url: "https://www.ubereats.com/checkout"
};

const testRecommendation = recommend(testContext, CARDS, PROMOS);

console.log("Test Recommendation:", {
  card: testRecommendation.card.displayName,
  effectiveRate: `${(testRecommendation.effectiveRate * 100).toFixed(1)}%`,
  estimatedValue: `$${testRecommendation.estimatedValue.toFixed(2)}`,
  rationale: testRecommendation.rationale
});

// Expected: Amex Gold Card with dining 4x + Uber Eats bonus
export { testRecommendation };
