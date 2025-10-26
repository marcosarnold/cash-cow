// Harmony Checkout Widget - Exact Popup Match
(function() {
  'use strict';

  const cards = [
    { id: "1", name: "Amex Gold", last4: "7997", color: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)" },
    { id: "2", name: "Chase Sapphire Preferred", last4: "1234", color: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)" },
    { id: "3", name: "Discover It", last4: "5678", color: "linear-gradient(135deg, #8B0000 0%, #A0522D 100%)" }
  ];

  const recommendations = {
    'Amazon': { bestIndex: 1, reason: 'Earn 3x points on online shopping', rate: 3 },
    'Uber Eats': { bestIndex: 0, reason: 'Earn 4x points on dining', rate: 4 },
    'DoorDash': { bestIndex: 0, reason: 'Earn 4x points on dining', rate: 4 },
    'Grubhub': { bestIndex: 0, reason: 'Earn 4x points on dining', rate: 4 },
    'Costco': { bestIndex: 0, reason: 'Earn 4x points on groceries', rate: 4 },
    'Walmart': { bestIndex: 0, reason: 'Earn 4x points on groceries', rate: 4 },
    'Shell': { bestIndex: 2, reason: 'Earn 5% cashback on gas', rate: 5 },
    'Chevron': { bestIndex: 2, reason: 'Earn 5% cashback on gas', rate: 5 },
    'Exxon': { bestIndex: 2, reason: 'Earn 5% cashback on gas', rate: 5 }
  };

  function createWidget(merchant, amount) {
    if (document.getElementById('harmony-widget')) return;
    
    const rec = recommendations[merchant] || recommendations['Amazon'];
    let currentIndex = rec.bestIndex;
    
    const widget = document.createElement('div');
    widget.id = 'harmony-widget';
    
    const updateWidget = () => {
      widget.innerHTML = `
        <style>
          @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          #harmony-widget { font-family: 'Inter', system-ui, sans-serif; }
          #harmony-widget * { box-sizing: border-box; }
          .arrow { width: 32px; height: 32px; border-radius: 50%; background: white; border: 2px solid #E2E8F0; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.15); transition: all 0.3s; }
          .arrow:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
        </style>
        
        <div style="
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 400px;
          background: linear-gradient(to bottom, #F7F9FB 0%, #E5E9F0 100%);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          z-index: 9999999;
          animation: slideUp 0.4s ease-out;
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="
            background: #F7F9FB;
            padding: 16px 20px;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);"></div>
              <div style="font-weight: 700; color: #0A2540; font-size: 16px;">Harmony</div>
            </div>
            <button id="harmony-close" style="
              background: transparent;
              border: none;
              color: #64748B;
              font-size: 24px;
              cursor: pointer;
              padding: 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
            ">✕</button>
          </div>
          
          <!-- Body with scroll -->
          <div style="padding: 24px; max-height: 500px; overflow-y: auto;">
            <!-- Purchase Info -->
            <div style="
              background: white;
              border-radius: 12px;
              padding: 24px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              border: 1px solid #E2E8F0;
              margin-bottom: 24px;
            ">
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="
                  width: 48px;
                  height: 48px;
                  border-radius: 12px;
                  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <span style="font-size: 24px; color: #0A2540;">💰</span>
                </div>
                <div style="flex: 1;">
                  <div style="font-size: 13px; color: #64748B; margin-bottom: 4px;">Shopping at</div>
                  <div style="font-size: 16px; color: #0A2540; font-weight: 600;">${merchant}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 13px; color: #64748B; margin-bottom: 4px;">Amount</div>
                  <div style="font-size: 18px; color: #0A2540; font-weight: 700;">${amount ? `$${amount.toFixed(2)}` : 'Checkout'}</div>
                </div>
              </div>
            </div>
            
            <!-- Your Cards Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="font-size: 15px; color: #0A2540; font-weight: 600; margin: 0;">Your Cards</h3>
            </div>
            
            <!-- Card Carousel Container -->
            <div style="position: relative; height: 180px; margin-bottom: 16px;">
              <!-- Left Arrow -->
              <button id="harmony-prev" class="arrow" style="
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
              ">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <!-- Cards -->
              <div style="position: relative; width: 100%; height: 180px;">
                ${cards.map((card, idx) => {
                  const offset = idx - currentIndex;
                  const scale = idx === currentIndex ? 1 : 0.82;
                  const opacity = idx === currentIndex ? 1 : 0.5;
                  const zIndex = idx === currentIndex ? 10 : 5 - Math.abs(offset);
                  
                  return `
                    <div class="harmony-card" data-index="${idx}" style="
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%, -50%) translateX(${offset * 280}px) scale(${scale});
                      width: 280px;
                      height: 160px;
                      border-radius: 14px;
                      opacity: ${opacity};
                      transition: all 0.5s ease;
                      cursor: pointer;
                      z-index: ${zIndex};
                      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
                      background: ${card.color};
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                      padding: 20px;
                    ">
                      <div style="font-size: 12px; opacity: 0.9;">✨ RECOMMENDED</div>
                      <div style="font-size: 20px; font-weight: 700;">${card.name}</div>
                      <div style="font-size: 13px; opacity: 0.9;">**** ${card.last4}</div>
                    </div>
                  `;
                }).join('')}
              </div>
              
              <!-- Right Arrow -->
              <button id="harmony-next" class="arrow" style="
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              ">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <!-- Dots -->
            <div style="display: flex; justify-content: center; gap: 6px; margin-bottom: 24px;">
              ${cards.map((_, idx) => `
                <button class="harmony-dot" data-index="${idx}" style="
                  width: ${idx === currentIndex ? '24px' : '8px'};
                  height: 8px;
                  border-radius: 4px;
                  background: ${idx === currentIndex ? '#F59E0B' : '#CBD5E0'};
                  border: none;
                  cursor: pointer;
                  transition: all 0.3s;
                "></button>
              `).join('')}
            </div>
            
            <!-- Best Card Alert -->
            <div style="
              background: #ECFDF5;
              border: 2px solid #86EFAC;
              border-radius: 12px;
              padding: 20px;
            ">
              <div style="display: flex; gap: 16px;">
                <div style="
                  width: 40px;
                  height: 40px;
                  background: #10B981;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <span style="font-size: 20px;">✨</span>
                </div>
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <h3 style="font-size: 16px; color: #0A2540; font-weight: 700; margin: 0;">Perfect Match!</h3>
                    <span style="
                      padding: 4px 12px;
                      background: #10B981;
                      color: white;
                      border-radius: 12px;
                      font-size: 11px;
                      font-weight: 600;
                    ">BEST CARD</span>
                  </div>
                  <p style="font-size: 14px; color: #065F46; line-height: 1.5; margin: 0 0 12px 0;">
                    <span style="font-weight: 600; color: #0A2540;">${cards[currentIndex].name}</span> ${rec.reason}. Maximize your rewards.
                  </p>
                  <div style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
                    border: 1px solid #86EFAC;
                    border-radius: 10px;
                  ">
                    <span style="font-size: 20px;">📈</span>
                    <span style="font-size: 14px; color: #065F46; font-weight: 700;">
                      +${Math.round(amount * rec.rate)} points
                    </span>
                    <span style="font-size: 12px; color: #065F46; opacity: 0.8;">
                      (~$${(amount * rec.rate / 100).toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
      <!-- Action Button -->
      <button id="harmony-accept" style="
        width: 100%;
        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        color: white;
        border: none;
        padding: 16px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        margin-top: 20px;
        box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
        transition: transform 0.2s;
      ">
        ✨ Accept Recommendation
      </button>
      
      <!-- Footer -->
      <div style="padding: 16px 20px; margin-top: 16px; border-top: 1px solid #E2E8F0;">
        <div style="text-align: center; font-size: 13px; color: #64748B;">
          Press <kbd style="padding: 4px 8px; background: #F1F5F9; border-radius: 4px; border: 1px solid #E2E8F0;">Ctrl+Shift+H</kbd> to open full extension
        </div>
      </div>
          </div>
        </div>
      `;
      
      // Re-attach event listeners
      document.getElementById('harmony-prev').addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        updateWidget();
      });
      
      document.getElementById('harmony-next').addEventListener('click', () => {
        currentIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        updateWidget();
      });
      
      document.getElementById('harmony-close').addEventListener('click', () => {
        widget.remove();
      });
      
      document.getElementById('harmony-accept').addEventListener('click', () => {
        console.log('🎯 User accepted:', cards[currentIndex].name);
        widget.remove();
      });
      
      widget.querySelectorAll('.harmony-dot').forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          currentIndex = idx;
          updateWidget();
        });
      });
      
      widget.querySelectorAll('.harmony-card').forEach((cardEl, idx) => {
        cardEl.addEventListener('click', () => {
          currentIndex = idx;
          updateWidget();
        });
      });
    };
    
    document.body.appendChild(widget);
    updateWidget();
  }

  // Detect checkout and show widget
  setTimeout(() => {
    chrome.storage.local.get(['lastDetectedMerchant', 'lastDetectedAmount'], (result) => {
      if (result.lastDetectedMerchant && result.lastDetectedAmount) {
        createWidget(result.lastDetectedMerchant, result.lastDetectedAmount);
      }
    });
  }, 2000);

})();
