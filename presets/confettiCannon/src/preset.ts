import type { ISourceOptions, Main, RecursivePartial } from "tsparticles-engine";
import { loadConfettiShape } from "tsparticles-shape-confetti";
import { ICannonOptions } from "./ICannonOptions";
import { MoveDirection, tsParticles, deepExtend } from "tsparticles-engine";

function loadPreset(main: Main, cannonOptions: RecursivePartial<ICannonOptions>): void {
    loadConfettiShape(main);

    const defaultCannonOptions: ICannonOptions = {
        count: 50,
        position: {
            x: 50,
            y: 50,
        },
    };
    const actualOptions = deepExtend(defaultCannonOptions, cannonOptions) as ICannonOptions;
    const options: ISourceOptions = {
        fpsLimit: 60,
        particles: {
            number: {
                value: 0,
            },
            color: {
                value: ["#ffffff", "#ff0000"],
            },
            shape: {
                type: "confetti",
                options: {
                    confetti: {
                        type: ["circle", "square"],
                    },
                },
            },
            opacity: {
                value: 1,
                animation: {
                    enable: true,
                    minimumValue: 0,
                    speed: 2,
                    startValue: "max",
                    destroy: "min",
                },
            },
            size: {
                value: 7,
                random: {
                    enable: true,
                    minimumValue: 3,
                },
            },
            links: {
                enable: false,
            },
            life: {
                duration: {
                    sync: true,
                    value: 5,
                },
                count: 1,
            },
            move: {
                drift: {
                    min: -2,
                    max: 2,
                },
                enable: true,
                gravity: {
                    enable: true,
                },
                speed: {
                    min: 50,
                    max: 100,
                },
                decay: 0.1,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default: "destroy",
                    top: "none",
                },
            },
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                resize: true,
            },
        },
        detectRetina: true,
        background: {
            color: "#000",
        },
        emitters: {
            direction: MoveDirection.top,
            rate: {
                delay: 0.1,
                quantity: actualOptions.count,
            },
            position: actualOptions.position,
            size: {
                width: 0,
                height: 0,
            },
        },
    };

    main.addPreset("confetti-cannon", options);
}

export function loadConfettiCannonPreset(main: Main): void {
    loadPreset(main, {});
}

export function createCannon(id: string, cannonOptions: RecursivePartial<ICannonOptions>): void {
    loadPreset(tsParticles, cannonOptions);

    tsParticles.load(id, { preset: "confetti-cannon" });
}
