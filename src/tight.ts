import type { Linter } from "eslint";

export const extendsFrom = ["plugin:@typescript-eslint/strict"];

const MAGIC_NUMBERS = {
  "no-magic-numbers": "off",
  "@typescript-eslint/no-magic-numbers": [
    "warn",
    {
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
      ignoreEnums: true,
    },
  ],
} satisfies Linter.RulesRecord;

export const rules = {
  ...MAGIC_NUMBERS,
};
