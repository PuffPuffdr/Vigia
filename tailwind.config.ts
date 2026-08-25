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
        "bg-deep": "#0A0E14",
        glass: "rgba(255,255,255,0.06)",
        "glass-brd": "rgba(255,255,255,0.12)",
        "glass-hi": "rgba(255,255,255,0.10)",
        text: "#EEF2F7",
        "text-mute": "#93A3B8",
        accent: "#6EE7FF",
        "accent-2": "#A78BFA",
        warn: "#F5A94E",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "28px",
      },
      backgroundImage: {
        "radial-hero":
          "radial-gradient(120% 90% at 50% -10%, #16202e 0%, #0d131c 55%, #080b11 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glow-accent": "0 0 40px rgba(110,231,255,0.25)",
        "glow-accent-2": "0 0 40px rgba(167,139,250,0.25)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
