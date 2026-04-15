import Particles from "./Particles.js";

export type { IParticlesProps } from "./IParticlesProps.js";

export default Particles;
export { Particles };

export {
  type IParticlesProviderProps,
  type ParticlesPluginRegistrar,
  ParticlesProvider,
  useParticlesProvider,
} from "./ParticlesProvider.js";
