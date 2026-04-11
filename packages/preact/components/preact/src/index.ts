import Particles from "./Particles";
import { type Engine, tsParticles } from "@tsparticles/engine";

export type { IParticlesProps } from "./IParticlesProps";
export type { IParticlesState } from "./IParticlesState";

async function initParticlesEngine(cb: (engine: Engine) => Promise<void>): Promise<void> {
    tsParticles.init();

    await cb(tsParticles);
}

export default Particles;
export { Particles, initParticlesEngine };
