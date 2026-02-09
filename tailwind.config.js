/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F7F3EC",
        surface: "#FBF8F2",
        text: "#2E2A27",
        text2: "rgba(46,42,39,0.72)",
        line: "rgba(46,42,39,0.10)",
        warm: "#B8946B",
        warmdeep: "#6E5540",
      },
      fontFamily: {
        jp: ["Noto Sans JP", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest2: ".01em",
        cozy: ".02em",
      },
      lineHeight: {
        relax: "1.9",
      },
    },
  },
  plugins: [],
};
