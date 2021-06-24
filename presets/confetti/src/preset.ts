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

export function confetti(id: string, confettiOptions: RecursivePartial<IConfettiOptions>): void {
    loadPreset(tsParticles, confettiOptions, true);

    tsParticles.load(id, { preset: "confetti" });
}
