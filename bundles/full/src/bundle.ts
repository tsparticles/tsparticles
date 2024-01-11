import { loadFull } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

void loadFull(tsParticles);

export { loadFull };

export * from "@tsparticles/slim";
export * from "@tsparticles/engine";
