import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== NWL Australian School — brand core =====
        navy: {
          DEFAULT: "#0B224E", // Southern Cross — primary / corporate
          700: "#0A2251",
          800: "#081B40",
          900: "#071638",
        },
        gold: {
          DEFAULT: "#CB8606", // Outback Gold — the kangaroo / accent
          400: "#E3990F", // hover / bright
          600: "#B0750A", // pressed
        },
        paper: "#F4EEE2", // warm Paper — page surface, text on navy

        // ===== Education-level palette (escudo hierarchy) =====
        "coral-sea": "#004756", // Middle School
        jacaranda: "#4A3A82", // High School
        galah: "#E89BB5", // Maternal + Kinder — galah cockatoo pink
        eucalyptus: "#93A860", // Elementary — eucalyptus green
        wattle: "#EDB500", // Golden wattle — brand yellow accent

        // Navy-tinted neutral scale
        n: {
          50: "#F6F7F9",
          100: "#ECEEF2",
          200: "#DCE0E8",
          300: "#C2C8D4",
          400: "#9AA2B3",
          500: "#6E7689",
          600: "#4D5567",
          700: "#343B4C",
          800: "#20273A",
          900: "#0F1626",
        },

        // ===== Legacy names — repointed to the new system so pages not yet
        // restyled still read navy + gold instead of breaking. =====
        ivory: "#F4EEE2", // → Paper
        charcoal: "#0B224E", // → Navy (legacy text color)
        wine: "#CB8606", // → Gold (legacy accent/CTA color)
        "nwl-yellow": "#EDB500", // → Wattle
        sand: "#F4EEE2", // → Paper
        warmgray: "#ECEEF2", // → navy-tinted neutral

        // Repointed playful accents → level palette
        mustard: "#EDB500", // → Wattle
        skyblue: "#004756", // → Coral Sea
        terracotta: "#CB8606", // → Gold
        coral: "#CB8606", // → Gold
        sunshine: "#EDB500", // → Wattle
        ocean: "#004756", // → Coral Sea
        tangerine: "#CB8606", // → Gold
        bubblegum: "#E89BB5", // → Galah
        lime: "#93A860", // → Eucalyptus
        blueberry: "#4A3A82", // → Jacaranda

        // Level accents (legacy) → DS level colors
        primaria: "#93A860", // → Eucalyptus (Elementary)
        secundaria: "#004756", // → Coral Sea (Middle)
        "deep-ember": "#4A3A82", // → Jacaranda (High School)
        "golden-spark": "#CB8606", // → Gold

        // Prepa neutrals → navy-tinted
        steel: "#6E7689",
        "prepa-sand": "#C2C8D4",
      },
      fontFamily: {
        sans: ["var(--font-brand)", "system-ui", "sans-serif"],
        display: ["var(--font-brand)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        "navy-sm": "0 2px 6px rgba(11, 34, 78, 0.08)",
        "navy-md": "0 10px 24px -12px rgba(11, 34, 78, 0.22)",
        "navy-lg": "0 24px 48px -20px rgba(11, 34, 78, 0.30)",
        "navy-xl": "0 40px 80px -30px rgba(7, 22, 56, 0.55)",
        gold: "0 10px 28px -12px rgba(203, 134, 6, 0.45)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        marquee: "marquee 30s linear infinite",
        hop: "hop 1.1s cubic-bezier(0.16,1,0.3,1) both",
        "hop-loop": "hop 3.2s cubic-bezier(0.16,1,0.3,1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        hop: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "18%": { transform: "translateY(-26%) rotate(-7deg)" },
          "38%": { transform: "translateY(0) rotate(0deg)" },
          "52%": { transform: "translateY(-10%) rotate(-3deg)" },
          "64%": { transform: "translateY(0) rotate(0deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        orb1: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(50px, 30px, 0) scale(1.2)" },
        },
        orb2: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-30px, 50px, 0) scale(1.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
