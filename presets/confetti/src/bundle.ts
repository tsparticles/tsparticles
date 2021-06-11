import { loadConfettiPreset, confetti } from "./preset";
import { tsParticles } from "tsparticles";
import type { IConfettiOptions } from "./IConfettiOptions";

loadConfettiPreset(tsParticles);

export { confetti, loadConfettiPreset, tsParticles, IConfettiOptions };
