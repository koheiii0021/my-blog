import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        glamor: ["Glamor", "sans-serif"],
        sans: [
          "Helvetica",
          "'游ゴシック'",
          "'Yu Gothic'",
          "YuGothic",
          "HiraKakuProN-W3",
          "'メイリオ'",
          "Meiryo",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;