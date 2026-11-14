import { loadConfigs } from "@tsparticles/configs";
import { createEngine } from "@tsparticles/engine";

export const engine = createEngine();

loadConfigs(engine);
