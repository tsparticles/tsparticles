import { confetti, loadConfettiPreset } from "./preset";
import type { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles";

loadConfettiPreset(tsParticles);

export { confetti, loadConfettiPreset, tsParticles, IConfettiOptions };
