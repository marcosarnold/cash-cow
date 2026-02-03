import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Sparkles, TrendingUp, X, DollarSign } from 'lucide-react';
import { CashCowLogo } from '../../components/ui/CashCowLogo';
import { CreditCardDisplay, CreditCardData } from '../../components/cards/CreditCardDisplay';
import { MinimizedWidget } from '../../components/ui/MinimizedWidget';
import { ThemeProvider, useTheme, getThemeColors } from '../../components/ui/ThemeContext';
import { getTransactionContext } from './merchant/detect';
import { CARDS } from '../../lib/rewards/rules';
import { recommend } from '../../lib/rewards/engine';

// Convert our Card type to CreditCardData for display
function convertToDisplayCard(card: any): CreditCardData {
  return {
    id: card.id,
    name: card.displayName,
    type: card.network,
    last4: "0000",
    color: getCardColor(card.network),
    rewardType: "Points",
    network: card.network.toLowerCase() as any,
  };
}

function getCardColor(network: string): string {
  const colors: Record<string, string> = {
    'Amex': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
    'Visa': 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
    'Mastercard': 'linear-gradient(135deg, #EB001B 0%, #FF5F00 100%)',
    'Discover': 'linear-gradient(135deg, #8B0000 0%, #A0522D 100%)',
  };
  return colors[network] || 'linear-gradient(135deg, #2E5266 0%, #1A3A4A 100%)';
}

// Wrapped with ThemeProvider
function ContentOverlay() {
  return (
    <ThemeProvider>
      <ContentOverlayInner />
    </ThemeProvider>
  );
}

function ContentOverlayInner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMinimizedWidget, setShowMinimizedWidget] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [transaction, setTransaction] = useState<any>(null);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    // Get transaction context from the page
    const transactionCtx = getTransactionContext();
    
    if (transactionCtx) {
      console.log('Cash Cow: Transaction detected', transactionCtx);
      
      // Get recommendation using the real engine
      try {
        const rec = recommend(transactionCtx, CARDS, []);
        console.log('Cash Cow: Recommendation generated', rec);
        
        setTransaction(transactionCtx);
        setRecommendation({
          card: convertToDisplayCard(rec.card),
          effectiveRate: `${(rec.effectiveRate * 100).toFixed(1)}%`,
          estimatedValue: `$${rec.estimatedValue.toFixed(2)}`,
          rationale: rec.rationale,
        });
        setIsVisible(true);
      } catch (error) {
        console.error('Cash Cow: Error generating recommendation', error);
        setIsVisible(false);
      }
    } else {
      // No transaction detected - don't show overlay
      console.log('Cash Cow: No transaction detected on this page');
      setIsVisible(false);
    }
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

  if (!isVisible || !recommendation) return null;

  return (
    <>
      {/* Minimized Widget */}
      {showMinimizedWidget && (
        <MinimizedWidget 
          onExpand={handleExpand}
          recommendation={recommendation}
        />
      )}

      {/* Main Overlay */}
      <div
        className="cashcow-overlay"
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
          className="cashcow-minimized-button"
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
          className="cashcow-overlay-card"
          style={{
            background: `linear-gradient(to bottom, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${colors.border.default}`,
            animation: 'cashcow-slide-in 0.5s ease-out',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <CashCowLogo size="medium" variant="icon-only" />
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
                <div style={{ fontSize: '14px', color: colors.text.primary, fontWeight: 600 }}>{transaction?.merchantName || 'Unknown Merchant'}</div>
              </div>
              <div className="text-right">
                <div style={{ fontSize: '12px', color: colors.text.secondary, marginBottom: '2px' }}>Amount</div>
                <div style={{ fontSize: '16px', color: colors.text.primary, fontWeight: 700 }}>{
                  transaction?.amount && transaction.amount > 0 
                    ? `$${transaction.amount.toFixed(2)}` 
                    : 'Check page'
                }</div>
              </div>
            </div>
          </div>

          {/* Card Display */}
          <div className="mb-5">
            <CreditCardDisplay card={recommendation.card} />
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
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
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
          @keyframes cashcow-slide-in {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .cashcow-overlay * {
            box-sizing: border-box;
          }
          
          .cashcow-minimized-button:hover {
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
  if (document.querySelector('.cashcow-overlay')) {
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'cashcow-overlay-container';
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
