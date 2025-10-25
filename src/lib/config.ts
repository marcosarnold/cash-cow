import { FeatureFlags } from "./types";

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  USE_MOCK_DATA: true,
  ENABLE_FETCH_AGENT: false,
  ENABLE_ADS: false
};

export const DEMO_DOMAINS = [
  "amazon.com",
  "ubereats.com",
  "doordash.com",
  "grubhub.com",
  "costco.com",
  "walmart.com",
  "shell.com",
  "chevron.com",
  "exxon.com"
];

export const MERCHANT_MAP: Record<string, string> = {
  "amazon.com": "amazon",
  "ubereats.com": "ubereats",
  "doordash.com": "doordash",
  "grubhub.com": "grubhub",
  "costco.com": "costco",
  "walmart.com": "walmart",
  "shell.com": "shell",
  "chevron.com": "chevron",
  "exxon.com": "exxon"
};

export const CATEGORY_MAP: Record<string, string> = {
  "ubereats": "dining",
  "doordash": "dining",
  "grubhub": "dining",
  "amazon": "online",
  "walmart": "online",
  "costco": "groceries",
  "shell": "gas",
  "chevron": "gas",
  "exxon": "gas"
};
