import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "eslint-config-next";

export default defineConfig([
  ...nextPlugin,
  globalIgnores([".next/**", "node_modules/**", "out/**"]),
]);
