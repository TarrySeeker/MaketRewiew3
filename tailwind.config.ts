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
        background: "#0a0a0a",
        foreground: "#ffffff",
        card: "#1a1a1a",
        "card-foreground": "#ffffff",
        popover: "#1a1a1a",
        "popover-foreground": "#ffffff",
        primary: "#ff6b00",
        "primary-foreground": "#ffffff",
        secondary: "#2a2a2a",
        "secondary-foreground": "#a0a0a0",
        muted: "#2a2a2a",
        "muted-foreground": "#a0a0a0",
        accent: "#ff6b00",
        "accent-foreground": "#ffffff",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#2a2a2a",
        input: "#2a2a2a",
        ring: "#ff6b00",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
