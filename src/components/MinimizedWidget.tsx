import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { HarmonyLogo } from './HarmonyLogo';
import { useTheme, getThemeColors } from './ThemeContext';

interface MinimizedWidgetProps {
  onExpand: () => void;
  recommendation?: {
    card: {
      name: string;
      last4: string;
    };
    estimatedValue: string;
  };
}

export function MinimizedWidget({ onExpand, recommendation }: MinimizedWidgetProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('right');
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    // Load saved position from storage
    chrome.storage.local.get(['harmonyWidgetPosition', 'harmonyWidgetPinned'], (result) => {
      if (result.harmonyWidgetPosition) {
        setPosition(result.harmonyWidgetPosition);
      }
      if (result.harmonyWidgetPinned) {
        setIsPinned(result.harmonyWidgetPinned);
      }
    });
  }, []);

  const togglePin = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    chrome.storage.local.set({ harmonyWidgetPinned: newPinned });
  };

  const togglePosition = () => {
    const newPosition = position === 'left' ? 'right' : 'left';
    setPosition(newPosition);
    chrome.storage.local.set({ harmonyWidgetPosition: newPosition });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (isPinned) return;
    
    const startX = e.clientX;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      
      // Determine if should pin to left or right side
      if (Math.abs(deltaX) > 50) {
        const newPosition = deltaX > 0 ? 'right' : 'left';
        if (newPosition !== position) {
          setPosition(newPosition);
          chrome.storage.local.set({ harmonyWidgetPosition: newPosition });
        }
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="harmony-minimized-widget"
      style={{
        position: 'fixed',
        top: '50%',
        [position]: '0px',
        transform: 'translateY(-50%)',
        zIndex: 999999,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: isPinned ? 'default' : 'grab',
      }}
      onMouseDown={handleDrag}
    >
      <div
        className="harmony-widget-container"
        style={{
          background: `linear-gradient(135deg, ${colors.bg.card} 0%, ${colors.bg.elevated} 100%)`,
          borderRadius: position === 'left' ? '0 16px 16px 0' : '16px 0 0 16px',
          padding: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.border.default}`,
          borderLeft: position === 'left' ? 'none' : `1px solid ${colors.border.default}`,
          borderRight: position === 'right' ? 'none' : `1px solid ${colors.border.default}`,
          minWidth: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Logo */}
        <div
          onClick={onExpand}
          className="harmony-widget-logo"
          style={{
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <HarmonyLogo variant="icon-only" size="medium" />
        </div>

        {/* Recommendation indicator */}
        {recommendation && (
          <div
            className="harmony-widget-indicator"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.gold} 0%, ${colors.accent.goldDark} 100%)`,
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              animation: 'harmony-pulse 2s infinite',
            }}
          />
        )}

        {/* Control buttons */}
        <div
          className="harmony-widget-controls"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            opacity: 0.7,
          }}
        >
          <button
            onClick={togglePosition}
            className="harmony-widget-button"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.bg.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {position === 'left' ? (
              <ChevronRight size={12} style={{ color: colors.text.secondary }} />
            ) : (
              <ChevronLeft size={12} style={{ color: colors.text.secondary }} />
            )}
          </button>

          <button
            onClick={togglePin}
            className="harmony-widget-button"
            style={{
              background: isPinned ? colors.accent.gold : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isPinned) {
                e.currentTarget.style.backgroundColor = colors.bg.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isPinned) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Sparkles 
              size={12} 
              style={{ 
                color: isPinned ? '#0A2540' : colors.text.secondary 
              }} 
            />
          </button>
        </div>

        {/* Recommendation preview */}
        {recommendation && (
          <div
            className="harmony-widget-preview"
            style={{
              background: colors.bg.primary,
              borderRadius: '8px',
              padding: '6px',
              fontSize: '10px',
              textAlign: 'center',
              color: colors.text.secondary,
              maxWidth: '80px',
              wordWrap: 'break-word',
            }}
          >
            <div style={{ fontWeight: 600, color: colors.text.primary }}>
              {recommendation.card.name}
            </div>
            <div style={{ fontSize: '9px' }}>
              {recommendation.estimatedValue}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes harmony-pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.2);
            }
          }
          
          .harmony-minimized-widget:hover .harmony-widget-container {
            transform: translateX(${position === 'left' ? '4px' : '-4px'});
          }
          
          .harmony-widget-logo:hover {
            filter: brightness(1.1);
          }
        `}
      </style>
    </div>
  );
}
