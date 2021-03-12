import { tsParticles } from "tsparticles-engine";
import { loadInfectionPlugin } from "./plugin";

loadInfectionPlugin(tsParticles);

export { loadInfectionPlugin, tsParticles };
