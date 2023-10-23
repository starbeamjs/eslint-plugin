import { resolve } from "node:path";

import { FlatCompat } from "@eslint/eslintrc";
import tslint from "@typescript-eslint/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";
import comments from "eslint-plugin-eslint-comments";
import tsExtensions from "eslint-plugin-file-extension-in-import-ts";
import imports from "eslint-plugin-import";
import sortImports from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const types = fixTypes();

const root = new URL(".", import.meta.url).pathname;

const compat = new FlatCompat({
  baseDirectory: root,
});

const importSettings = settings(imports.configs.typescript.settings, {
  "import/resolver": {
    typescript: {
      alwaysTryTypes: true,
    },
  },
});

/**
 * @satisfies {import("eslint").Linter.FlatConfig["languageOptions"]}
 */
const languageOptions = {
  sourceType: "module",
  parser: types.parser,
  parserOptions: {
    project: resolve(root, "tsconfig.json"),
  },
};

export default /**
 * @satisfies {import("eslint").Linter.FlatConfig[]}
 */ ([
  {
    ignores: ["dist"],
  },
  {
    settings: importSettings,
    languageOptions,
  },
  ...compat
    .extends(
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:eslint-comments/recommended",
    )
    .map((config) => {
      return {
        ...config,
        settings: importSettings,
        languageOptions,
      };
    }),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      "unused-imports": unusedImports,
      comments,
      "sort-imports": sortImports,
      imports,
      "ts-extensions": tsExtensions,
      "@typescript": tslint,
    },
    rules: {
      ...tslint.configs["recommended-type-checked"].rules,

      semi: "error",
      "no-console": "error",
      "comments/no-unused-disable": "error",
      "comments/require-description": [
        "off", // enable in a subsequent PR
        { ignore: ["eslint-enable"] },
      ],
      "comments/disable-enable-pair": ["error", { allowWholeFile: true }],
      "unused-imports/no-unused-imports": "error",
      "sort-imports/imports": "error",
      "sort-imports/exports": "error",
      "no-unused-private-class-members": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "ts-extensions/file-extension-in-import-ts": [
        "error",
        "always",
        { extMapping: { ".ts": ".js", forceIndexFileImport: true } },
      ],
      "imports/no-unresolved": "error",
      "imports/no-relative-packages": "error",
      "imports/no-cycle": "error",
      "imports/first": "error",
      "imports/newline-after-import": "error",
      "imports/no-duplicates": "error",

      "@typescript/explicit-module-boundary-types": "error",
      "@typescript/no-floating-promises": "error",
      "@typescript/prefer-readonly": "error",
      "@typescript/consistent-type-exports": "error",
      "@typescript/consistent-indexed-object-style": "error",
      "@typescript/consistent-generic-constructors": "error",
      "@typescript/method-signature-style": "error",
      "@typescript/no-redundant-type-constituents": "error",
      "@typescript/no-unnecessary-qualifier": "error",
      "@typescript/no-useless-empty-export": "error",
      "@typescript/prefer-enum-initializers": "error",
      "@typescript/prefer-regexp-exec": "error",
      "@typescript/promise-function-async": "error",
      "@typescript/no-import-type-side-effects": "error",
      "@typescript/consistent-type-imports": "error",
    },
  },
]);

/**
 * @template {string} T
 * @param {Record<string, unknown> & Record<T, Record<string, unknown>>} config
 * @param {Record<T, Record<string, unknown>> | undefined} [options]
 * @returns
 */
function settings(config, options) {
  const extra = options
    ? Object.fromEntries(
        Object.entries(options).map(([name, value]) => [
          name,
          {
            ...config[/** @type {T} */ (name)],
            ...value,
          },
        ]),
      )
    : {};

  return {
    ...config,
    ...extra,
  };
}

function fixTypes() {
  return {
    parser: /** @type {import("eslint").Linter.ParserModule} */ (tsParser),
    unusedImports,
  };
}
