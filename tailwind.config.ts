import type { Config } from "tailwindcss";

const config: Config = {
  mode:    "jit",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "selector",
  theme:    {
    extend: {
      colors: {
        "cake": {
          DEFAULT: "#CF9A2B",
          50:      "#FBF5EA",
          100:     "#F6ECD5",
          200:     "#EDD8AB",
          300:     "#E4C37C",
          400:     "#DBB052",
          500:     "#CF9A2B",
          600:     "#A57B22",
          700:     "#7A5C19",
          800:     "#543F12",
          900:     "#2A2009",
          950:     "#151004"
        }
      },
      keyframes: {
        grow: {
          "0%": {
            height: "16px"
          },
          "100%": {
            height: "40px"
          }
        }
      },
      animation: {
        grow: "grow 0.3s ease-in-out"
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fit":  "repeat(auto-fit, minmax(300px, 1fr))"
      },
      maxWidth: {
        "8xl": "96rem"
      }
    }
  },
  plugins: []
};
export default config;
