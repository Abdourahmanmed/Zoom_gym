import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { bg: "#0F172A", card: "#111827", primary: "#22C55E", warning: "#F97316", danger: "#EF4444", secondaryText: "#94A3B8" }, boxShadow: { soft: "0 10px 40px rgba(2, 8, 23, 0.25)" } } },
  plugins: []
} satisfies Config;
