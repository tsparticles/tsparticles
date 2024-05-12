import {
    type Container,
    type CustomEventArgs,
    DestroyType,
    EventType,
    type ISourceOptions,
    MoveDirection,
    OutMode,
    type Particle,
    type RecursivePartial,
    StartValueType,
    getRangeMax,
    getRangeMin,
    isNumber,
    isSsr,
    isString,
    setRangeValue,
    tsParticles,
} from "@tsparticles/engine";
import { FireworkOptions } from "./FireworkOptions.js";
import type { IFireworkOptions } from "./IFireworkOptions.js";
import { loadBasic } from "@tsparticles/basic";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";
import { loadTrailEffect } from "@tsparticles/effect-trail";

const minSplitCount = 2;

let initialized = false;
let initializing = false;

type FireworksFunc = ((
    idOrOptions: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>,
) => Promise<FireworksInstance | undefined>) & {
    version: string;
};

declare global {
    interface Window {
        fireworks: FireworksFunc & {
            init: () => Promise<void>;
            version: string;
        };
    }
}

const explodeSoundCheck = (args: CustomEventArgs): boolean => {
    const data = args.data as { particle: Particle & { splitCount?: number } };

    return data.particle.shape === "circle" && !!data.particle.splitCount && data.particle.splitCount < minSplitCount;
};

class FireworksInstance {
    private readonly _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    pause(): void {
        this._container.pause();
    }

    play(): void {
        this._container.play();
    }

    stop(): void {
        this._container.stop();
    }
}

/**
 */
async function initPlugins(): Promise<void> {
    if (initialized) {
        return;
    }

    if (initializing) {
        return new Promise<void>(resolve => {
            const timeout = 100,
                interval = setInterval(() => {
                    if (!initialized) {
                        return;
                    }

                    clearInterval(interval);
                    resolve();
                }, timeout);
        });
    }

    initializing = true;

    await loadEmittersPlugin(tsParticles, false);
    await loadEmittersShapeSquare(tsParticles, false);
    await loadSoundsPlugin(tsParticles, false);
    await loadRotateUpdater(tsParticles, false);
    await loadDestroyUpdater(tsParticles, false);
    await loadLifeUpdater(tsParticles, false);
    await loadTrailEffect(tsParticles, false);
    await loadBasic(tsParticles, false);

    initializing = false;
    initialized = true;
}

export type { FireworksInstance };

/**
 * @param idOrOptions - the id used for displaying the animation, or the animation configuration if an id is not necessary
 * @param sourceOptions - the animation configuration if an id is provided
 * @returns the loaded instance
 */
export async function fireworks(
    idOrOptions: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> {
    await initPlugins();

    let id: string;

    const options = new FireworkOptions();

    if (isString(idOrOptions)) {
        id = idOrOptions;
        options.load(sourceOptions);
    } else {
        id = "fireworks";
        options.load(idOrOptions);
    }

    const identity = 1,
        particlesOptions: ISourceOptions = {
            detectRetina: true,
            background: {
                color: options.background,
            },
            fpsLimit: 60,
            emitters: {
                direction: MoveDirection.top,
                life: {
                    count: 0,
                    duration: 0.1,
                    delay: 0.1,
                },
                rate: {
                    delay: isNumber(options.rate)
                        ? identity / options.rate
                        : { min: identity / getRangeMin(options.rate), max: identity / getRangeMax(options.rate) },
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
                color: {
                    value: "#fff",
                },
                destroy: {
                    mode: "split",
                    bounds: {
                        top: setRangeValue(options.minHeight),
                    },
                    split: {
                        sizeOffset: false,
                        count: 1,
                        factor: {
                            value: 0.333333,
                        },
                        rate: {
                            value: options.splitCount,
                        },
                        colorOffset: {
                            s: options.saturation,
                            l: options.brightness,
                        },
                        particles: {
                            color: {
                                value: options.colors,
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
                                    speed: 1,
                                    sync: false,
                                    startValue: StartValueType.max,
                                    destroy: DestroyType.min,
                                },
                            },
                            effect: {
                                type: "trail",
                                options: {
                                    trail: {
                                        length: {
                                            min: 5,
                                            max: 10,
                                        },
                                    },
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
                                        min: 0.25,
                                        max: 0.5,
                                    },
                                },
                            },
                            move: {
                                decay: { min: 0.05, max: 0.1 },
                                enable: true,
                                gravity: {
                                    enable: true,
                                    inverse: false,
                                    acceleration: setRangeValue(options.gravity),
                                },
                                speed: setRangeValue(options.speed),
                                direction: "none",
                                outModes: OutMode.destroy,
                            },
                        },
                    },
                },
                life: {
                    count: 1,
                },
                effect: {
                    type: "trail",
                    options: {
                        trail: {
                            length: {
                                min: 10,
                                max: 30,
                            },
                            minWidth: 1,
                            maxWidth: 1,
                        },
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: 1,
                },
                opacity: {
                    value: 0.5,
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
                },
            },
            sounds: {
                enable: options.sounds,
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

    const container = await tsParticles.load({ id, options: particlesOptions });

    if (!container) {
        return;
    }

    return new FireworksInstance(container);
}

fireworks.init = async (): Promise<void> => {
    await initPlugins();
};

fireworks.version = tsParticles.version;

if (!isSsr()) {
    window.fireworks = fireworks;
}
