import { Engine, tsParticles } from "@tsparticles/engine";
import { createResource, Resource } from "solid-js";
import type { IParticlesProps } from "./IParticlesProps";
import Particles from "./Particles";

// prettier-ignore
function initParticlesEngine(cb: (engine: Engine) => Promise<void>): Resource<true> {
    tsParticles.init();
    const [resource] = createResource(() => cb(tsParticles).then(() => true as const));
    return resource;
}

export default Particles;
export { initParticlesEngine, IParticlesProps, Particles };
