import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: { jsx: { runtime: "classic" } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
