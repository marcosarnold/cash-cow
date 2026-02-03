import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("cashcow-theme");
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("cashcow-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Theme color utilities
export const themeColors = {
  light: {
    bg: {
      primary: "#F7F9FB",
      secondary: "#EEF2F6",
      card: "#FFFFFF",
      elevated: "#FFFFFF",
    },
    text: {
      primary: "#0A2540",
      secondary: "#6B7280",
      tertiary: "#9CA3AF",
    },
    border: {
      default: "#E5E7EB",
      light: "#F3F4F6",
    },
    accent: {
      gold: "#F5B841",
      goldDark: "#F59E0B",
    },
    success: {
      bg: "from-green-50 to-emerald-50",
      border: "#86EFAC",
      icon: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      text: "#064E3B",
      badge: "#D1FAE5",
      badgeText: "#047857",
    },
    warning: {
      bg: "from-amber-50 to-orange-50",
      border: "#FDE68A",
      icon: "#FCD34D",
      iconColor: "#B45309",
      text: "#78350F",
    },
  },
  dark: {
    bg: {
      primary: "#0A1628",
      secondary: "#0F1F3A",
      card: "#1A2942",
      elevated: "#243552",
    },
    text: {
      primary: "#F7F9FB",
      secondary: "#B4BBC6",
      tertiary: "#8B92A0",
    },
    border: {
      default: "#2D3F5F",
      light: "#1F3147",
    },
    accent: {
      gold: "#F5B841",
      goldDark: "#F59E0B",
    },
    success: {
      bg: "from-emerald-950 to-green-950",
      border: "#064E3B",
      icon: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      text: "#D1FAE5",
      badge: "#064E3B",
      badgeText: "#6EE7B7",
    },
    warning: {
      bg: "from-amber-950 to-orange-950",
      border: "#78350F",
      icon: "#92400E",
      iconColor: "#FCD34D",
      text: "#FDE68A",
    },
  },
};

export function getThemeColors(theme: Theme) {
  return themeColors[theme];
}
