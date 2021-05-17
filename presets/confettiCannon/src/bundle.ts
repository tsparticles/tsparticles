import { loadConfettiCannonPreset, createCannon } from "./preset";
import { tsParticles } from "tsparticles";

loadConfettiCannonPreset(tsParticles);

export { createCannon, loadConfettiCannonPreset, tsParticles };
