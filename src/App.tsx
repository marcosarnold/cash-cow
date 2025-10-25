import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { MainPopup } from "./components/MainPopup";
import { SettingsMenu } from "./components/SettingsMenu";
import { ManageCards } from "./components/ManageCards";
import { RewardPreferences } from "./components/RewardPreferences";
import { AccountPrivacy } from "./components/AccountPrivacy";
import { RewardsDashboard } from "./components/RewardsDashboard";

type Screen = "main" | "settings" | "manage-cards" | "reward-preferences" | "account-privacy" | "dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

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
        {currentScreen === "main" && <MainPopup onNavigate={handleNavigate} />}
        {currentScreen === "settings" && <SettingsMenu onNavigate={handleNavigate} />}
        {currentScreen === "manage-cards" && <ManageCards onNavigate={handleNavigate} />}
        {currentScreen === "reward-preferences" && <RewardPreferences onNavigate={handleNavigate} />}
        {currentScreen === "account-privacy" && <AccountPrivacy onNavigate={handleNavigate} />}
        {currentScreen === "dashboard" && <RewardsDashboard onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}