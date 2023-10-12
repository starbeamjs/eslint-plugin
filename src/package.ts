import type { ESLint, Linter } from "eslint";

const BASE_IGNORE = ["node_modules", "dist", "tests", "html"];

const BASE_OVERRIDES = [
  {
    files: ["*.json"],
    extends: ["plugin:@starbeam-dev/json:recommended"],
  },
  {
    files: ["*.js", "*.mjs"],
    extends: ["plugin:@starbeam-dev/typed-js"],
    parserOptions: {
      project: ["tsconfig.json"],
    },
  },
] satisfies Linter.ConfigOverride<Linter.RulesRecord>[];

export const library = {
  ignorePatterns: BASE_IGNORE,
  overrides: [
    ...BASE_OVERRIDES,
    {
      files: ["*.ts", "*.mts", "*.d.ts"],
      extends: ["plugin:@starbeam-dev/tight"],
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  ],
};

export const tests = {
  ignorePatterns: BASE_IGNORE,
  overrides: [
    ...BASE_OVERRIDES,
    {
      files: ["**/*.{tsx,ts}"],
      extends: ["plugin:@starbeam-dev/loose"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
} satisfies ESLint.ConfigData;
