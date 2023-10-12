import type { Linter } from "eslint";

export const extendsFrom: string[] = [];

export const rules = {
  "@typescript-eslint/explicit-module-boundary-types": "off",
} satisfies Linter.RulesRecord;
