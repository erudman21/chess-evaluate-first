import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        board: "calc(100% - 64rem)",
        square: "calc(100% - (1/8) - 10px)",
      },
      height: {
        board: "calc(100% - 16rem)",
        square: "100px",
      },
      flex: {
        square: "1 1 12.5%",
      },
    },
  },
  plugins: [],
};
export default config;
