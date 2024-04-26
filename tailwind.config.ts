import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        light: "400",
        bold: "700",
      },
    },
  },
  daisyui: {
    themes: ["coffee"],
  },
  plugins: [require("daisyui")],
};
export default config;
