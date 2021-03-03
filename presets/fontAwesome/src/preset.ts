import type { Main, ISourceOptions } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";

interface ICharacterShape extends IShapeValues {
    font: string;
    style: string;
    weight: string;
}

const characterOptions: ICharacterShape = {
    fill: true,
    font: "Font Awesome 5 Free",
    style: "",
    weight: "400",
};

const data: ISourceOptions = {
    particles: {
        shape: {
            type: "character",
            options: {
                character: characterOptions,
            },
        },
        size: {
            random: false,
            value: 16,
        },
    },
};

export function loadFontAwesomePreset(tsParticles: Main): void {
    tsParticles.addPreset("fontAwesome", data);
    tsParticles.addPreset("font-awesome", data);
}
