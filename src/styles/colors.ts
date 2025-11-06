/**
 * Global Color Configuration
 * Change these values to experiment with different color schemes
 */

export const colors = {
  // Dark Mode Colors
  dark: {
    // Background colors
    background: {
      primary: '#2C2766',    // Main background (violet)
      secondary: '#181624',  // Learn page background (dark purple)
      card: '#232146',       // Card backgrounds (purple)
      section: '#29285a',    // Section backgrounds (medium purple)
    },

    // Border colors
    border: {
      primary: '#7C70C8',    // Main borders (light violet)
      accent: '#FFB300',     // Accent borders (yellow/gold)
    },

    // Text colors
    text: {
      primary: '#FFB300',    // Headings and important text (yellow/gold)
      secondary: '#E0E0E0',  // Body text (light gray) - using hex for consistency
      muted: '#A0A0A0',      // Muted text (gray)
    },

    // Accent colors for formula backgrounds
    accents: {
      blue: 'bg-blue-900/30',
      green: 'bg-green-900/30',
      purple: 'bg-purple-900/30',
      yellow: 'bg-yellow-900/30',
      gray: 'bg-gray-800/50',
    },

    // UI element colors
    ui: {
      badge: {
        bg: 'bg-blue-900/50',
        text: 'text-blue-200',
      },
      border: {
        accent: 'border-blue-400',
        separator: 'border-gray-700',
      }
    }
  },

  // Light Mode Colors
  light: {
    // Background colors
    background: {
      primary: '#FFFFFF',    // Main background (white)
      secondary: '#F5F5F5',  // Learn page background (light gray)
      card: '#FFFFFF',       // Card backgrounds (white)
      section: '#F9FAFB',    // Section backgrounds (very light gray)
    },

    // Border colors
    border: {
      primary: '#E7E6F8',    // Main borders (light violet)
      accent: '#FFB300',     // Accent borders (yellow/gold)
    },

    // Text colors
    text: {
      primary: '#1F2937',    // Headings (dark gray)
      secondary: '#4B5563',  // Body text (medium gray)
      muted: '#6B7280',      // Muted text (light gray)
      violet: '#7C3AED',     // Violet accent text
    },

    // Accent colors for formula backgrounds
    accents: {
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      purple: 'bg-purple-50',
      yellow: 'bg-yellow-50',
      gray: 'bg-gray-100',
    },

    // UI element colors
    ui: {
      badge: {
        bg: 'bg-blue-100',
        text: 'text-blue-900',
      },
      border: {
        accent: 'border-blue-500',
        separator: 'border-yellow-200',
      }
    }
  },

  // Shared colors (used in both modes)
  shared: {
    accent: '#FFB300',       // Primary accent color (yellow/gold)
    success: '#10B981',      // Success green
    error: '#EF4444',        // Error red
    warning: '#F59E0B',      // Warning orange
  }
};

/**
 * Helper function to get color based on dark mode
 */
export const getColor = (darkMode: boolean) => ({
  bg: {
    primary: darkMode ? colors.dark.background.primary : colors.light.background.primary,
    secondary: darkMode ? colors.dark.background.secondary : colors.light.background.secondary,
    card: darkMode ? colors.dark.background.card : colors.light.background.card,
    section: darkMode ? colors.dark.background.section : colors.light.background.section,
  },
  border: {
    primary: darkMode ? colors.dark.border.primary : colors.light.border.primary,
    accent: colors.shared.accent,
  },
  text: {
    primary: darkMode ? colors.dark.text.primary : colors.light.text.primary,
    secondary: darkMode ? colors.dark.text.secondary : colors.light.text.secondary,
    muted: darkMode ? colors.dark.text.muted : colors.light.text.muted,
  },
  accents: darkMode ? colors.dark.accents : colors.light.accents,
  ui: darkMode ? colors.dark.ui : colors.light.ui,
});

/**
 * Tailwind class helpers
 */
export const tw = {
  dark: (darkMode: boolean) => ({
    // Background classes
    bgPrimary: darkMode ? `bg-[${colors.dark.background.primary}]` : `bg-[${colors.light.background.primary}]`,
    bgSecondary: darkMode ? `bg-[${colors.dark.background.secondary}]` : `bg-[${colors.light.background.secondary}]`,
    bgCard: darkMode ? `bg-[${colors.dark.background.card}]` : `bg-[${colors.light.background.card}]`,
    bgSection: darkMode ? `bg-[${colors.dark.background.section}]` : `bg-[${colors.light.background.section}]`,

    // Border classes
    borderPrimary: darkMode ? `border-[${colors.dark.border.primary}]` : `border-[${colors.light.border.primary}]`,
    borderAccent: `border-[${colors.shared.accent}]`,

    // Text classes
    textPrimary: darkMode ? `text-[${colors.dark.text.primary}]` : `text-[${colors.light.text.primary}]`,
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
  }),
};

