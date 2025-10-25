import { useTheme } from './ThemeContext';

interface HarmonyLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon-only';
}

export function HarmonyLogo({ className = "", size = 'medium', variant = 'full' }: HarmonyLogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };

  const LogoIcon = () => (
    <svg 
      className={`${sizeClasses[size]} ${className}`} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left vertical stroke */}
      <path
        d="M8 8V24"
        stroke={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Right vertical stroke */}
      <path
        d="M24 8V24"
        stroke={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Wave horizontal connector */}
      <path
        d="M8 16C8 16 10 12 16 16C22 20 24 16 24 16"
        stroke="url(#waveGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      <defs>
        <linearGradient id="waveGradient" x1="8" y1="16" x2="24" y2="16">
          <stop offset="0%" stopColor={theme === 'dark' ? '#60A5FA' : '#3B82F6'} />
          <stop offset="25%" stopColor={theme === 'dark' ? '#3B82F6' : '#1D4ED8'} />
          <stop offset="50%" stopColor={theme === 'dark' ? '#1D4ED8' : '#1E40AF'} />
          <stop offset="75%" stopColor={theme === 'dark' ? '#1E40AF' : '#1E3A8A'} />
          <stop offset="100%" stopColor={theme === 'dark' ? '#1E3A8A' : '#172554'} />
        </linearGradient>
      </defs>
    </svg>
  );

  if (variant === 'icon-only') {
    return <LogoIcon />;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      <span 
        className={`${textSizes[size]} font-semibold`}
        style={{ 
          color: theme === 'dark' ? '#F7F9FB' : '#0A2540',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        Harmony
      </span>
    </div>
  );
}

// Extension icon component for Chrome toolbar
export function ExtensionIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`w-16 h-16 ${className}`} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="#F5B841"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      
      {/* H logo */}
      <path
        d="M8 8V24"
        stroke="#0A2540"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 8V24"
        stroke="#0A2540"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M8 16C8 16 10 12 16 16C22 20 24 16 24 16"
        stroke="url(#extensionGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      <defs>
        <linearGradient id="extensionGradient" x1="8" y1="16" x2="24" y2="16">
          <stop offset="0%" stopColor="#0A2540" />
          <stop offset="25%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="75%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}