import type { Engine, RecursivePartial } from "tsparticles";
import { IConfettiOptions } from "./IConfettiOptions";
import { loadOptions } from "./options";
import { tsParticles } from "tsparticles";

function loadPreset(engine: Engine, confettiOptions: RecursivePartial<IConfettiOptions>, override = false): void {
    engine.addPreset("confetti", loadOptions(confettiOptions), override);
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
