import { Card, PromoRule } from "../types";

export const CARDS: Card[] = [
  {
    id: "amex-gold",
    displayName: "Amex Gold Card",
    network: "Amex",
    baseRate: 0.01,
    categoryMultipliers: {
      dining: 4,
      groceries: 4,
      travel: 3
    },
    notes: "Premium dining and grocery rewards"
  },
  {
    id: "chase-freedom",
    displayName: "Chase Freedom Flex",
    network: "Visa",
    baseRate: 0.01,
    categoryMultipliers: {
      online: 3,
      groceries: 3,
      gas: 3
    },
    notes: "Rotating quarterly categories"
  },
  {
    id: "citi-custom",
    displayName: "Citi Custom Cash",
    network: "Mastercard",
    baseRate: 0.01,
    categoryMultipliers: {
      groceries: 5,
      gas: 5,
      dining: 5
    },
    notes: "Top spending category gets 5%"
  },
  {
    id: "discover-it",
    displayName: "Discover it Cash Back",
    network: "Discover",
    baseRate: 0.01,
    categoryMultipliers: {
      online: 5,
      groceries: 5,
      gas: 5
    },
    notes: "Rotating quarterly 5% categories"
  },
  {
    id: "capital-one",
    displayName: "Capital One Venture",
    network: "Visa",
    baseRate: 0.02,
    categoryMultipliers: {
      travel: 2,
      general: 2
    },
    notes: "Flat 2% on everything"
  }
];

export const PROMOS: PromoRule[] = [
  {
    appliesToCardId: "amex-gold",
    merchantIds: ["ubereats", "doordash", "grubhub"],
    bonusRate: 0.02,
    expiresAt: "2026-01-01",
    rationale: "Food delivery bonus"
  },
  {
    appliesToCardId: "chase-freedom",
    categories: ["online"],
    multiplier: 1.5,
    expiresAt: "2024-12-31",
    rationale: "Online shopping boost"
  },
  {
    appliesToCardId: "citi-custom",
    merchantIds: ["amazon", "walmart"],
    bonusRate: 0.01,
    expiresAt: "2025-06-30",
    rationale: "Major retailer bonus"
  },
  {
    appliesToCardId: "discover-it",
    categories: ["gas"],
    bonusRate: 0.01,
    expiresAt: "2024-12-31",
    rationale: "Gas station bonus"
  }
];
