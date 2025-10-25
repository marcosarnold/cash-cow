import { Settings, TrendingUp, X, Sparkles, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { HarmonyLogo } from "./HarmonyLogo";
import { CardCarousel } from "./CardCarousel";
import { CreditCardData } from "./CreditCardDisplay";
import { useTheme, getThemeColors } from "./ThemeContext";

interface MainPopupProps {
  onNavigate: (screen: string) => void;
}

const sampleCards: CreditCardData[] = [
  {
    id: "1",
    name: "Amex Gold",
    type: "American Express",
    last4: "1004",
    color: "linear-gradient(135deg, #2E5266 0%, #1A3A4A 100%)",
    rewardType: "Points",
    network: "amex",
  },
  {
    id: "2",
    name: "Chase Sapphire",
    type: "Chase",
    last4: "5678",
    color: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
    rewardType: "Points",
    network: "visa",
  },
  {
    id: "3",
    name: "Discover It",
    type: "Discover",
    last4: "9012",
    color: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    rewardType: "Cashback",
    network: "discover",
  },
];

const optimalCardIndex = 0; // Amex Gold is optimal
const optimalReason = "Amex Gold earns 4× points on dining and restaurants. Use this card to maximize your rewards.";
const nonOptimalReasons = {
  "2": "Chase Sapphire only earns 2× points on dining, compared to Amex Gold's 4× points. You'd miss out on 120 bonus points (~$1.20).",
  "3": "Discover It only earns 1% cashback on dining, while Amex Gold earns 4× points (~4% back). You'd miss out on ~$1.80 in rewards.",
};

export function MainPopup({ onNavigate }: MainPopupProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const colors = getThemeColors(theme);
  
  const handleClose = () => {
    // In a real Chrome extension, this would close the popup
    window.close();
  };

  const isOptimal = currentCardIndex === optimalCardIndex;

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: `linear-gradient(to bottom, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)` }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shadow-sm border-b flex-shrink-0" style={{ backgroundColor: colors.bg.card, borderColor: colors.border.default }}>
        <HarmonyLogo size="medium" />
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full hover:scale-105 flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: theme === 'dark' ? colors.bg.elevated : colors.bg.primary }}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" style={{ color: colors.text.primary }} />
            ) : (
              <Sun className="w-5 h-5" style={{ color: colors.accent.gold }} />
            )}
          </button>
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
            {/* <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)` }}
            >
              <DollarSign className="w-6 h-6" style={{ color: theme === 'dark' ? colors.text.primary : '#0A2540' }} />
            </div> */}
            <div className="flex-1">
              <div style={{ fontSize: '13px', color: colors.text.secondary, marginBottom: '3px' }}>Shopping at</div>
              <div style={{ fontSize: '16px', color: colors.text.primary, fontWeight: 600 }}>Chipotle</div>
            </div>
            <div className="text-right">
              <div style={{ fontSize: '13px', color: colors.text.secondary, marginBottom: '3px' }}>Amount</div>
              <div style={{ fontSize: '18px', color: colors.text.primary, fontWeight: 700 }}>$60.00</div>
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
            cards={sampleCards}
            optimalCardIndex={optimalCardIndex}
            optimalReason={optimalReason}
            nonOptimalReasons={nonOptimalReasons}
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
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
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
                  <span style={{ fontWeight: 600, color: theme === 'dark' ? colors.text.primary : '#0A2540' }}>Amex Gold</span> earns 4× points on dining. Maximize your rewards.
                </p>
                <div 
                  className="px-4 py-3 rounded-xl inline-flex items-center gap-3"
                  style={{ background: theme === 'dark' ? colors.success.badge : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', border: `1px solid ${colors.success.border}` }}
                >
                  <TrendingUp className="w-5 h-5" style={{ color: colors.success.badgeText }} />
                  <span style={{ fontSize: '14px', color: colors.success.badgeText, fontWeight: 700 }}>
                    +240 points
                  </span>
                  <span style={{ fontSize: '12px', color: colors.success.badgeText, opacity: 0.8 }}>
                    (~$2.40)
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
      <div className="px-5 py-4 border-t flex-shrink-0" style={{ backgroundColor: colors.bg.card, borderColor: colors.border.default }}>
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