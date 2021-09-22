import type { Main, RecursivePartial } from "tsparticles-engine";
import { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles-engine";
import { loadOptions } from "./options";
import { loadCircleShape } from "tsparticles-engine/Shapes/Circle";
import { loadColorUpdater } from "tsparticles-engine/Updaters/Color";
import { loadOpacityUpdater } from "tsparticles-engine/Updaters/Opacity";
import { loadOutModesUpdater } from "tsparticles-engine/Updaters/OutModes";
import { loadEmittersPlugin } from "tsparticles-engine/Plugins/Emitters/plugin";
import { loadSizeUpdater } from "tsparticles-engine/Updaters/Size";
import { loadWobbleUpdater } from "tsparticles-engine/Updaters/Wobble";
import { loadRollUpdater } from "tsparticles-engine/Updaters/Roll";
import { loadAngleUpdater } from "tsparticles-engine/Updaters/Angle";
import { loadTiltUpdater } from "tsparticles-engine/Updaters/Tilt";
import { loadSquareShape } from "tsparticles-engine/Shapes/Square";
import { loadLifeUpdater } from "tsparticles-engine/Updaters/Life";

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
