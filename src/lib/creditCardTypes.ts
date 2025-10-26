// Type definitions for credit card rewards data

export interface SignUpBonus {
  bonus_miles?: number;
  bonus_points?: number;
  amount?: number | string;
  spending_requirement?: number | string;
  time_frame?: string;
  details?: string;
  conditions?: string;
}

export interface RewardsProgram {
  base_rewards?: string;
  bonus_rewards?: string;
  points_per_dollar?: {
    flights?: string;
    hotels?: string;
    other_travel?: string;
    other_purchases?: string;
  };
  cash_back_percentages?: {
    grocery_stores?: string;
    dining?: string;
    entertainment?: string;
    streaming_services?: string;
    other_purchases?: string;
    [key: string]: string | undefined;
  };
  general_rewards?: string;
  travel_rewards?: {
    hotels_and_rental_cars?: string;
    flights_and_vacation_rentals?: string;
  };
  anniversary_bonus?: {
    miles?: number;
    description?: string;
  };
}

export interface CreditCardData {
  cardName: string;
  card_name: string;
  issuing_bank: string;
  sign_up_bonus?: SignUpBonus;
  sign_up_bonus_details?: any;
  annual_fee: string | number;
  apr: {
    variable_rate?: string;
    introductory_apr?: string | {
      duration?: string;
      applicable_to?: string;
      purchases?: string;
      balance_transfers?: string;
    };
    purchase_rate?: string;
    post_introductory_apr?: string;
    standard_apr?: string | string[];
    standard_rate?: {
      range?: string[];
      type?: string;
    };
    [key: string]: any;
  };
  rewards_program?: RewardsProgram;
  rewards_program_details?: any;
  cash_back_percentages?: string | { [key: string]: string } | null;
  special_offers?: any;
  special_offers_or_promotions?: any;
  balance_transfer_offers?: any;
  introductory_apr_periods?: any;
  foreign_transaction_fees: string | number;
  credit_score_requirements: string;
  key_benefits?: string[];
  key_benefits_and_perks?: string[];
  key_benefits_and_perks_list?: string[];
}

export interface CreditCardRewardsJSON {
  metadata: {
    timestamp: string;
    executionTimeMs: number;
    cardsRequested: number;
    cardsProcessed: number;
    totalToolCallsCount: number;
    parallelExecution: boolean;
  };
  offers: CreditCardData[];
}





