import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/options/index.css';
import { FeatureFlags, DomainAllowlist } from '../../lib/types';
import { getFeatureFlags, setFeatureFlags, getDomainAllowlist, setDomainAllowlist } from '../../lib/storage';
import { DEMO_DOMAINS } from '../../lib/config';

const Options: React.FC = () => {
  const [featureFlags, setFeatureFlagsState] = useState<FeatureFlags>({
    USE_MOCK_DATA: true,
    ENABLE_FETCH_AGENT: false,
    ENABLE_ADS: false
  });
  const [domainAllowlist, setDomainAllowlistState] = useState<DomainAllowlist>({ domains: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [flags, allowlist] = await Promise.all([
        getFeatureFlags(),
        getDomainAllowlist()
      ]);
      setFeatureFlagsState(flags);
      setDomainAllowlistState(allowlist);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureFlagChange = (key: keyof FeatureFlags, value: boolean) => {
    setFeatureFlagsState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDomainToggle = (domain: string) => {
    setDomainAllowlistState(prev => {
      const domains = prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain];
      return { domains };
    });
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await Promise.all([
        setFeatureFlags(featureFlags),
        setDomainAllowlist(domainAllowlist)
      ]);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="options-container">
        <div className="options-loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="options-container">
      <div className="options-header">
        <h1 className="options-title">Harmony Settings</h1>
        <p className="options-subtitle">Configure your card optimization preferences</p>
      </div>

      <div className="options-content">
        <div className="options-section">
          <h2 className="options-section-title">Feature Flags</h2>
          <div className="options-toggles">
            <div className="options-toggle">
              <label className="options-toggle-label">
                <input
                  type="checkbox"
                  checked={featureFlags.USE_MOCK_DATA}
                  onChange={(e) => handleFeatureFlagChange('USE_MOCK_DATA', e.target.checked)}
                />
                <span className="options-toggle-text">
                  <strong>Use Mock Data</strong>
                  <span className="options-toggle-desc">Enable mock card recommendations for testing</span>
                </span>
              </label>
            </div>

            <div className="options-toggle">
              <label className="options-toggle-label">
                <input
                  type="checkbox"
                  checked={featureFlags.ENABLE_FETCH_AGENT}
                  onChange={(e) => handleFeatureFlagChange('ENABLE_FETCH_AGENT', e.target.checked)}
                />
                <span className="options-toggle-text">
                  <strong>Enable Fetch Agent</strong>
                  <span className="options-toggle-desc">Enable automatic data fetching (future feature)</span>
                </span>
              </label>
            </div>

            <div className="options-toggle">
              <label className="options-toggle-label">
                <input
                  type="checkbox"
                  checked={featureFlags.ENABLE_ADS}
                  onChange={(e) => handleFeatureFlagChange('ENABLE_ADS', e.target.checked)}
                />
                <span className="options-toggle-text">
                  <strong>Enable Ads</strong>
                  <span className="options-toggle-desc">Show sponsored offers and promotions</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="options-section">
          <h2 className="options-section-title">Domain Allowlist</h2>
          <p className="options-section-desc">
            Select which domains Harmony should monitor for checkout pages
          </p>
          <div className="options-domains">
            {DEMO_DOMAINS.map(domain => (
              <div key={domain} className="options-domain">
                <label className="options-domain-label">
                  <input
                    type="checkbox"
                    checked={domainAllowlist.domains.includes(domain)}
                    onChange={() => handleDomainToggle(domain)}
                  />
                  <span className="options-domain-text">{domain}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="options-actions">
          <button 
            className="options-save-button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' && 'Saving...'}
            {saveStatus === 'saved' && 'Saved!'}
            {saveStatus === 'error' && 'Error - Try Again'}
            {saveStatus === 'idle' && 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);
  root.render(<Options />);
}

init();
