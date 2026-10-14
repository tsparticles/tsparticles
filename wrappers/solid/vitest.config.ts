import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const ssr = mode === "ssr";

  return {
    plugins: [
      solidPlugin({
        hot: false,
        solid: { generate: ssr ? "ssr" : "dom" },
      }),
    ],
    test: {
      watch: false,
      isolate: true,
      environment: ssr ? "node" : "jsdom",
      include: ssr ? ["test/server.test.tsx"] : ["test/index.test.tsx", "test/contract.test.tsx"],
      setupFiles: ssr ? [] : ["@testing-library/jest-dom/vitest", "test/setup.ts"],
    },
    resolve: {
      conditions: ["browser", "development"],
    },
  };
});
