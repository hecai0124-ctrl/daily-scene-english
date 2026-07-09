import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      colors: {
        ink: "#172033",
        mint: "#0f9f8f",
        coral: "#ff6b5f",
        paper: "#f7f4ec"
      }
    }
  },
  plugins: []
};

export default config;
