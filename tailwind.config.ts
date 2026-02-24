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
        // NWL Brand Colors - Top Section (Calm Institutional)
        ivory: "#FFFEF7",
        charcoal: "#3D3D3D",
        wine: "#8B2332",
        'nwl-yellow': "#fcb22f",
        
        // Accent Colors - Middle/Lower Sections (Warm Transition)
        mustard: "#E6A944",
        eucalyptus: "#A8C5A5",
        skyblue: "#B8D4E8",
        terracotta: "#D4876F",
        
        // Vibrant Colors - Bottom Sections (Playful Energy)
        coral: "#FF6B6B",
        sunshine: "#FFD93D",
        ocean: "#4ECDC4",
        tangerine: "#FF8C42",
        bubblegum: "#FF99C8",
        lime: "#A8E6CF",
        blueberry: "#6C5CE7",
        
        // Neutrals
        sand: "#F5F1E8",
        warmgray: "#E8E4DF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
