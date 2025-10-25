import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import '@assets/styles/tailwind.css';
import { StoredRecommendation } from '../../lib/types';
import { getLastRecommendation } from '../../lib/storage';
import { sendMessage } from '../../lib/bus';

const Popup: React.FC = () => {
  const [lastRecommendation, setLastRecommendation] = useState<StoredRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLastRecommendation();
  }, []);

  const loadLastRecommendation = async () => {
    try {
      const recommendation = await getLastRecommendation();
      setLastRecommendation(recommendation);
    } catch (err) {
      console.error('Failed to load last recommendation:', err);
    }
  };

  const handleRunOnTab = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage({ type: "HARMONY_EVAL" });
      if (response.error) {
        setError(response.error);
      } else {
        // Refresh the last recommendation after successful evaluation
        await loadLastRecommendation();
      }
    } catch (err) {
      setError('Failed to run evaluation on current tab');
      console.error('Error running evaluation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1 className="popup-title">Harmony</h1>
        <p className="popup-subtitle">Card Optimizer</p>
      </div>

      <div className="popup-content">
        {lastRecommendation ? (
          <div className="popup-recommendation">
            <div className="popup-merchant">
              <strong>{lastRecommendation.context.merchantName}</strong>
              <span className="popup-amount">${lastRecommendation.context.amount.toFixed(2)}</span>
            </div>
            
            <div className="popup-card-info">
              <div className="popup-card-name">{lastRecommendation.recommendation.card.displayName}</div>
              <div className="popup-rate">
                {(lastRecommendation.recommendation.effectiveRate * 100).toFixed(1)}% back
              </div>
              <div className="popup-value">
                Est. ${lastRecommendation.recommendation.estimatedValue.toFixed(2)} rewards
              </div>
            </div>

            <div className="popup-rationale">
              {lastRecommendation.recommendation.rationale.map((reason, index) => (
                <div key={index} className="popup-bullet">• {reason}</div>
              ))}
            </div>

            <div className="popup-timestamp">
              {formatTimestamp(lastRecommendation.timestamp)}
            </div>
          </div>
        ) : (
          <div className="popup-empty">
            <p>No recent recommendations</p>
            <p className="popup-empty-sub">Visit a checkout page to see card suggestions</p>
          </div>
        )}

        <div className="popup-actions">
          <button 
            className="popup-button"
            onClick={handleRunOnTab}
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run on this tab'}
          </button>
          
          {error && (
            <div className="popup-error">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(<Popup />);
}

init();
