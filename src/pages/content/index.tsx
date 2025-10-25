import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Sparkles, TrendingUp, X, DollarSign } from 'lucide-react';
import { HarmonyLogo } from '../../components/HarmonyLogo';
import { CreditCardDisplay, CreditCardData } from '../../components/CreditCardDisplay';
import { MinimizedWidget } from '../../components/MinimizedWidget';
import { useTheme, getThemeColors } from '../../components/ThemeContext';

// Mock data for demonstration
const mockCards: CreditCardData[] = [
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
];

const mockRecommendation = {
  card: mockCards[0],
  effectiveRate: "4×",
  estimatedValue: "$2.40",
  rationale: [
    "Amex Gold earns 4× points on dining",
    "Maximize rewards for this purchase",
    "240 bonus points earned"
  ]
};

function ContentOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMinimizedWidget, setShowMinimizedWidget] = useState(false);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    // Show overlay after a short delay to simulate detection
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setShowMinimizedWidget(!isMinimized);
  };

  const handleExpand = () => {
    setIsMinimized(false);
    setShowMinimizedWidget(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Minimized Widget */}
      {showMinimizedWidget && (
        <MinimizedWidget 
          onExpand={handleExpand}
          recommendation={mockRecommendation}
        />
      )}

      {/* Main Overlay */}
      <div
        className="harmony-overlay"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999999,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Rounded", system-ui, sans-serif',
          maxWidth: '380px',
          width: '100%',
          display: isMinimized ? 'none' : 'block',
        }}
      >
      {isMinimized ? (
        // Minimized state - just a small floating button
        <button
          onClick={handleMinimize}
          className="harmony-minimized-button"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)`,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <Sparkles size={24} color={theme === 'dark' ? colors.text.primary : '#0A2540'} />
        </button>
      ) : (
        // Full overlay
        <div
          className="harmony-overlay-card"
          style={{
            background: `linear-gradient(to bottom, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${colors.border.default}`,
            animation: 'harmony-slide-in 0.5s ease-out',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <HarmonyLogo size="medium" />
            <div className="flex items-center gap-2">
              <button
                onClick={handleMinimize}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.bg.card }}
              >
                <span style={{ fontSize: '12px', color: colors.text.secondary }}>−</span>
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.bg.card }}
              >
                <X size={16} style={{ color: colors.text.secondary }} />
              </button>
            </div>
          </div>

          {/* Purchase Context */}
          <div 
            className="rounded-xl p-4 mb-5"
            style={{ backgroundColor: colors.bg.card, border: `1px solid ${colors.border.default}` }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)` }}
              >
                <DollarSign size={18} style={{ color: theme === 'dark' ? colors.text.primary : '#0A2540' }} />
              </div>
              <div className="flex-1">
                <div style={{ fontSize: '12px', color: colors.text.secondary, marginBottom: '2px' }}>Shopping at</div>
                <div style={{ fontSize: '14px', color: colors.text.primary, fontWeight: 600 }}>Chipotle</div>
              </div>
              <div className="text-right">
                <div style={{ fontSize: '12px', color: colors.text.secondary, marginBottom: '2px' }}>Amount</div>
                <div style={{ fontSize: '16px', color: colors.text.primary, fontWeight: 700 }}>$60.00</div>
              </div>
            </div>
          </div>

          {/* Card Display */}
          <div className="mb-5">
            <CreditCardDisplay card={mockRecommendation.card} />
          </div>

          {/* Recommendation */}
          <div 
            className="rounded-xl p-4 mb-5"
            style={{ 
              background: colors.success.bg, 
              border: `2px solid ${colors.success.border}`,
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: colors.success.icon }}
              >
                <Sparkles size={16} style={{ color: 'white' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 style={{ fontSize: '14px', color: theme === 'dark' ? colors.text.primary : '#0A2540', fontWeight: 700 }}>
                    Perfect Match!
                  </h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: colors.success.badge, color: colors.success.badgeText, fontWeight: 600 }}
                  >
                    BEST CARD
                  </span>
                </div>
                <div 
                  className="px-3 py-2 rounded-lg inline-flex items-center gap-2"
                  style={{ background: theme === 'dark' ? colors.success.badge : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', border: `1px solid ${colors.success.border}` }}
                >
                  <TrendingUp size={14} style={{ color: colors.success.badgeText }} />
                  <span style={{ fontSize: '13px', color: colors.success.badgeText, fontWeight: 700 }}>
                    +240 points
                  </span>
                  <span style={{ fontSize: '11px', color: colors.success.badgeText, opacity: 0.8 }}>
                    (~$2.40)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)`,
                color: theme === 'dark' ? colors.text.primary : '#0A2540',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              }}
            >
              Use This Card
            </button>
            <button
              className="px-4 py-3 rounded-xl font-medium text-sm transition-colors"
              style={{
                backgroundColor: colors.bg.card,
                color: colors.text.secondary,
                border: `1px solid ${colors.border.default}`,
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes harmony-slide-in {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .harmony-overlay * {
            box-sizing: border-box;
          }
          
          .harmony-minimized-button:hover {
            transform: scale(1.1);
          }
        `}
      </style>
      </div>
    </>
  );
}

// Initialize the overlay
function initOverlay() {
  // Check if overlay already exists
  if (document.querySelector('.harmony-overlay')) {
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'harmony-overlay-container';
  document.body.appendChild(container);

  // Render React component
  const root = ReactDOM.createRoot(container);
  root.render(<ContentOverlay />);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOverlay);
} else {
  initOverlay();
}
