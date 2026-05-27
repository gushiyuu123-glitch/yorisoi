/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* --- Base surfaces --- */
        base: "#F7F3EC",
        surface: "#FBF8F2",

        /* --- Core ink (alpha対応) --- */
        ink: "rgb(46 42 39 / <alpha-value>)",

        /* --- Semantic helpers (固定が必要なら残す) --- */
        muted: "rgb(46 42 39 / 0.72)",
        hairline: "rgb(46 42 39 / 0.10)",

        /* --- Backward compatible aliases (重要) --- */
        text: "rgb(46 42 39 / <alpha-value>)",
        text2: "rgb(46 42 39 / 0.72)",
        line: "rgb(46 42 39 / 0.10)",

        /* --- Accent --- */
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

      /* ここは任意：よく使う“線”と“角”をルール化したいなら */
      borderRadius: {
        soft: "14px",
      },
    },
  },
  plugins: [],
};