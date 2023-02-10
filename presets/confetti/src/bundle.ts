import { loadConfettiPreset } from "./index";
import { tsParticles } from "tsparticles-engine";

(async (): Promise<void> => {
    await loadConfettiPreset(tsParticles);
})();

export { loadConfettiPreset, tsParticles };
