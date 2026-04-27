import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E8620A",
          "orange-hot": "#FF7A20",
          "orange-dim": "#E8620A20",
          "orange-glow": "#E8620A55"
        },
        void: { DEFAULT: "#070E14", navy: "#0D1A24", slate: "#122233", steel: "#1A2C3D" },
        ink: { DEFAULT: "#E8E2D9", muted: "#A8A29E", faint: "#6B6560" },
        surface: { light: "#F5F0EB", white: "#FFFFFF", elevated: "#FAF8F5", border: "#D4CFC7" },
        success: { DEFAULT: "#22C55E", dark: "#15803D" },
        danger: { DEFAULT: "#EF4444", dark: "#B91C1C" },
        warning: { DEFAULT: "#F59E0B", dark: "#B45309" },
        terminal: {
          bg: "#0B1220",
          border: "#263446",
          text: "#DDE7F5",
          green: "#3FB950",
          blue: "#58A6FF",
          red: "#F85149",
          yellow: "#D29922",
          prompt: "#E8620A"
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        arabic: ['"Cairo"', "system-ui", "sans-serif"]
      },
      fontSize: {
        hero: ["56px", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        h1: ["36px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        mono: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }]
      },
      borderRadius: { brand: "10px", "brand-lg": "14px", "brand-xl": "18px" },
      boxShadow: {
        "brand-glow": "0 0 28px rgba(232,98,10,0.25)",
        "brand-glow-sm": "0 0 16px rgba(232,98,10,0.18)",
        card: "0 2px 8px rgba(0,0,0,0.16)",
        "card-hover": "0 14px 32px rgba(0,0,0,0.24)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #070E14, #122233, #070E14)",
        "brand-gradient-orange": "linear-gradient(135deg, #E8620A, #FF7A20)"
      },
      animation: {
        "fade-in": "fadeIn .45s ease-out",
        "slide-up": "slideUp .4s ease-out",
        "scale-in": "scaleIn .3s ease-out",
        "terminal-blink": "terminalBlink 1s step-end infinite"
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        terminalBlink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } }
      }
    }
  },
  plugins: []
};

export default config;
