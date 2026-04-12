import { defineNuxtPlugin } from '#app'
import Particles from '@tsparticles/vue3'
import { registerParticles } from '~/utils/particlesInit'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Particles, {
    init: registerParticles,
  })
})
