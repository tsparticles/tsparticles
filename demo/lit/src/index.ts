import {engine} from './particlesEngine';
import {initParticlesEngine} from '@tsparticles/lit';
import {loadFull} from 'tsparticles';
import {loadThemesPlugin} from '@tsparticles/plugin-themes';

// Ensure the engine is initialized once before any <lit-particles .engine=${engine}> elements render.
// Calling without a callback lets the wrapper complete any internal async setup.
void initParticlesEngine(engine, async (e) => {
  await loadFull(e);
  await loadThemesPlugin(e);
});
