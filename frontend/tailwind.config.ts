import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        ocean: "#1B6CA8",
        coral: "#FF6B5F",
        mint: "#2BB673",
        amber: "#F2B84B"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 42, 0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;
