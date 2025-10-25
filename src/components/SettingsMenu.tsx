import { ArrowLeft, CreditCard, Star, Shield, LogOut, ChevronRight } from "lucide-react";
import { useDragScroll } from "./useDragScroll";

interface SettingsMenuProps {
  onNavigate: (screen: string) => void;
}

const settingsOptions = [
  {
    id: "manage-cards",
    label: "Manage Cards",
    icon: CreditCard,
    screen: "manage-cards",
  },
  {
    id: "reward-preferences",
    label: "Reward Preferences",
    icon: Star,
    screen: "reward-preferences",
  },
  {
    id: "account-privacy",
    label: "Account & Privacy",
    icon: Shield,
    screen: "account-privacy",
  },
];

export function SettingsMenu({ onNavigate }: SettingsMenuProps) {
  const scrollRef = useDragScroll<HTMLDivElement>();
  
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F7F9FB' }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("main")}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2540' }} />
          </button>
          <h1 style={{ fontSize: '20px', color: '#0A2540', fontWeight: 600 }}>
            Settings
          </h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto px-6 py-6" ref={scrollRef}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          {settingsOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={option.id}>
                <button
                  onClick={() => onNavigate(option.screen)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#EFF6FF' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#0A2540' }} />
                    </div>
                    <span style={{ fontSize: '15px', color: '#0A2540', fontWeight: 500 }}>
                      {option.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                </button>
                {index < settingsOptions.length - 1 && (
                  <div className="mx-5" style={{ height: '1px', backgroundColor: '#F3F4F6' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Log Out Button */}
        <button
          className="w-full mt-6 bg-white rounded-2xl px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#FEE2E2' }}
          >
            <LogOut className="w-5 h-5" style={{ color: '#DC2626' }} />
          </div>
          <span style={{ fontSize: '15px', color: '#DC2626', fontWeight: 500 }}>
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
}



