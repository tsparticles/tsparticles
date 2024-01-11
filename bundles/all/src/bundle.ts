import { loadAll } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

void loadAll(tsParticles);

export { loadAll };
export * from "@tsparticles/engine";
