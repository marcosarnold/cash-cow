import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ui/ThemeContext";
import { MainPopup } from "./components/MainPopup";
import { SettingsMenu } from "./components/settings/SettingsMenu";
import { ManageCards } from "./components/settings/ManageCards";
import { RewardPreferences } from "./components/settings/RewardPreferences";
import { AccountPrivacy } from "./components/settings/AccountPrivacy";
import { RewardsDashboard } from "./components/RewardsDashboard";

type Screen = "main" | "settings" | "manage-cards" | "reward-preferences" | "account-privacy" | "dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [tabInfo, setTabInfo] = useState<{ merchantName: string; amount: string; category?: string } | null>(null);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  // Get current tab info when popup opens
  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        // Get active tab
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]) {
          const url = tabs[0].url || '';
          const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '');

          // Detect merchant
          const merchantMap: Record<string, string> = {
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

          const merchant = merchantMap[hostname] || hostname.split('.')[0];

          // Try to get amount from storage
          const storage = await chrome.storage.local.get(['lastDetectedAmount', 'lastDetectedMerchant']);
          const amount = storage.lastDetectedAmount
            ? `$${storage.lastDetectedAmount.toFixed(2)}`
            : 'Check page';

          // Fallback category map (used if agent fails)
          const fallbackCategoryMap: Record<string, string> = {
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

          // Use AI agent for category classification
          let category = fallbackCategoryMap[merchant] || 'general';

          console.log('Starting agent classification for:', merchant);

          try {
            const agentResponse = await fetch('http://localhost:8080/classify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url }),
              signal: AbortSignal.timeout(2000)
            });

            if (agentResponse.ok) {
              const data = await agentResponse.json();
              const agentCategory = data.category.toUpperCase();

              console.log('Agent returned:', agentCategory);

              // Map agent categories to extension categories
              const agentCategoryMap: Record<string, string> = {
                'E-COMMERCE': 'online',
                'ENTERTAINMENT': 'dining',
                'TRAVEL': 'travel',
                'UTILITIES': 'groceries',
                'FINANCE': 'general',
                'OTHER': 'general',
              };

              const agentDerivedCategory = agentCategoryMap[agentCategory] || 'general';
              category = agentDerivedCategory;
              console.log('Agent classified as:', agentCategory, '-> Extension category:', category);
            } else {
              console.log('Agent returned error status:', agentResponse.status);
              console.log('Using fallback category:', category);
            }
          } catch (error) {
            console.log('Agent not available, using fallback category:', category, error);
          }

          console.log('Final category for', merchant, ':', category);
          setTabInfo({ merchantName: merchant, amount, category });
        }
      } catch (error) {
        console.log('Could not detect tab:', error);
      }
    };

    getCurrentTab();
  }, []);

  return (
    <ThemeProvider>
      <div
        className="mx-auto overflow-hidden shadow-2xl"
        style={{
          width: '400px',
          height: '600px',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Rounded", system-ui, sans-serif',
          borderRadius: '12px',
        }}
      >
        {currentScreen === "main" && <MainPopup onNavigate={handleNavigate} tabInfo={tabInfo} />}
        {currentScreen === "settings" && <SettingsMenu onNavigate={handleNavigate} />}
        {currentScreen === "manage-cards" && <ManageCards onNavigate={handleNavigate} />}
        {currentScreen === "reward-preferences" && <RewardPreferences onNavigate={handleNavigate} />}
        {currentScreen === "account-privacy" && <AccountPrivacy onNavigate={handleNavigate} />}
        {currentScreen === "dashboard" && <RewardsDashboard onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}
