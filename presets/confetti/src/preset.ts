import { Engine, RecursivePartial, tsParticles } from "tsparticles-engine";
import { IConfettiOptions } from "./IConfettiOptions";
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

async function loadPreset(engine: Engine, confettiOptions: RecursivePartial<IConfettiOptions>, override = false): Promise<void> {
    await loadCircleShape(engine);
    await loadSquareShape(engine);
    await loadColorUpdater(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadEmittersPlugin(engine);
    await loadWobbleUpdater(engine);
    await loadRollUpdater(engine);
    await loadAngleUpdater(engine);
    await loadTiltUpdater(engine);
    await loadLifeUpdater(engine);

    await engine.addPreset("confetti", loadOptions(confettiOptions), override);
}

export function loadConfettiPreset(main: Engine): void {
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
