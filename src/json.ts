import type { ESLint, Linter } from "eslint";

export const recommended = {
  overrides: [
    {
      extends: ["plugin:@starbeam-dev/json:parser"],
      files: ["*.json", "workspace/build/*.json"],
    },
    {
      extends: ["plugin:@starbeam-dev/json:default"],
      files: ["*.json", "workspace/build/*.json"],
      excludedFiles: [
        "tsconfig.*",
        ".eslintrc.json",
        "package.json",
        ".vscode/settings.json",
      ],
    },
    {
      extends: ["plugin:@starbeam-dev/json:vscode-settings"],
      files: [".vscode/settings.json"],
    },
    {
      extends: ["plugin:@starbeam-dev/json:tsconfig"],
      files: ["tsconfig.*.json", "tsconfig.json"],
    },
    {
      extends: ["plugin:@starbeam-dev/json:eslintrc"],
      files: [".eslintrc.json", ".eslintrc.*.json"],
    },
    {
      extends: ["plugin:@starbeam-dev/json:package"],
      files: ["package.json"],
    },
  ],
} satisfies ESLint.ConfigData;

/** @type {ESLint.ConfigData} */
export const parser = {
  parser: "jsonc-eslint-parser",
};

export const packageJSON = json({
  "jsonc/sort-keys": [
    "error",
    {
      hasProperties: ["types", "default"],
      order: ["types", "import", "default"],
      pathPattern: ".*",
    },
    {
      pathPattern: "^$",
      order: [
        "private",
        "name",
        "type",
        "version",
        "description",
        "license",
        "main",
        "module",
        "types",
        "exports",
        "publishConfig",
        {
          keyPattern: "starbeam.*",
          order: { natural: true },
        },
        "scripts",
        {
          keyPattern: "^.*[dD]ependencies$",
          order: { natural: true },
        },
        {
          order: { natural: true },
        },
      ],
    },
    {
      order: { natural: true },
      pathPattern: ".*",
    },
  ],
});

export const eslintrcJSON = jsonc({
  "jsonc/sort-keys": [
    "error",
    {
      hasProperties: ["files"],
      order: [
        "extends",
        "parser",
        "files",
        {
          keyPattern: ".*",
          order: { type: "asc", natural: true },
        },
      ],
      pathPattern: ".*",
    },
    {
      order: [
        "root",
        "ignorePatterns",
        "extends",
        "parser",
        "parserOptions",
        "settings",
        "plugins",
        "overrides",
        {
          order: { type: "asc", natural: true },
        },
      ],
      pathPattern: "^$",
    },
    {
      pathPattern: "^rules$",
      order: {
        type: "asc",
        natural: true,
      },
    },
  ],
});

export const tsconfigJSON = jsonc({
  "jsonc/sort-keys": [
    "error",

    {
      pathPattern: "^$",
      order: [
        "extends",
        "compilerOptions",
        "files",
        "include",
        "exclude",
        "references",
      ],
    },

    {
      pathPattern: ".*",
      order: {
        type: "asc",
        natural: true,
      },
    },
  ],
});

export const vscodeSettingsJSON = jsonc({
  "jsonc/sort-keys": [
    "error",
    {
      pathPattern: "^\\[.*\\]$",
      order: [
        "editor.formatOnSave",
        {
          order: {
            natural: true,
          },
        },
      ],
    },
    {
      pathPattern: ".*",
      order: {
        natural: true,
      },
    },
  ],
});

export const jsonDefault = json({
  "jsonc/sort-keys": [
    "error",
    {
      order: {
        natural: true,
      },
      pathPattern: ".*",
    },
  ],
});

export const jsoncDefault = jsonc({
  "jsonc/sort-keys": [
    "error",
    {
      order: {
        natural: true,
      },
      pathPattern: ".*",
    },
  ],
});

function anyJson(extend: string, rules: Linter.RulesRecord): ESLint.ConfigData {
  return {
    plugins: ["prettier"],
    extends: ["prettier", extend],
    parser: "jsonc-eslint-parser",

    rules: {
      ...rules,
    },
  };
}

function json(rules: Linter.RulesRecord): ESLint.ConfigData {
  return anyJson("plugin:jsonc/recommended-with-json", rules);
}

function jsonc(rules: Linter.RulesRecord): ESLint.ConfigData {
  return anyJson("plugin:jsonc/recommended-with-jsonc", rules);
}
