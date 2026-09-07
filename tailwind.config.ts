import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Cairo", "Tahoma", "Arial", "sans-serif"],
      },
      colors: {
        sun: "#FFB703",
        sky: "#219EBC",
        deepsky: "#023047",
        coral: "#FB8500",
        leaf: "#8AC926",
        berry: "#FF006E",
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-40px)", opacity: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        confetti: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.35s ease-out",
        "float-up": "float-up 0.8s ease-out forwards",
        wiggle: "wiggle 0.6s ease-in-out",
        confetti: "confetti 3.2s linear forwards",
      },
    },
  },
  plugins: [],
};
export default config;
