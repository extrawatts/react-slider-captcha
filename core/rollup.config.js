import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./lib/cjs/index.js",
      format: "cjs",
    },
    {
      file: "./lib/esm/index.js",
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      typescript: require("typescript"),
    }),
  ],
};
