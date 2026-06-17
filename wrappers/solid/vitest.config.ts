import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        solidPlugin({
            hot: false,
            solid: { generate: "dom" },
        }),
    ],
    test: {
        watch: false,
        isolate: true,
        environment: "jsdom",
        include: ["test/*.test.{ts,tsx}"],
        exclude: ["test/server.test.{ts,tsx}"],
    },
    resolve: {
        conditions: ["browser", "development"],
    },
});
