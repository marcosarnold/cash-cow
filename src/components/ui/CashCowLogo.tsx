import { useTheme } from './ThemeContext';

interface CashCowLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon-only';
}

export function CashCowLogo({ className = "", size = 'medium', variant = 'full' }: CashCowLogoProps) {
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
      return "/src/assets/logos/Cash Cow logo.png";
    } else {
      return "/src/assets/logos/cash-cow-logo.png";
    }
  };

  const LogoIcon = () => (
    <img
      src={getLogoImage()}
      alt="Cash Cow Logo"
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
        Cash Cow
      </span>
    </div>
  );
}

// Extension icon component for Chrome toolbar
export function ExtensionIcon({ className = "" }: { className?: string }) {
  return (
    <img
      src="/src/assets/logos/cash-cow-logo.png"
      alt="Cash Cow Extension Icon"
      className={`w-16 h-16 ${className}`}
      style={{ objectFit: 'contain' }}
    />
  );
}
