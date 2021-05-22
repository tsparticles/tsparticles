import { loadConfettiCannonPreset, confetti } from "./preset";
import { tsParticles } from "tsparticles";
import type { IConfettiOptions } from "./IConfettiOptions";

loadConfettiCannonPreset(tsParticles);

export { confetti, loadConfettiCannonPreset, tsParticles, IConfettiOptions };
