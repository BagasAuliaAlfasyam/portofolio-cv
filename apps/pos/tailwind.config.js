/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { background: "#06060a", surface: { DEFAULT: "#0d0d14", 50: "#12121c", 100: "#181825", 200: "#1e1e2e" }, brand: { 400: "#818cf8", 500: "#6366f1" }, accent: { cyan: "#06b6d4", violet: "#8b5cf6", amber: "#f59e0b", emerald: "#10b981" }, sidebar: { DEFAULT: "#0a0a12", border: "rgba(255,255,255,0.06)" } },
    fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
  }},
  plugins: [],
};
