import { useState } from "react";
import { ChevronLeft, ChevronRight, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { CreditCardDisplay, CreditCardData } from "./CreditCardDisplay";
import { useTheme, getThemeColors } from "./ThemeContext";

interface CardCarouselProps {
  cards: CreditCardData[];
  optimalCardIndex: number;
  optimalReason?: string;
  nonOptimalReasons: { [key: string]: string };
  onCardChange?: (index: number) => void;
}

export function CardCarousel({ cards, optimalCardIndex, nonOptimalReasons, onCardChange }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const handleCardChange = (index: number) => {
    setCurrentIndex(index);
    onCardChange?.(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    handleCardChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
    handleCardChange(newIndex);
  };

  const goToOptimalCard = () => {
    handleCardChange(optimalCardIndex);
  };

  const isOptimal = currentIndex === optimalCardIndex;

  return (
    <div className="space-y-3">
      <div className="relative py-6 overflow-x-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-30 w-8 h-8 rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: 'white', 
            border: `2px solid ${colors.border.default}`,
            top: 'calc(50% - 20px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            left: 0,
          }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: colors.text.primary }} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 z-30 w-8 h-8 rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: 'white', 
            border: `2px solid ${colors.border.default}`,
            top: 'calc(50% - 20px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: colors.text.primary }} />
        </button>

        {/* Cards Container - All visible */}
        <div className="flex items-center justify-center px-16">
          <div className="relative w-full flex items-center justify-center" style={{ height: '180px' }}>
            {cards.map((card, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;
              
              // Position cards with overlap and depth
              let translateX = offset * 100;
              let translateY = Math.abs(offset) * 8; // Slight vertical offset for depth
              let scale = isActive ? 1 : 0.82;
              let opacity = isActive ? 1 : 0.5;
              let blur = isActive ? 0 : 4;
              let zIndex = isActive ? 10 : 5 - Math.abs(offset);
              let rotateY = offset * -8; // 3D rotation effect

              return (
                <div
                  key={card.id}
                  className="absolute transition-all duration-700 ease-out cursor-pointer hover:scale-105"
                  onClick={() => handleCardChange(index)}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                    opacity: Math.abs(offset) > 1 ? 0 : opacity,
                    filter: `blur(${blur}px)`,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <CreditCardDisplay card={card} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardChange(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                backgroundColor: index === currentIndex ? colors.accent.gold : colors.border.default,
              }}
            />
          ))}
        </div>
      </div>

      {/* Non-optimal card warning */}
      {!isOptimal && (
        <div
          className={`bg-linear-to-br ${colors.warning.bg} rounded-2xl p-4 shadow-lg border-2 animate-in fade-in slide-in-from-top-4 duration-500`}
          style={{ borderColor: colors.warning.border }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: colors.warning.icon }}
            >
              <AlertCircle className="w-5 h-5" style={{ color: colors.warning.iconColor }} />
            </div>
            <div className="flex-1">
              <h4 className="flex items-center gap-2" style={{ fontSize: '14px', color: theme === 'dark' ? colors.text.primary : '#0A2540', fontWeight: 700, marginBottom: '4px' }}>
                Not your best card
              </h4>
              <p style={{ fontSize: '12px', color: colors.warning.text, lineHeight: '1.5' }}>
                {nonOptimalReasons[cards[currentIndex].id] || "This card earns fewer rewards for this category."}
              </p>
            </div>
          </div>
          <button
            onClick={goToOptimalCard}
            className="w-full mt-3 py-2.5 rounded-xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.goldDark} 0%, #D97706 100%)`,
              color: 'white',
              fontWeight: 700,
              fontSize: '13px',
              boxShadow: `0 4px 12px ${theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.3)'}`,
            }}
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Switch to Best Card
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}