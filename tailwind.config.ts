import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lcd: ['VT323', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Retro theme specific
        deck: {
          body: "hsl(var(--deck-body))",
          dark: "hsl(var(--deck-body-dark))",
          shadow: "hsl(var(--deck-shadow))",
        },
        wood: {
          DEFAULT: "hsl(var(--wood))",
          light: "hsl(var(--wood-light))",
          dark: "hsl(var(--wood-dark))",
        },
        chrome: {
          DEFAULT: "hsl(var(--chrome))",
          light: "hsl(var(--chrome-light))",
          dark: "hsl(var(--chrome-dark))",
        },
        lcd: {
          bg: "hsl(var(--lcd-bg))",
          text: "hsl(var(--lcd-text))",
          glow: "hsl(var(--lcd-glow))",
        },
        vu: {
          green: "hsl(var(--vu-green))",
          yellow: "hsl(var(--vu-yellow))",
          red: "hsl(var(--vu-red))",
        },
        button: {
          DEFAULT: "hsl(var(--button))",
          pressed: "hsl(var(--button-pressed))",
          text: "hsl(var(--button-text))",
        },
        playlist: {
          bg: "hsl(var(--playlist-bg))",
          item: "hsl(var(--playlist-item))",
          active: "hsl(var(--playlist-active))",
          hover: "hsl(var(--playlist-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
      boxShadow: {
        "deck": "0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 20px -10px rgba(0, 0, 0, 0.2)",
        "button-3d": "0 4px 0 hsl(var(--deck-shadow)), 0 6px 8px rgba(0, 0, 0, 0.2)",
        "button-pressed": "0 2px 0 hsl(var(--deck-shadow)), 0 3px 4px rgba(0, 0, 0, 0.2)",
        "inset-deep": "inset 0 2px 8px rgba(0, 0, 0, 0.3)",
        "lcd": "inset 0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
