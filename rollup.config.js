import { defineConfig } from "rollup";
import { swc } from "rollup-plugin-swc3";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: "dist/index.cjs",
    },
    {
      format: "esm",
      file: "dist/index.js",
    },
  ],
  external: () => {
    return false;
  },
  plugins: [swc({})],
});
