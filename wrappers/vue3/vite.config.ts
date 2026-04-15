import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/components/index.ts"),
            name: "@tsparticles/vue3",
            fileName: format => `particles.${format}.js`,
        },
        rollupOptions: {
            external: [ "vue", "@tsparticles/engine" ],
            output: {
                // Provide global variables to use in the UMD build
                // Add external deps here
                globals: {
                    vue: "Vue",
                    "@tsparticles/engine": "tsParticles",
                },
            },
        },
    },
    plugins: [ vue(), vueJsx(), dts() ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
