import { HoverMode, tsParticles } from "tsparticles";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";

const data: RecursivePartial<IOptions> = {
    backgroundMask: {
        cover: {
            value: "#ffffff",
        },
        enable: true,
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: HoverMode.bubble,
            },
        },
        modes: {
            bubble: {
                distance: 400,
                size: 100,
            },
        },
    },
    particles: {
        move: {
            enable: true,
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 30,
        },
    },
};

tsParticles.addPreset('backgroundMask', data);
tsParticles.addPreset('background-mask', data);
