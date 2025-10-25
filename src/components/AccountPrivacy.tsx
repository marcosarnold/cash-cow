import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useDragScroll } from "./useDragScroll";

interface AccountPrivacyProps {
  onNavigate: (screen: string) => void;
}

export function AccountPrivacy({ onNavigate }: AccountPrivacyProps) {
  const [dataSync, setDataSync] = useState(true);
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F7F9FB' }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("settings")}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2540' }} />
          </button>
          <h1 style={{ fontSize: '20px', color: '#0A2540', fontWeight: 600 }}>
            Account & Privacy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" ref={scrollRef}>
        {/* Linked Account */}
        <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-start justify-between mb-3">
            <h3 style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600 }}>
              Linked Account
            </h3>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 500 }}>
                Connected
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center" style={{ border: '1px solid #E5E7EB' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex-1">
              <div style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>
                Google OAuth
              </div>
              <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                user@example.com
              </div>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Data Sync */}
        <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600, marginBottom: '4px' }}>
                Data Sync
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                Sync your cards and preferences across devices
              </p>
            </div>
            <button
              onClick={() => setDataSync(!dataSync)}
              className="relative w-12 h-7 rounded-full transition-colors shrink-0 ml-4"
              style={{
                backgroundColor: dataSync ? '#10B981' : '#E5E7EB',
              }}
            >
              <div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform"
                style={{
                  left: dataSync ? '26px' : '4px',
                }}
              />
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl p-5 shadow-sm space-y-4" style={{ border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '15px', color: '#0A2540', fontWeight: 600 }}>
            Privacy Settings
          </h3>
          
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span style={{ fontSize: '14px', color: '#0A2540' }}>
                Download My Data
              </span>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>→</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span style={{ fontSize: '14px', color: '#0A2540' }}>
                Privacy Policy
              </span>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>→</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span style={{ fontSize: '14px', color: '#0A2540' }}>
                Terms of Service
              </span>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>→</span>
            </button>
          </div>
        </div>

        {/* Clear Local Data */}
        <div
          className="bg-white rounded-xl p-5 shadow-sm"
          style={{ border: '1px solid #FEE2E2' }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
            <div className="flex-1">
              <h3 style={{ fontSize: '15px', color: '#DC2626', fontWeight: 600, marginBottom: '4px' }}>
                Clear Local Data
              </h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5', marginBottom: '12px' }}>
                This will remove all cards, preferences, and settings from this device. This action cannot be undone.
              </p>
              <button
                className="px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                style={{ fontSize: '14px', color: '#DC2626', fontWeight: 500 }}
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



