import type { Main } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadAbsorbersPlugin } from "tsparticles-engine/Plugins/Absorbers/plugin";
import { loadEmittersPlugin } from "tsparticles-engine/Plugins/Emitters/plugin";
import { loadPolygonMaskPlugin } from "tsparticles-engine/Plugins/PolygonMask/plugin";

export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
