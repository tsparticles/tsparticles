import type { Main, RecursivePartial } from "tsparticles";
import { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles";
import { loadOptions } from "./options";

function loadPreset(main: Main, confettiOptions: RecursivePartial<IConfettiOptions>, override = false): void {
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
        id = `tsparticles_${ Math.floor(Math.random() * 1000) }`;
        options = idOrOptions;
    }

    loadPreset(tsParticles, options, true);

    tsParticles.load(id, { preset: "confetti" });
}
