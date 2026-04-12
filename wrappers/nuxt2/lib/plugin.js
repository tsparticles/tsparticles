import Vue from "vue";
import VueParticles from "@tsparticles/vue2";
import { registerParticles } from "<%= options.initPath %>";

Vue.use(VueParticles, {
  init: registerParticles,
});
