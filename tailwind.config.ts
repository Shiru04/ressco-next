import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "hsl(var(--brand-primary))",
          red: "hsl(var(--brand-primary))",
          dark: "hsl(var(--brand-dark))",
          black: "hsl(var(--brand-dark))",
          gray: "hsl(var(--brand-gray))",
          white: "hsl(var(--brand-white))",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
