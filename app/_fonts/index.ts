/* eslint camelcase: 0 */
import { Libre_Baskerville, Nunito, Playwrite_AU_VIC } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap"
});

export const libre = Libre_Baskerville({
  weight:  ["400", "700"],
  subsets: ["latin"],
  display: "swap"
});

export const playwrite = Playwrite_AU_VIC({
  fallback: ["system-ui", "sans-serif"],
  display:  "swap"
});