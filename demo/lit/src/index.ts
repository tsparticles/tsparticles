import { initParticlesEngine } from '@tsparticles/lit';
import { loadThemesPlugin } from '@tsparticles/plugin-themes';
import { loadFull } from 'tsparticles';

// Ensure the engine is initialized once before any <lit-particles> elements render.
// Calling without a callback lets the wrapper complete any internal async setup.
void initParticlesEngine(async (e) => {
  await loadFull(e);
  await loadThemesPlugin(e);
});
