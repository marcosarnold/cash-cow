import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { TransactionContext, Recommendation } from "../../lib/types";
import { getTransactionContext } from "./merchant/detect";
import { recommend } from "../../lib/rewards/engine";
import { CARDS, PROMOS } from "../../lib/rewards/rules";
import { setLastRecommendation } from "../../lib/storage";
import { sendMessage } from "../../lib/bus";

interface OverlayProps {
  context: TransactionContext;
  recommendation: Recommendation;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ context, recommendation, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNotYourCard = () => {
    sendMessage({ type: "HARMONY_EVAL" });
  };

  return (
    <div className="harmony-overlay">
      <div className="harmony-card">
        <div className="harmony-header">
          <h3 className="harmony-title">Best Card for This Purchase</h3>
          <button className="harmony-close" onClick={onClose}>×</button>
        </div>
        
        <div className="harmony-content">
          <div className="harmony-merchant">
            <strong>{context.merchantName}</strong>
            <span className="harmony-amount">${context.amount.toFixed(2)}</span>
          </div>
          
          <div className="harmony-card-info">
            <div className="harmony-card-name">{recommendation.card.displayName}</div>
            <div className="harmony-rate">
              {(recommendation.effectiveRate * 100).toFixed(1)}% back
            </div>
            <div className="harmony-value">
              Est. ${recommendation.estimatedValue.toFixed(2)} rewards
            </div>
          </div>
          
          <div className="harmony-rationale">
            {recommendation.rationale.map((reason, index) => (
              <div key={index} className="harmony-bullet">• {reason}</div>
            ))}
          </div>
          
          <button 
            className="harmony-expand" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Less" : "Why?"}
          </button>
          
          {isExpanded && (
            <div className="harmony-details">
              <div className="harmony-card-details">
                <div>Network: {recommendation.card.network}</div>
                <div>Base Rate: {(recommendation.card.baseRate * 100).toFixed(1)}%</div>
                {recommendation.card.notes && (
                  <div>Notes: {recommendation.card.notes}</div>
                )}
              </div>
            </div>
          )}
          
          <button className="harmony-not-your-card" onClick={handleNotYourCard}>
            Not your card?
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentScript: React.FC = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [userDismissed, setUserDismissed] = useState(false);
  const [context, setContext] = useState<TransactionContext | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const evaluateTransaction = () => {
    // Don't show overlay if user manually dismissed it
    if (userDismissed) {
      return;
    }

    const ctx = getTransactionContext();
    if (!ctx) {
      setOverlayVisible(false);
      return;
    }

    try {
      const rec = recommend(ctx, CARDS, PROMOS);
      setContext(ctx);
      setRecommendation(rec);
      setOverlayVisible(true);
      
      // Store recommendation
      setLastRecommendation({
        recommendation: rec,
        context: ctx,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Failed to generate recommendation:", error);
      setOverlayVisible(false);
    }
  };

  useEffect(() => {
    // Initial evaluation
    evaluateTransaction();

    // Set up mutation observer for dynamic content (only if overlay not visible and not dismissed)
    const observer = new MutationObserver(() => {
      // Only re-evaluate if overlay is not currently visible and user hasn't dismissed it
      if (!overlayVisible && !userDismissed) {
        setTimeout(evaluateTransaction, 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => observer.disconnect();
  }, [overlayVisible, userDismissed]);

  // Listen for messages from popup
  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "HARMONY_EVAL") {
        // Reset dismissed state when manually triggered from popup
        setUserDismissed(false);
        evaluateTransaction();
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  if (!overlayVisible || !context || !recommendation) {
    return null;
  }

  return (
    <Overlay
      context={context}
      recommendation={recommendation}
      onClose={() => {
        setOverlayVisible(false);
        setUserDismissed(true);
      }}
    />
  );
};

// Initialize the content script
const initContentScript = () => {
  console.log('Harmony: Content script loaded on', window.location.href);
  
  // Create root container
  let rootContainer = document.getElementById("harmony-root");
  if (!rootContainer) {
    rootContainer = document.createElement("div");
    rootContainer.id = "harmony-root";
    rootContainer.style.cssText = `
      position: fixed !important;
      bottom: 16px !important;
      right: 16px !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
      display: block !important;
      visibility: visible !important;
    `;
    document.body.appendChild(rootContainer);
    console.log('Harmony: Created harmony-root element');
  } else {
    console.log('Harmony: Found existing harmony-root element');
  }

  // Render React app
  try {
    const root = createRoot(rootContainer);
    root.render(<ContentScript />);
    console.log('Harmony: React app rendered successfully');
  } catch (error) {
    console.error('Harmony: Error rendering React app:', error);
  }
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContentScript);
} else {
  initContentScript();
}