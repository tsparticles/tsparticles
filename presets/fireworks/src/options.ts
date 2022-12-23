import type {
    CustomEventArgs,
    IParticlesOptions,
    IRangeValue,
    ISourceOptions,
    Particle,
    RangeValue,
    RecursivePartial,
} from "tsparticles-engine";
import {
    DestroyType,
    EventType,
    MoveDirection,
    OutMode,
    StartValueType,
    rgbToHsl,
    setRangeValue,
    stringToRgb,
} from "tsparticles-engine";

const explodeSoundCheck = (args: CustomEventArgs): boolean => {
    const data = args.data as { particle: Particle };

    return data.particle.shape === "line";
};

const fixRange = (value: IRangeValue, min: number, max: number): RangeValue => {
    const diffSMax = value.max > max ? value.max - max : 0;
    let res = setRangeValue(value);

    if (diffSMax) {
        res = setRangeValue(value.min - diffSMax, max);
    }

    const diffSMin = value.min < min ? value.min : 0;

    if (diffSMin) {
        res = setRangeValue(0, value.max + diffSMin);
    }

    return res;
};

const fireworksOptions: RecursivePartial<IParticlesOptions>[] = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
    .map((color) => {
        const rgb = stringToRgb(color);

        if (!rgb) {
            return undefined;
        }

        const hsl = rgbToHsl(rgb),
            sRange = fixRange({ min: hsl.s - 30, max: hsl.s + 30 }, 0, 100),
            lRange = fixRange({ min: hsl.l - 30, max: hsl.l + 30 }, 0, 100);

        return {
            color: {
                value: {
                    h: hsl.h,
                    s: sRange,
                    l: lRange,
                },
            },
            stroke: {
                width: 0,
            },
            number: {
                value: 0,
            },
            opacity: {
                value: {
                    min: 0.1,
                    max: 1,
                },
                animation: {
                    enable: true,
                    speed: 0.7,
                    sync: false,
                    startValue: StartValueType.max,
                    destroy: DestroyType.min,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2 },
                animation: {
                    enable: true,
                    speed: 5,
                    count: 1,
                    sync: false,
                    startValue: StartValueType.min,
                    destroy: DestroyType.none,
                },
            },
            life: {
                count: 1,
                duration: {
                    value: {
                        min: 1,
                        max: 2,
                    },
                },
            },
            move: {
                decay: { min: 0.075, max: 0.1 },
                enable: true,
                gravity: {
                    enable: true,
                    inverse: false,
                    acceleration: 5,
                },
                speed: { min: 5, max: 15 },
                direction: "none",
                outModes: OutMode.destroy,
            },
        } as RecursivePartial<IParticlesOptions>;
    })
    .filter((t) => t !== undefined) as RecursivePartial<IParticlesOptions>[];

export const options: ISourceOptions = {
    detectRetina: true,
    background: {
        color: "#000",
    },
    fpsLimit: 120,
    emitters: {
        direction: MoveDirection.top,
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.1,
        },
        rate: {
            delay: 0.05,
            quantity: 1,
        },
        size: {
            width: 100,
            height: 0,
        },
        position: {
            y: 100,
            x: 50,
        },
    },
    particles: {
        number: {
            value: 0,
        },
        destroy: {
            mode: "split",
            bounds: {
                top: { min: 10, max: 30 },
            },
            split: {
                sizeOffset: false,
                count: 1,
                factor: {
                    value: 0.333333,
                },
                rate: {
                    value: { min: 75, max: 150 },
                },
                particles: fireworksOptions,
            },
        },
        life: {
            count: 1,
        },
        shape: {
            type: "line",
        },
        size: {
            value: {
                min: 0.1,
                max: 50,
            },
            animation: {
                enable: true,
                sync: true,
                speed: 90,
                startValue: StartValueType.max,
                destroy: DestroyType.min,
            },
        },
        stroke: {
            color: {
                value: "#ffffff",
            },
            width: 1,
        },
        rotate: {
            path: true,
        },
        move: {
            enable: true,
            gravity: {
                acceleration: 15,
                enable: true,
                inverse: true,
                maxSpeed: 100,
            },
            speed: {
                min: 10,
                max: 20,
            },
            outModes: {
                default: OutMode.destroy,
                top: OutMode.none,
            },
            trail: {
                fillColor: "#000",
                enable: true,
                length: 10,
            },
        },
    },
    sounds: {
        enable: true,
        events: [
            {
                event: EventType.particleRemoved,
                filter: explodeSoundCheck,
                audio: [
                    "https://particles.js.org/audio/explosion0.mp3",
                    "https://particles.js.org/audio/explosion1.mp3",
                    "https://particles.js.org/audio/explosion2.mp3",
                ],
            },
        ],
        volume: 50,
    },
};
