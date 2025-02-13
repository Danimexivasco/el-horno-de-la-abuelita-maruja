import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        },
        overlayShow: {
          from: {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        },
        contentShow: {
          from: {
            opacity:   "0",
            transform: "translate(-50%, -48%) scale(0.96)"
          },
          to: {
            opacity:   "1",
            transform: "translate(-50%, -50%) scale(1)"
          }
        }
      },
      animation: {
        grow:        "grow 0.3s ease-in-out",
        overlayShow: "overlayShow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
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
  plugins: [typography],
  future:  {
    hoverOnlyWhenSupported: true
  }
};
export default config;
