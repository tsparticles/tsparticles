import { tsParticles } from "tsparticles";
import { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";

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

const data: RecursivePartial<IOptions> = {
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

tsParticles.addPreset("fontAwesome", data);
tsParticles.addPreset("font-awesome", data);
