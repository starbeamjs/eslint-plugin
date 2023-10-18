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
        "watchOptions",
        "typeAcquisition",
      ],
    },

    {
      pathPattern: "^compilerOptions$",
      order: [
        // projects
        "composite",
        "disableReferencedProjectLoad",
        "disableSolutionSearching",
        "disableSourceOfProjectReferenceRedirect",
        "tsBuildInfoFile",

        // tsc behavior
        "noEmitOnError",
        "incremental",

        // completeness
        "skipLibCheck",
        "skipDefaultLibCheck",

        // target environment
        "target",
        "module",
        "moduleResolution",

        // runtime environment
        "lib",
        "moduleDetection",
        "noLib",
        "useDefineForClassFields",

        // JS support
        "allowJs",
        "checkJs",
        "maxNodeModuleJsDepth",

        // extra TS-specific language features
        "emitDecoratorMetadata",
        "experimentalDecorators",
        "jsx",
        "jsxImportSource",
        "jsxFactory",
        "jsxFragmentFactory",

        // runtime interop constraints
        "allowSyntheticDefaultImports",
        "esModuleInterop",
        "isolatedModules",

        // file system interop constraints
        "forceConsistentCasingInFileNames",
        "preserveSymlinks",

        // project structure features
        "paths",
        "rootDir",
        "rootDirs",

        // where to get extra types
        "types",
        "typeRoots",

        // transform options
        "preserveConstEnums",
        "removeComments",
        "stripInternal",

        // strict features
        "strict",
        // optional strict features (even with strict: true)
        "exactOptionalPropertyTypes",
        "noImplicitOverride",
        "noPropertyAccessFromIndexSignature",
        "noUncheckedIndexedAccess",

        // included in strict: true
        "alwaysStrict",
        "strictNullChecks",
        "strictBindCallApply",
        "strictFunctionTypes",
        "strictPropertyInitialization",
        "noImplicitAny",
        "noImplicitThis",
        "useUnknownInCatchVariables",

        // module stuff
        "moduleSuffixes",
        "allowArbitraryExtensions",
        "allowImportingTsExtensions",
        "customConditions",

        // unusual module stuff
        "noResolve",

        // not recommended (on by default when using recommended features)
        "resolveJsonModule",
        "resolvePackageJsonImports",

        // deprecated module stuff
        "importsNotUsedAsValues",

        // basic emit
        "noEmit",
        "importHelpers",

        // source maps
        "sourceMap",
        "inlineSources",
        "inlineSourceMap",
        "sourceRoot",
        "mapRoot",

        // what and where to emit
        "declaration",
        "declarationDir",
        "declarationMap",
        "emitDeclarationOnly",
        "outDir",

        // not recommended emit
        "downlevelIteration",
        "emitBOM",
        "newLine",
        "noEmitHelpers",
        "outFile",

        // editor support
        "plugins",

        // unusual editor support
        "disableSizeLimit",

        // compiler diagnostics
        "diagnostics",
        "listFiles",
        "listEmittedFiles",
        "explainFiles",
        "traceResolution",
        "extendedDiagnostics",
        "generateCpuProfile",
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
