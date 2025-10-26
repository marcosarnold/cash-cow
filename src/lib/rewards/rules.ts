import { Card, PromoRule } from "../types";
import { loadCardsFromJSON } from "./cardDataService";

// Load cards from JSON data
export const CARDS: Card[] = loadCardsFromJSON();

export const PROMOS: PromoRule[] = [
  {
    appliesToCardId: "card-0", // First card in JSON
    merchantIds: ["ubereats", "doordash", "grubhub"],
    bonusRate: 0.02,
    expiresAt: "2026-01-01",
    rationale: "Food delivery bonus"
  },
  {
    appliesToCardId: "card-1",
    categories: ["online"],
    multiplier: 1.5,
    expiresAt: "2024-12-31",
    rationale: "Online shopping boost"
  }
];
