/* eslint camelcase: 0 */
import { Nunito, Playwrite_AU_VIC, Sriracha } from "next/font/google";

// Regular text
export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap"
});

// Headlines
export const sriracha = Sriracha({
  weight:  "400",
  subsets: ["latin"],
  display: "swap"
});

// Empathize text
export const playwrite = Playwrite_AU_VIC({
  fallback: ["system-ui", "sans-serif"],
  display:  "swap"
});