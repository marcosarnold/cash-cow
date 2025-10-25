import React, { useState } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, Moon, Settings, X, TrendingUp } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  lastFour: string;
  network: string;
  color: string;
  multiplier: number;
  category: string;
}

interface Transaction {
  merchant: string;
  amount: number;
  category: string;
}

const mockCards: Card[] = [
  {
    id: '1',
    name: 'AMEX GOLD',
    lastFour: '1004',
    network: 'AMEX',
    color: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    multiplier: 4,
    category: 'dining'
  },
  {
    id: '2',
    name: 'CHASE FREEDOM',
    lastFour: '1234',
    network: 'VISA',
    color: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    multiplier: 1.5,
    category: 'general'
  },
  {
    id: '3',
    name: 'CITI CUSTOM',
    lastFour: '5678',
    network: 'MASTERCARD',
    color: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
    multiplier: 5,
    category: 'groceries'
  }
];

const mockTransaction: Transaction = {
  merchant: 'Chipotle',
  amount: 60.00,
  category: 'dining'
};

const App: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const currentCard = mockCards[currentCardIndex];
  const isPerfectMatch = currentCard.category === mockTransaction.category;

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % mockCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + mockCards.length) % mockCards.length);
  };

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>H</span>
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Harmony</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <Moon size={16} color="#6b7280" />
          </button>
          <button 
            style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} color="#6b7280" />
          </button>
          <button style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>
      </div>

      {/* Transaction Card */}
      <div style={{ padding: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fed7aa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#ea580c', fontWeight: 'bold', fontSize: '18px' }}>$</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Shopping at</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>{mockTransaction.merchant}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Amount</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>${mockTransaction.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Cards Section */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>Your Cards</h3>
          <button style={{ color: '#f97316', fontSize: '14px', fontWeight: '500', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            Manage
          </button>
        </div>
      </div>

      {/* Card Carousel */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ position: 'relative' }}>
          {/* Navigation Arrows */}
          <button 
            onClick={prevCard}
            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            <ChevronLeft size={16} color="#6b7280" />
          </button>
          <button 
            onClick={nextCard}
            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            <ChevronRight size={16} color="#6b7280" />
          </button>

          {/* Credit Card */}
          <div style={{ background: currentCard.color, borderRadius: '12px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            {/* Card Chip */}
            <div style={{ width: '32px', height: '24px', backgroundColor: '#fbbf24', borderRadius: '4px', marginBottom: '16px' }}></div>
            
            {/* Card Number */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>•••• •••• •••• {currentCard.lastFour}</div>
            </div>
            
            {/* Cardholder Name */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{currentCard.name}</div>
            </div>
            
            {/* Network Logo */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', fontWeight: 'bold', opacity: 0.8 }}>
              {currentCard.network}
            </div>
            
            {/* Points Button */}
            <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
              <button style={{ backgroundColor: 'rgba(107, 114, 128, 0.5)', color: 'white', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
                POINTS
              </button>
            </div>
          </div>

          {/* Card Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {mockCards.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index === currentCardIndex ? '#f97316' : '#d1d5db'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Perfect Match Recommendation */}
      {isPerfectMatch && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontSize: '14px' }}>✨</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold', color: '#166534' }}>Perfect Match!</span>
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
                    BEST CARD
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>
                  {currentCard.name} earns {currentCard.multiplier}x points on {mockTransaction.category}. 
                  Maximize your rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Dashboard Link */}
      <div style={{ padding: '0 16px 16px' }}>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
          <TrendingUp size={16} color="#f97316" />
          <span style={{ color: '#374151', fontWeight: '500' }}>View rewards dashboard</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '320px', maxHeight: '384px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Settings</h2>
              <button 
                onClick={() => setShowSettings(false)}
                style={{ color: '#6b7280', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={20} color="#6b7280" />
                    <span style={{ fontWeight: '500' }}>Manage Cards</span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '12px' }}>⭐</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>Reward Preferences</span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'white' }}>🛡</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>Account & Privacy</span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'white' }}>→</span>
                  </div>
                  <span style={{ fontWeight: '500', color: '#dc2626' }}>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;