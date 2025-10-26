// Checkout Banner - Rakuten/Honey style notification
(function() {
  'use strict';

  const MERCHANT_NAMES = {
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

  const CATEGORY_MAP = {
    'Amazon': { card: 'Chase Sapphire Preferred', reward: '3x points', category: 'online' },
    'Uber Eats': { card: 'Amex Gold', reward: '4x points', category: 'dining' },
    'DoorDash': { card: 'Amex Gold', reward: '4x points', category: 'dining' },
    'Grubhub': { card: 'Amex Gold', reward: '4x points', category: 'dining' },
    'Costco': { card: 'Amex Gold', reward: '4x points', category: 'groceries' },
    'Walmart': { card: 'Amex Gold', reward: '4x points', category: 'groceries' },
    'Shell': { card: 'Discover It', reward: '5% cashback', category: 'gas' },
    'Chevron': { card: 'Discover It', reward: '5% cashback', category: 'gas' },
    'Exxon': { card: 'Discover It', reward: '5% cashback', category: 'gas' },
  };

  setTimeout(() => {
    const hostname = window.location.hostname.toLowerCase().replace(/^www\./, '');
    const merchantName = MERCHANT_NAMES[hostname];
    
    if (!merchantName) return;

    chrome.storage.local.get(['lastDetectedAmount'], (result) => {
      const amount = result.lastDetectedAmount || null;
      const info = CATEGORY_MAP[merchantName] || { card: 'Amex Gold', reward: '1x points', category: 'general' };

      // Create banner HTML
      const banner = document.createElement('div');
      banner.id = 'harmony-checkout-banner';
      banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999999;
        background: linear-gradient(135deg, #0A2540 0%, #1a3a52 100%);
        color: #F7F9FB;
        padding: 14px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        font-family: Inter, system-ui, sans-serif;
        animation: slideDown 0.3s ease-out;
      `;

      banner.innerHTML = `
        <style>
          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          #harmony-checkout-banner button {
            cursor: pointer;
            transition: all 0.2s;
          }
          #harmony-checkout-banner button:hover {
            transform: scale(1.05);
          }
        </style>
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            border-radius: 10px;
            padding: 8px;
            display: flex;
            align-items: center;
            font-size: 20px;
          ">✨</div>
          <div>
            <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">
              Use ${info.card} for ${merchantName}
            </div>
            <div style="font-size: 12px; opacity: 0.85;">
              Earn ${info.reward} • ${amount ? `$${amount.toFixed(2)} purchase` : 'Checkout detected'}
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button id="harmony-view-details" style="
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            color: #0A2540;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
          ">View Details</button>
          <button id="harmony-close-banner" style="
            background: transparent;
            border: none;
            font-size: 20px;
            line-height: 1;
            opacity: 0.8;
          ">✕</button>
        </div>
      `;

      document.body.appendChild(banner);
      document.body.style.marginTop = '60px'; // Add space for banner

      // Event handlers
      document.getElementById('harmony-view-details')?.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
      });

      document.getElementById('harmony-close-banner')?.addEventListener('click', () => {
        banner.remove();
        document.body.style.marginTop = '';
      });
    });
  }, 2500);
})();




