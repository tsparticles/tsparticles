import Particles from './Particles.svelte';
import { initParticlesEngine, type ParticlesPluginRegistrar } from './utils.js';

export type { ParticlesPluginRegistrar };

export { Particles as default, initParticlesEngine, initParticlesEngine as particlesInit };
