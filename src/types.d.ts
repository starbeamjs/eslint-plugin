declare module "eslint-plugin-unused-imports" {
  import type { ESLint } from "eslint";

  declare const EXPORTS: ESLint.Plugin;
  export = EXPORTS;
}

declare module "@typescript-eslint/eslint-plugin" {
  import type { ESLint } from "eslint";

  declare const EXPORTS: {
    configs: {
      recommended: ESLint.ConfigData;
      "recommended-type-checked": ESLint.ConfigData;
    };
  } & ESLint.Plugin;
  export = EXPORTS;
}

declare module "@eslint/eslintrc" {
  import type { Linter } from "eslint";

  interface FlatCompatOptions {
    baseDirectory: string;
  }

  declare class FlatCompat {
    constructor(options: FlatCompatOptions);

    extends(...args: string[]): Linter.FlatConfig[];
  }
}

declare module "eslint-plugin-eslint-comments" {
  export const PLUGIN: {
    configs: ESLint.ConfigData;
    rules: ESLint.Plugin["rules"];
    // utils: require("./lib/utils"),
  };

  export = PLUGIN;
}

declare module "eslint-plugin-simple-import-sort" {
  import type { ESLint, Linter } from "eslint";

  declare const PLUGIN: {
    rules: { imports: Linter.RuleEntry; exports: Linter.RuleEntry };
  } & ESLint.Plugin;

  export = PLUGIN;
}

declare module "eslint-plugin-file-extension-in-import-ts" {
  import type { ESLint, Linter } from "eslint";

  declare const PLUGIN: {
    rules: {
      "file-extension-in-import-ts": Linter.RuleEntry<
        [
          "always" | "never",
          {
            [index: string]: "always" | "never";
            extMapping?: Record<string, string>;
            forceIndexFileImport?: boolean;
            tryExtensions?: `.${string}`[];
          },
        ]
      >;
    };
  } & ESLint.Plugin;

  export = PLUGIN;
}

declare module "eslint-plugin-import" {
  import type { ESLint, Linter } from "eslint";

  declare const PLUGIN: {
    configs: {
      typescript: {
        settings: Record<string, unknown> & {
          "import/resolver": Record<string, unknown>;
        };
      };
    };
    rules: Linter.RulesRecord;
  } & ESLint.Plugin;

  export = PLUGIN;
}
