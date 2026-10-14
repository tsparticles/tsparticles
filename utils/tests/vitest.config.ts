import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["src/tests/*.ts"],
        setupFiles: ["./src/setup.ts"],
        environment: "jsdom",
        maxWorkers: 1,
        coverage: {
            provider: "v8",
            enabled: true,
        }
    },
});
