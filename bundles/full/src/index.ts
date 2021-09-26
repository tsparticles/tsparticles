import type { Main } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";

export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
