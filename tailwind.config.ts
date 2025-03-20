import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  mode:    "jit",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["selector"],
  theme:    {
    extend: {
      colors: {
        "cake": {
          "50":    "#FBF5EA",
          "100":   "#F6ECD5",
          "200":   "#EDD8AB",
          "300":   "#E4C37C",
          "400":   "#DBB052",
          "500":   "#CF9A2B",
          "600":   "#A57B22",
          "700":   "#7A5C19",
          "800":   "#543F12",
          "900":   "#2A2009",
          "950":   "#151004",
          DEFAULT: "#CF9A2B"
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card:       {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        chart:  {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      transitionProperty: {
        colors: "none"
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
        "auto-fill":    "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fit":     "repeat(auto-fit, minmax(300px, 1fr))",
        "auto-fill-sm": "repeat(auto-fill, minmax(250px, 1fr))",
        "auto-fit-sm":  "repeat(auto-fit, minmax(250px, 1fr))"
      },
      maxWidth: {
        "8xl": "96rem"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [typography, tailwindcssAnimate],
  future:  {
    hoverOnlyWhenSupported: true
  }
};
export default config;
