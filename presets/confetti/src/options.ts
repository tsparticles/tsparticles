import type { ISourceOptions, RecursivePartial } from "tsparticles";
import { IConfettiOptions } from "./IConfettiOptions";
import { ConfettiOptions } from "./ConfettiOptions";

export const loadOptions = (confettiOptions: RecursivePartial<IConfettiOptions>): ISourceOptions => {
    const actualOptions = new ConfettiOptions();

    actualOptions.load(confettiOptions);

    return {
        fullScreen: {
            enable: true,
            zIndex: actualOptions.zIndex,
        },
        fpsLimit: 60,
        particles: {
            number: {
                value: 0,
            },
            color: {
                value: actualOptions.colors,
            },
            shape: {
                type: actualOptions.shapes,
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
                value: 5 * actualOptions.scalar,
            },
            links: {
                enable: false,
            },
            life: {
                duration: {
                    sync: true,
                    value: actualOptions.ticks / 60,
                },
                count: 1,
            },
            move: {
                angle: {
                    value: actualOptions.spread,
                    offset: 0,
                },
                drift: {
                    min: -actualOptions.drift,
                    max: actualOptions.drift,
                },
                enable: true,
                gravity: {
                    enable: true,
                    acceleration: actualOptions.gravity * 9.81,
                },
                speed: actualOptions.startVelocity,
                decay: 1 - actualOptions.decay,
                direction: -actualOptions.angle,
                random: true,
                straight: false,
                outModes: {
                    default: "none",
                    bottom: "destroy",
                },
            },
            rotate: {
                value: 0,
                direction: "random",
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            tilt: {
                direction: "random",
                enable: true,
                value: 0,
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            wobble: {
                distance: 30,
                enable: true,
                speed: {
                    min: -15,
                    max: 15,
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
        motion: {
            disable: actualOptions.disableForReducedMotion,
        },
        emitters: {
            rate: {
                delay: 0.1,
                quantity: actualOptions.count,
            },
            position: actualOptions.position,
            size: {
                width: 0,
                height: 0,
            },
            life: {
                count: 1,
                duration: actualOptions.ticks / 60,
            },
        },
    };
};
