export type MerchantId = string;

export type Category = 
  | "groceries" 
  | "dining" 
  | "gas" 
  | "travel" 
  | "general" 
  | "online" 
  | "other";

export interface TransactionContext {
  merchantId: MerchantId;
  merchantName: string;
  category: Category;
  amount: number;
  url: string;
}

export interface Card {
  id: string;
  displayName: string;
  network: "Visa" | "Mastercard" | "Amex" | "Discover";
  baseRate: number;
  categoryMultipliers: Partial<Record<Category, number>>;
  notes?: string;
}

export interface PromoRule {
  appliesToCardId: string;
  merchantIds?: MerchantId[];
  categories?: Category[];
  bonusRate?: number;
  multiplier?: number;
  expiresAt?: string;
  rationale?: string;
}

export interface Recommendation {
  card: Card;
  effectiveRate: number;
  estimatedValue: number;
  rationale: string[];
}

export interface HarmonyMessage {
  type: "HARMONY_EVAL" | "HARMONY_CTX";
  payload?: any;
}

export interface FeatureFlags {
  USE_MOCK_DATA: boolean;
  ENABLE_FETCH_AGENT: boolean;
  ENABLE_ADS: boolean;
}

export interface StoredRecommendation {
  recommendation: Recommendation;
  context: TransactionContext;
  timestamp: number;
}

export interface DomainAllowlist {
  domains: string[];
}




