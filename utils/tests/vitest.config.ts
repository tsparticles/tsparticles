import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["src/tests/*.ts"],
        environment: "jsdom",
        poolOptions: {
            threads: {
                singleThread: true,
            }
        },
        coverage: {
            provider: "v8",
            enabled: true,
        }
    },
});
