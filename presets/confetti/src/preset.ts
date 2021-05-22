import type { Main, RecursivePartial } from "tsparticles";
import { loadConfettiShape } from "tsparticles-shape-confetti";
import { IConfettiOptions } from "./IConfettiOptions";
import { tsParticles } from "tsparticles";
import { loadOptions } from "./options";

function loadPreset(main: Main, confettiOptions: RecursivePartial<IConfettiOptions>): void {
    loadConfettiShape(main);

    main.addPreset("confetti", loadOptions(confettiOptions));
}

export function loadConfettiCannonPreset(main: Main): void {
    loadPreset(main, {});
}

export function confetti(id: string, confettiOptions: RecursivePartial<IConfettiOptions>): void {
    loadPreset(tsParticles, confettiOptions);

    tsParticles.load(id, { preset: "confetti" });
}
