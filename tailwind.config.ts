import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fef8f2",
        peach: {
          50: "#fef3e8",
          200: "#fbd6b8",
          400: "#f6a271",
          600: "#e07235"
        },
        blush: {
          50: "#fce4ec",
          200: "#f8bacd",
          400: "#f180a7",
          600: "#d1487a"
        },
        lilac: {
          50: "#efe9ff",
          200: "#d4c6f7",
          400: "#a690ea",
          600: "#7a5cb8"
        },
        ink: {
          900: "#1f1735",
          700: "#463659",
          500: "#6b5b7e",
          300: "#a396b3"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px"
      },
      backgroundImage: {
        sunset:
          "linear-gradient(135deg, #fef3e8 0%, #fce4ec 45%, #efe9ff 100%)",
        sunsetDeep:
          "radial-gradient(80% 60% at 20% 10%, #fbd6b8 0%, transparent 55%), radial-gradient(70% 60% at 90% 30%, #f8bacd 0%, transparent 55%), radial-gradient(60% 50% at 60% 100%, #d4c6f7 0%, transparent 55%), linear-gradient(180deg, #fff9f2 0%, #fbeeef 60%, #efe9ff 100%)"
      },
      boxShadow: {
        soft: "0 1px 2px rgba(70, 54, 89, 0.04), 0 8px 24px rgba(70, 54, 89, 0.06)",
        softLg:
          "0 4px 8px rgba(70, 54, 89, 0.05), 0 20px 40px rgba(70, 54, 89, 0.08)",
        ring: "0 0 0 1px rgba(255,255,255,0.9) inset, 0 8px 24px rgba(70, 54, 89, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
