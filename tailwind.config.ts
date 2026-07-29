import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    relative: true,
    files: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "!./app/**/node_modules/**",
    ],
  },
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06060a",
          900: "#0c0c12",
          800: "#12121a",
          700: "#1a1a24",
          600: "#27272a",
        },
        accent: {
          blue: "#6366f1",
          "blue-glow": "rgba(99,102,241,0.1)",
          cyan: "#06b6d4",
          emerald: "#22c55e",
          amber: "#f59e0b",
          rose: "#ef4444",
          orange: "#f97316",
        },
        text: {
          primary: "#e4e4e7",
          secondary: "#a1a1aa",
          muted: "#71717a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "slide-in": "slideIn 0.4s ease forwards",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
