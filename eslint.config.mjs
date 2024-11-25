/** @type {import("eslint").Linter.Config[]} */

import eslint from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginReact from "eslint-plugin-react";
import tsParser from '@typescript-eslint/parser';
import tsEslint from "typescript-eslint";
import importNewlines from "eslint-plugin-import-newlines"

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

  {
    ignores: ["node_modules/**", "eslint.config.mjs"],
  },

  {
    files: ["**/*.{js,mjs,ts,jsx,tsx}"],
    plugins: {
      "import-newlines": importNewlines,
      "@react": pluginReact,
      '@stylistic': stylistic,
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "camelcase": "warn",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "off",

      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["error", "double", { allowTemplateLiterals: true }],
      "@stylistic/js/array-bracket-spacing": ["error", "never"],
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/object-curly-newline": ["error", {
        "ObjectExpression": { multiline: true, minProperties: 1 },
      }],
      "@stylistic/js/object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
      "@stylistic/js/brace-style": ["error", "1tbs"],
      "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/js/computed-property-spacing": ["error", "never"],
      "@stylistic/js/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/js/comma-dangle": ["error", "never"],
      "@stylistic/js/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "@stylistic/js/no-multi-spaces": [2],
      "@stylistic/js/no-trailing-spaces": ["error", { skipBlankLines: false, ignoreComments: false }],
      "@stylistic/js/rest-spread-spacing": ["error", "never"],
      "@stylistic/js/max-len": ["warn", { "code": 80 }],
      "@stylistic/js/key-spacing": ["error", { align: "value" }],

      "@stylistic/type-annotation-spacing": [2],
      "@stylistic/semi": ["error", "always"],

      "@stylistic/jsx-max-props-per-line": [
        "error",
        { maximum: { single: 2, multi: 1 } },
      ],
      "@stylistic/jsx-closing-tag-location": ["error", "line-aligned"],
      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@react/jsx-no-useless-fragment": "error",
      "@react/react-in-jsx-scope": "off",

      "import-newlines/enforce": [
        "error",
        4,
        80
      ]
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];