import type { Main } from "./main";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers/plugin";
import { loadEmittersPlugin } from "./Plugins/Emitters/plugin";
import { loadInfectionPlugin } from "./Plugins/Infection/plugin";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask/plugin";
import { loadSlim } from "./slim";

export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadInfectionPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
