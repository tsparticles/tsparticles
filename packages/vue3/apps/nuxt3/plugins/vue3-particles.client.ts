import Particles from '@tsparticles/vue3'
import { loadFull } from "tsparticles";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    // Doing something with nuxtApp
    nuxtApp.vueApp.use(Particles, {
        init: async (engine) => {
            await loadFull(engine);
        }
    })
})
