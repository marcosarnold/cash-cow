import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Sparkles, X } from 'lucide-react';

interface CheckoutBannerProps {
  merchantName: string;
  amount: number | null;
  bestCard: string;
  reward: string;
}

function CheckoutBanner({ merchantName, amount, bestCard, reward }: CheckoutBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        backgroundColor: '#0A2540',
        color: '#F7F9FB',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          borderRadius: '8px',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Sparkles size={18} color="#0A2540" />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '2px' }}>
            Use {bestCard} at {merchantName}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Earn {reward} • {amount ? `$${amount.toFixed(2)} transaction` : 'Checkout detected'}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => chrome.runtime.sendMessage({ type: 'OPEN_POPUP' })}
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#0A2540',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          View Details
        </button>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={18} color="#F7F9FB" />
        </button>
      </div>
    </div>
  );
}

function initCheckoutBanner() {
  // Check if we're on a checkout page
  const hostname = window.location.hostname.toLowerCase().replace(/^www\./, '');
  
  const supportedMerchants = [
    'amazon.com',
    'ubereats.com',
    'doordash.com',
    'grubhub.com',
    'costco.com',
    'walmart.com',
    'shell.com',
    'chevron.com',
    'exxon.com'
  ];

  if (!supportedMerchants.includes(hostname)) return;

  const merchantNames: Record<string, string> = {
    'amazon.com': 'Amazon',
    'ubereats.com': 'Uber Eats',
    'doordash.com': 'DoorDash',
    'grubhub.com': 'Grubhub',
    'costco.com': 'Costco',
    'walmart.com': 'Walmart',
    'shell.com': 'Shell',
    'chevron.com': 'Chevron',
    'exxon.com': 'Exxon',
  };

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

  // Wait for page to load
  setTimeout(() => {
    chrome.storage.local.get(['lastDetectedAmount'], (result) => {
      const amount = result.lastDetectedAmount || null;
      const merchantName = merchantNames[hostname] || hostname;
      const category = categoryMap[merchantName] || 'general';
      
      // Determine best card
      let bestCard = 'Amex Gold';
      let reward = '4x points';
      
      if (category === 'dining' || category === 'groceries') {
        bestCard = 'Amex Gold';
        reward = '4x points';
      } else if (category === 'online') {
        bestCard = 'Chase Sapphire Preferred';
        reward = '3x points';
      } else if (category === 'gas') {
        bestCard = 'Discover It';
        reward = '5% cashback';
      }

      // Create banner container
      const bannerContainer = document.createElement('div');
      bannerContainer.id = 'harmony-checkout-banner';
      document.body.appendChild(bannerContainer);

      // Render banner
      const root = ReactDOM.createRoot(bannerContainer);
      root.render(
        <CheckoutBanner 
          merchantName={merchantName}
          amount={amount}
          bestCard={bestCard}
          reward={reward}
        />
      );
    });
  }, 2000);
}

initCheckoutBanner();

