import type { Main, RecursivePartial } from "tsparticles-engine";
import { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles-engine";
import { loadOptions } from "./options";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadLifeUpdater } from "tsparticles-updater-life";

function loadPreset(main: Main, confettiOptions: RecursivePartial<IConfettiOptions>, override = false): void {
    loadCircleShape(tsParticles);
    loadSquareShape(tsParticles);
    loadColorUpdater(tsParticles);
    loadSizeUpdater(tsParticles);
    loadOpacityUpdater(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadWobbleUpdater(tsParticles);
    loadRollUpdater(tsParticles);
    loadAngleUpdater(tsParticles);
    loadTiltUpdater(tsParticles);
    loadLifeUpdater(tsParticles);

    main.addPreset("confetti", loadOptions(confettiOptions), override);
}

export function loadConfettiPreset(main: Main): void {
    loadPreset(main, {}, true);
}

type ConfettiOptions = RecursivePartial<IConfettiOptions>;
type ConfettiFirstParam = string | ConfettiOptions;

export function confetti(idOrOptions: ConfettiFirstParam, confettiOptions?: RecursivePartial<IConfettiOptions>): void {
    let options: ConfettiOptions;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = `tsparticles_${Math.floor(Math.random() * 1000)}`;
        options = idOrOptions;
    }

    loadPreset(tsParticles, options, true);

    tsParticles.load(id, { preset: "confetti" });
}
