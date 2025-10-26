import { Settings, TrendingUp, X, Sparkles, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { HarmonyLogo } from "./HarmonyLogo";
import { CardCarousel } from "./CardCarousel";
import { CreditCardData } from "./CreditCardDisplay";
import { useTheme, getThemeColors } from "./ThemeContext";
import { TransactionContext } from "../lib/types";

interface MainPopupProps {
  onNavigate: (screen: string) => void;
  tabInfo?: { merchantName: string; amount: string; category?: string } | null;
}

// YOUR ACTUAL CARDS - Real data!
const sampleCards: CreditCardData[] = [
  {
    id: "1",
    name: "Amex Gold",
    type: "American Express",
    last4: "7997",
    color: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
    rewardType: "Points",
    network: "amex",
  },
  {
    id: "2",
    name: "Chase Sapphire Preferred",
    type: "Chase",
    last4: "1234",
    color: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
    rewardType: "Points",
    network: "visa",
  },
  {
    id: "3",
    name: "Discover It",
    type: "Discover",
    last4: "5678",
    color: "linear-gradient(135deg, #8B0000 0%, #A0522D 100%)",
    rewardType: "Cashback",
    network: "discover",
  },
];

// Calculate best card and order cards by reward maximization
function getBestCardForCategory(
  category: string | null, 
  amount: number
): { index: number; reason: string; nonOptimal: Record<string, string>; orderedCards: CreditCardData[] } {
  if (!category) category = 'general';

  // REWARD RATES - Your actual cards with real categories!
  const cardRewards: Record<string, Record<string, number>> = {
    'Amex Gold': {
      dining: 4,      // BEST for dining!
      groceries: 4,   // BEST for groceries!
      travel: 3,      // Good for travel
      online: 1,      // Not great for online
      gas: 1,         // Not great for gas
      general: 1,     // Base rate
    },
    'Chase Sapphire Preferred': {
      dining: 3,      // Good for dining
      travel: 2,      // Good for travel
      online: 3,      // BEST for online! (unique bonus)
      groceries: 1,  // Not great for groceries
      gas: 1,         // Not great for gas
      general: 1,     // Base rate
    },
    'Discover It': {
      dining: 1,      // Base
      groceries: 1, // Base
      travel: 1,      // Base
      online: 1,      // Base
      gas: 5,         // BEST if in rotating category!
      general: 1,     // Base rate
    },
  };

  // Calculate rewards for each card WITH expected value calculation
  const cardCalculations: Array<{ 
    card: CreditCardData; 
    index: number; 
    rate: number; 
    expectedValue: number;
    name: string;
    reason: string;
  }> = [];

  console.log(`🔢 Calculating rewards for category: ${category}, amount: ${amount}`);
  
  sampleCards.forEach((card, index) => {
    const rate = cardRewards[card.name]?.[category] || 1;
    const expectedValue = amount * rate; // Total points expected
    
    console.log(`  💳 ${card.name}: ${rate}× on ${category} = ${expectedValue.toFixed(0)} points`);
    
    let reason = '';
    if (rate > 1) {
      reason = `Earns ${rate}× points on ${category} = ${expectedValue.toFixed(0)} points`;
    } else {
      reason = `Earns ${rate}× points (base rate) = ${expectedValue.toFixed(0)} points`;
    }
    
    cardCalculations.push({ 
      card, 
      index, 
      rate, 
      expectedValue, 
      name: card.name, 
      reason 
    });
  });

  // Sort cards by expected value (highest first)
  cardCalculations.sort((a, b) => b.expectedValue - a.expectedValue);

  // Find best card (now at index 0 after sorting)
  const bestCard = cardCalculations[0];

  // Create ordered cards array for carousel (best card is first)
  const orderedCards = cardCalculations.map(calc => calc.card);

  // Create nonOptimal reasons for cards (indexed by their NEW position in orderedCards)
  const nonOptimal: Record<string, string> = {};
  cardCalculations.forEach((calc, newIndex) => {
    if (newIndex !== 0) { // Skip the best card (index 0)
      nonOptimal[newIndex.toString()] = calc.reason;
    }
  });

  console.log(`📊 Category: ${category} → Best: ${bestCard.name} (${bestCard.rate}×) = ${bestCard.expectedValue.toFixed(0)} points`);
  console.log(`📊 Ordered by rewards:`, cardCalculations.map(c => `${c.name}: ${c.expectedValue.toFixed(0)} pts`));

  return { 
    index: 0, // Best card is always at index 0 after ordering
    reason: bestCard.reason, 
    nonOptimal,
    orderedCards 
  };
}

const categoryMap: Record<string, string> = {
  'Amazon': 'online',
  'Uber Eats': 'dining',
  'DoorDash': 'dining',
  'Grubhub': 'dining',
  'Costco': 'groceries',
  'Walmart': 'groceries',
  'Shell': 'gas',
  'Chevron': 'gas',
  'Exxon': 'gas',
};

export function MainPopup({ onNavigate, tabInfo }: MainPopupProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transactionContext, setTransactionContext] = useState<TransactionContext | null>(null);
  const [bestCard, setBestCard] = useState({ index: 0, reason: '', nonOptimal: {} as Record<string, string>, orderedCards: sampleCards });
  const [displayCards, setDisplayCards] = useState(sampleCards);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  // Calculate best card based on current merchant (using AI or fallback)
  useEffect(() => {
    if (tabInfo?.merchantName) {
      // Use AI category if available, otherwise use category map
      const category = tabInfo.category || categoryMap[tabInfo.merchantName] || 'general';
      const amount = transactionContext?.amount || parseFloat(tabInfo.amount?.replace('$', '') || '0') || 50;
      
      console.log('🔍 === RECOMMENDATION DEBUG ===');
      console.log('🏪 Merchant:', tabInfo.merchantName);
      console.log('📂 Category (from AI):', tabInfo.category);
      console.log('📂 Category (fallback):', categoryMap[tabInfo.merchantName]);
      console.log('📂 Final Category:', category);
      console.log('💰 Amount:', amount);
      
      const recommendation = getBestCardForCategory(category, amount);
      console.log('🎯 Best card:', recommendation.orderedCards[0].name);
      console.log('📝 Reason:', recommendation.reason);
      console.log('📊 Ordered cards:', recommendation.orderedCards.map(c => c.name).join(' → '));
      console.log('================================');
      
      setBestCard(recommendation);
      setDisplayCards(recommendation.orderedCards);
      setCurrentCardIndex(0); // Best card is always at index 0 in ordered cards
    }
  }, [tabInfo, transactionContext]);
  
  // Fetch transaction context from Chrome storage
  useEffect(() => {
    const fetchTransactionContext = async () => {
      try {
        // Check if we're in a Chrome extension environment
        if (typeof chrome !== 'undefined' && chrome.storage) {
          const result = await chrome.storage.local.get(['lastContext']);
          if (result.lastContext) {
            setTransactionContext(result.lastContext);
          }
        }
      } catch (error) {
        console.error('Failed to fetch transaction context:', error);
      }
    };
    
    fetchTransactionContext();
  }, []);
  
  const handleClose = () => {
    // In a real Chrome extension, this would close the popup
    window.close();
  };

  const isOptimal = currentCardIndex === bestCard.index;

  return (
    <div className="h-full flex flex-col overflow-hidden rounded-lg" style={{ background: `linear-gradient(to bottom, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`, borderRadius: '12px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shadow-sm border-b shrink-0" style={{ backgroundColor: colors.bg.card, borderColor: colors.border.default }}>
        <HarmonyLogo size="medium" variant="icon-only" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("settings")}
            className="w-10 h-10 rounded-full hover:scale-105 flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: theme === 'dark' ? colors.bg.elevated : colors.bg.primary }}
          >
            <Settings className="w-5 h-5" style={{ color: colors.text.primary }} />
          </button>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:scale-105 flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: theme === 'dark' ? colors.bg.elevated : colors.bg.primary }}
          >
            <X className="w-5 h-5" style={{ color: colors.text.primary }} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {/* Current Purchase Context */}
        <div 
          className="rounded-xl p-6 shadow-sm border"
          style={{ backgroundColor: colors.bg.card, borderColor: colors.border.default }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)` }}
            >
              <DollarSign className="w-6 h-6" style={{ color: theme === 'dark' ? colors.text.primary : '#0A2540' }} />
            </div>
            <div className="flex-1">
              <div style={{ fontSize: '13px', color: colors.text.secondary, marginBottom: '3px' }}>Shopping at</div>
              <div style={{ fontSize: '16px', color: colors.text.primary, fontWeight: 600 }}>{tabInfo?.merchantName || transactionContext?.merchantName || 'Unknown Merchant'}</div>
            </div>
            <div className="text-right">
              <div style={{ fontSize: '13px', color: colors.text.secondary, marginBottom: '3px' }}>Amount</div>
              <div style={{ fontSize: '18px', color: colors.text.primary, fontWeight: 700 }}>{
                transactionContext?.amount && transactionContext.amount > 0 
                  ? `$${transactionContext.amount.toFixed(2)}` 
                  : tabInfo?.amount || 'Check page'
              }</div>
            </div>
          </div>
        </div>

        {/* Card Carousel */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '15px', color: colors.text.primary, fontWeight: 600 }}>
              Your Cards
            </h3>
            <button 
              onClick={() => onNavigate("manage-cards")}
              className="text-sm hover:underline transition-colors"
              style={{ color: colors.accent.gold, fontWeight: 600 }}
            >
              Manage
            </button>
          </div>
          <CardCarousel 
            cards={displayCards}
            optimalCardIndex={bestCard.index}
            optimalReason={bestCard.reason}
            nonOptimalReasons={bestCard.nonOptimal}
            onCardChange={setCurrentCardIndex}
          />
        </div>

        {/* Best Card Recommendation - Only show when optimal card is selected */}
        {isOptimal && (
          <div 
            className="rounded-xl p-5 shadow-lg border-2"
            style={{ 
              background: colors.success.bg, 
              borderColor: colors.success.border 
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: colors.success.icon }}
              >
                <Sparkles className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 style={{ fontSize: '16px', color: theme === 'dark' ? colors.text.primary : '#0A2540', fontWeight: 700 }}>
                    Perfect Match!
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: colors.success.badge, color: colors.success.badgeText, fontWeight: 600 }}>
                    BEST CARD
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: colors.success.text, lineHeight: '1.5', marginBottom: '12px' }}>
                  {bestCard.reason}. Maximize your rewards.
                </p>
                <div 
                  className="px-4 py-3 rounded-xl inline-flex items-center gap-3"
                  style={{ background: theme === 'dark' ? colors.success.badge : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', border: `1px solid ${colors.success.border}` }}
                >
                  <TrendingUp className="w-5 h-5" style={{ color: colors.success.badgeText }} />
                  <span style={{ fontSize: '14px', color: colors.success.badgeText, fontWeight: 700 }}>
                    {tabInfo && tabInfo.amount && tabInfo.amount !== 'Check page' ? `+${(parseFloat(tabInfo.amount.replace('$', '')) || transactionContext?.amount || 0).toFixed(0)} points` : 'Maximize rewards'}
                  </span>
                  <span style={{ fontSize: '12px', color: colors.success.badgeText, opacity: 0.8 }}>
                    {tabInfo && tabInfo.amount && tabInfo.amount !== 'Check page' ? `($${((parseFloat(tabInfo.amount.replace('$', '')) || transactionContext?.amount || 0) / 100).toFixed(2)})` : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accept Button */}
        <button
          className="py-4 px-10 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto block group relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)`,
            color: theme === 'dark' ? colors.text.primary : '#0A2540',
            fontWeight: 700,
            fontSize: '15px',
          }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="relative flex items-center gap-3">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Accept Recommendation
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t shrink-0" style={{ backgroundColor: colors.bg.card, borderColor: colors.border.default }}>
        <button
          onClick={() => onNavigate("dashboard")}
          className="w-full text-center hover:underline transition-all group flex items-center justify-center gap-3"
          style={{ color: colors.accent.gold, fontSize: '14px', fontWeight: 600 }}
        >
          <TrendingUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" style={{ color: colors.accent.gold }} />
          View rewards dashboard
        </button>
      </div>
    </div>
  );
}