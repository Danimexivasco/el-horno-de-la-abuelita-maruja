/** @type {import('eslint').Linter.Config[]} */

import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
  allConfig: pluginJs.configs.all,
});


export default [
  ...tsEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends("@danimexivasco/eslint-config"),
  {
    ignores: ["node_modules/**", "eslint.config.mjs"],
  },
  {
    files: ["**/*.{js,mjs,ts,jsx,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
];