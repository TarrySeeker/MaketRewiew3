import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F4F5", // Light gray industrial background (zinc-100)
        foreground: "#09090B", // Almost black for text (zinc-950)
        card: "#FFFFFF", // Pure white for cards to pop
        "card-foreground": "#09090B",
        popover: "#FFFFFF",
        "popover-foreground": "#09090B",
        primary: "#FF3333", // Vivid industrial Red
        "primary-foreground": "#FFFFFF",
        secondary: "#E4E4E7", // Zinc-200
        "secondary-foreground": "#18181B",
        muted: "#F4F4F5",
        "muted-foreground": "#71717A", // Zinc-500
        accent: "#FF3333",
        "accent-foreground": "#FFFFFF",
        destructive: "#DC2626", // Red-600
        "destructive-foreground": "#FFFFFF",
        border: "#E4E4E7", // Zinc-200
        input: "#FFFFFF",
        ring: "#FF3333",
      },
      fontFamily: {
        sans: ["var(--font-jetbrains)", "monospace", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px", // Brutalism = sharp corners
      },
      boxShadow: {
        'neon-red': '-4px 4px 0px #FF3333',
        'neon-red-lg': '-8px 8px 0px #FF3333',
        'brutal': '-4px 4px 0px #09090B',
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      backgroundImage: {
        'blueprint': 'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
      },
      backgroundSize: {
        'blueprint': '20px 20px',
      }
    },
  },
  plugins: [],
};
export default config;
