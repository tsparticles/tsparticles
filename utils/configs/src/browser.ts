import configs, { loadConfigs } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  tsParticles?: { loadConfigs?: typeof loadConfigs };
};

globalObject.tsParticles = { ...globalObject.tsParticles, loadConfigs };

export { loadConfigs };
export default configs;
