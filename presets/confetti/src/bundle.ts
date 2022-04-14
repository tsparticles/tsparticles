import { confetti, loadConfettiPreset } from "./index";
import type { ConfettiOptions } from "./index";
import { tsParticles } from "tsparticles-engine";

loadConfettiPreset(tsParticles);

export { confetti, loadConfettiPreset, tsParticles, ConfettiOptions };
