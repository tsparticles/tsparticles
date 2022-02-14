import { confetti, loadConfettiPreset } from "./preset";
import type { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles-engine";

loadConfettiPreset(tsParticles);

export { confetti, loadConfettiPreset, tsParticles, IConfettiOptions };
