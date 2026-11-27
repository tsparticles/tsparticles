/**
 * [[include:pjsMigration.md]]
 */
import type { Container, Engine } from "@tsparticles/engine";
import type { IParticlesJS } from "./VincentGarreau/IParticlesJS.js";
import { MBParticles } from "./marcbruederlin/Particles.js";
import { initParticlesJS } from "./VincentGarreau/particles.js";
import { loadFull } from "tsparticles";
import { loadResponsivePlugin } from "@tsparticles/plugin-responsive";

declare const __VERSION__: string;
/**
 * Initializes particles.js compatibility to the given engine
 * @param engine - the engine that requires particles.js compatibility
 * @returns the particles.js compatibility object
 */
export async function initPjs(engine: Engine): Promise<{
  Particles: { init: (options: Parameters<typeof MBParticles.init>[1]) => MBParticles };
  particlesJS: IParticlesJS;
  pJSDom: Container[];
}> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    await Promise.all([loadFull(e), loadResponsivePlugin(e)]);
  });

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { particlesJS, pJSDom } = initParticlesJS(engine);

  return { particlesJS, pJSDom, Particles: { init: options => MBParticles.init(engine, options) } };
}
