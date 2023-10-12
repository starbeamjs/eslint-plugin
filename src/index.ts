import type { ESLint } from "eslint";

import * as base from "./base.js";
import * as commonjs from "./commonjs.js";
import * as demos from "./demos.js";
import * as esm from "./esm.js";
import * as json from "./json.js";
import * as recommended from "./package.js";
import * as tight from "./tight.js";
import * as typedJS from "./typed-js.js";

export default {
  configs: {
    "library:recommended": recommended.library,
    "tests:recommended": recommended.tests,

    tight: {
      ...base.config,
      extends: [...base.extendsFrom, ...tight.extendsFrom],
      rules: { ...base.rules, ...tight.rules },
    },
    "typed-js": {
      ...base.config,
      extends: [...base.extendsFrom, ...typedJS.extendsFrom],
      rules: { ...base.rules, ...typedJS.rules },
    },
    loose: {
      ...base.config,
      extends: base.extendsFrom,
      rules: base.rules,
    },
    commonjs: {
      ...commonjs.config,
      extends: commonjs.extendsFrom,
      rules: commonjs.rules,
    },
    esm: {
      ...esm.config,
      extends: esm.extendsFrom,
      rules: esm.rules,
    },
    demos: {
      ...base.config,
      extends: [...base.extendsFrom, ...tight.extendsFrom],
      rules: { ...base.rules, ...demos.rules },
    },

    "json:package": json.packageJSON,
    "json:eslintrc": json.eslintrcJSON,
    "json:vscode-settings": json.vscodeSettingsJSON,
    "json:tsconfig": json.tsconfigJSON,
    "json:default": json.jsonDefault,
    "jsonc:default": json.jsoncDefault,
    "json:parser": json.parser,
    "json:recommended": json.recommended,
  },
} satisfies ESLint.Plugin;
