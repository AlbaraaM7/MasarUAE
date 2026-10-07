import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        carbon: {
          950: "#181818",
          900: "#212121",
          800: "#282828",
          700: "#323232",
          600: "#3d3d3d",
          500: "#4a4a4a",
        },
        electric: {
          deep: "#0D7377",
          neon: "#14FFEC",
          glow: "rgba(20, 255, 236, 0.15)",
        },
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#0D7377",
          600: "#0b6266",
          700: "#095154",
          900: "#053032",
        },
        uae: {
          red: "#CE1126",
          green: "#007A3D",
          black: "#212121",
          gold: "#14FFEC",
        }
      },
      keyframes: {
        "spin-two-loops": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(720deg)" },
        },
      },
      animation: {
        "spin-two-loops": "spin-two-loops 1.6s cubic-bezier(0.4, 0, 0.2, 1) 1 forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
