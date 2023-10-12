import type { Linter } from "eslint";

type RuleSpec = string | string[];
type RuleReplacement = Linter.RuleEntry | Record<string, unknown>;

interface DisableRules {
  untyped?: RuleSpec | undefined;
  typed?: RuleSpec | undefined;
  both?: RuleSpec | undefined;
}

export default class Rules {
  static build(callback: (rules: Rules) => Rules): Linter.RulesRecord {
    const rules = new Rules();
    callback(rules);
    return rules.#rules;
  }

  #rules: Linter.RulesRecord = {};

  replace(rule: RuleSpec, entry: RuleReplacement = "error"): Rules {
    if (Array.isArray(rule)) {
      rule.forEach((r) => this.replace(r, entry));
    } else {
      this.#rules[rule] = "off";

      if (Array.isArray(entry) || typeof entry === "string") {
        this.#rules[`@typescript-eslint/${rule}`] = entry;
      } else {
        this.#rules[`@typescript-eslint/${rule}`] = ["error", entry];
      }
    }

    return this;
  }

  typed(rule: RuleSpec, entry: RuleReplacement = "error"): Rules {
    if (Array.isArray(rule)) {
      rule.forEach((r) => this.typed(r, entry));
    } else {
      if (Array.isArray(entry) || typeof entry === "string") {
        this.#rules[`@typescript-eslint/${rule}`] = entry;
      } else {
        this.#rules[`@typescript-eslint/${rule}`] = ["error", entry];
      }
    }

    return this;
  }

  disable(rules: DisableRules): Rules {
    const { untyped, typed, both } = rules;

    this.#disableUntyped(untyped);
    this.#disableUntyped(both);

    this.#disableTyped(typed);
    this.#disableTyped(both);

    return this;
  }

  #disableUntyped(rules: RuleSpec | undefined) {
    if (rules === undefined) {
      return;
    }

    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        this.#rules[rule] = "off";
      });
    } else {
      this.#rules[rules] = "off";
    }
  }

  #disableTyped(rules: RuleSpec | undefined) {
    if (rules === undefined) {
      return;
    }

    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        this.#rules[`@typescript-eslint/${rule}`] = "off";
      });
    } else {
      this.#rules[`@typescript-eslint/${rules}`] = "off";
    }
  }
}
