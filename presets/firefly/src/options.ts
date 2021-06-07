import type { ISourceOptions } from "tsparticles";
import { ClickMode, DestroyType, StartValueType, InteractivityDetect } from "tsparticles";

export const options: ISourceOptions = {
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#fff",
        },
        opacity: {
            value: 1,
            animation: {
                enable: true,
                startValue: StartValueType.max,
                destroy: DestroyType.min,
                speed: 0.3,
                sync: true,
            },
        },
        size: {
            value: {
                min: 3,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 3,
            random: false,
        },
    },
    interactivity: {
        detectsOn: InteractivityDetect.window,
        events: {
            onHover: {
                enable: true,
                mode: ClickMode.trail,
            },
            resize: true,
        },
        modes: {
            trail: {
                delay: 0.5,
                pauseOnStop: true,
                quantity: 4,
            },
        },
    },
    background: {
        color: "#000",
    },
};
