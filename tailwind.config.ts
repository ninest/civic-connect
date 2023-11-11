import type { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: defaultColors.indigo,
        error: defaultColors.red,
        gray: defaultColors.gray,
        light: "#fefefe",
        dark: "#010101",
      },
    },
  },
  plugins: [],
};
export default config;
