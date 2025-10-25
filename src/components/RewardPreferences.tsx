import { ArrowLeft, GripVertical } from "lucide-react";
import { useState } from "react";

interface RewardPreferencesProps {
  onNavigate: (screen: string) => void;
}

interface PreferenceItem {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

const initialPreferences: PreferenceItem[] = [
  { id: "cashback", label: "Cashback", enabled: true, order: 1 },
  { id: "points", label: "Points", enabled: true, order: 2 },
  { id: "flex", label: "Flex", enabled: false, order: 3 },
];

export function RewardPreferences({ onNavigate }: RewardPreferencesProps) {
  const [preferences, setPreferences] = useState<PreferenceItem[]>(initialPreferences);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const togglePreference = (id: string) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== id) {
      const draggedIndex = preferences.findIndex((p) => p.id === draggedItem);
      const targetIndex = preferences.findIndex((p) => p.id === id);
      
      const newPreferences = [...preferences];
      const [removed] = newPreferences.splice(draggedIndex, 1);
      newPreferences.splice(targetIndex, 0, removed);
      
      setPreferences(newPreferences.map((p, i) => ({ ...p, order: i + 1 })));
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

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
            Reward Preferences
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Description */}
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
          Set your reward preferences and drag to reorder them by priority. Harmony will prioritize cards based on your preferences.
        </p>

        {/* Preference List */}
        <div className="space-y-3">
          {preferences.map((pref) => (
            <div
              key={pref.id}
              draggable
              onDragStart={() => handleDragStart(pref.id)}
              onDragOver={(e) => handleDragOver(e, pref.id)}
              onDragEnd={handleDragEnd}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-move hover:shadow-md transition-shadow"
              style={{
                border: '1px solid #E5E7EB',
                opacity: draggedItem === pref.id ? 0.5 : 1,
              }}
            >
              <GripVertical className="w-5 h-5 shrink-0" style={{ color: '#9CA3AF' }} />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: '#EFF6FF', color: '#0A2540', fontSize: '13px', fontWeight: 600 }}
                  >
                    {pref.order}
                  </span>
                  <span style={{ fontSize: '15px', color: '#0A2540', fontWeight: 500 }}>
                    {pref.label}
                  </span>
                </div>
              </div>

              <button
                onClick={() => togglePreference(pref.id)}
                className="relative w-12 h-7 rounded-full transition-colors shrink-0"
                style={{
                  backgroundColor: pref.enabled ? '#F5B841' : '#E5E7EB',
                }}
              >
                <div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform"
                  style={{
                    left: pref.enabled ? '26px' : '4px',
                  }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          className="bg-white rounded-xl p-4"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <div
            className="px-3 py-2 rounded-lg"
            style={{ backgroundColor: '#EFF6FF' }}
          >
            <p style={{ fontSize: '13px', color: '#0A2540', lineHeight: '1.5' }}>
              💡 <span style={{ fontWeight: 600 }}>Tip:</span> Drag preferences to change priority. Harmony will recommend cards based on your top preference first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
