import { type Engine, tsParticles } from '@tsparticles/engine';
import Particles from './Particles.svelte';
import { initialized } from './utils.js';

async function particlesInit(init: (engine: Engine) => Promise<void>): Promise<void> {
	tsParticles.init();

	await init(tsParticles);

	initialized.set(true);
}

export { Particles as default, particlesInit };
