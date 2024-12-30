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
      colors: {
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        accent: "rgba(var(--accent))",
        accent2: "rgba(var(--accent-2))",
        text: "rgba(var(--text))",

      },
    },
  },
  plugins: [],
} satisfies Config;
