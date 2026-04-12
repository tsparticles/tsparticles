import Vue from 'vue'
import Particles from '@tsparticles/vue2'
import type { Engine } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'

Vue.use(Particles, {
  init: async (engine: Engine) => {
    await loadFull(engine)
  },
})
