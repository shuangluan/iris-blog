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
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        hairline: "var(--hairline)",
        accent: "var(--accent)",
        verm: "var(--verm)"
      },
      fontFamily: {
        serif: [
          "var(--font-source-serif)",
          "Source Serif 4",
          "var(--font-noto-serif-sc)",
          "Noto Serif SC",
          "serif"
        ],
        sans: [
          "var(--font-source-sans)",
          "Source Sans 3",
          "var(--font-noto-serif-sc)",
          "Noto Serif SC",
          "sans-serif"
        ],
        mono: ["var(--font-source-code)", "Source Code Pro", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
