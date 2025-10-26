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

  // Get the appropriate logo based on theme
  const getLogoImage = () => {
    if (theme === 'dark') {
      // Use blue/dark version for dark mode
      return "/src/assets/logos/unnamed (1).jpg"; // Adjust filename as needed
    } else {
      // Use white background version for light mode
      return "/src/assets/logos/harmony logo.png";
    }
  };

  const LogoIcon = () => (
    <img 
      src={getLogoImage()}
      alt="Harmony Logo"
      className={`${sizeClasses[size]} ${className}`}
      style={{ objectFit: 'contain' }}
    />
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
    <img 
      src="/src/assets/logos/harmony logo.png"
      alt="Harmony Extension Icon"
      className={`w-16 h-16 ${className}`}
      style={{ objectFit: 'contain' }}
    />
  );
}