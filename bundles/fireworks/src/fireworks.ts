import {
    type Container,
    type CustomEventArgs,
    DestroyType,
    type Engine,
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

declare const __VERSION__: string;

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
            create: (
                canvas: HTMLCanvasElement,
                options: RecursivePartial<IFireworkOptions>,
            ) => Promise<FireworksInstance | undefined>;
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
 * @param engine - the engine to use for loading all plugins
 */
async function initPlugins(engine: Engine): Promise<void> {
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

    engine.checkVersion(__VERSION__);

    await loadEmittersPlugin(engine, false);
    await loadEmittersShapeSquare(engine, false);
    await loadSoundsPlugin(engine, false);
    await loadRotateUpdater(engine, false);
    await loadDestroyUpdater(engine, false);
    await loadLifeUpdater(engine, false);
    await loadTrailEffect(engine, false);
    await loadBasic(engine, false);

    initializing = false;
    initialized = true;
}

export type { FireworksInstance };

/**
 *
 * @param options -
 * @param canvas -
 * @returns the options for the tsParticles instance
 */
function getOptions(options: IFireworkOptions, canvas?: HTMLCanvasElement): ISourceOptions {
    const identity = 1;

    return {
        detectRetina: true,
        background: {
            color: options.background,
        },
        fullScreen: {
            enable: !!canvas,
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
}

/**
 *
 * @param id -
 * @param sourceOptions -
 * @param canvas -
 * @returns the loaded instance
 */
async function getFireworksInstance(
    id: string,
    sourceOptions: RecursivePartial<IFireworkOptions>,
    canvas?: HTMLCanvasElement,
): Promise<FireworksInstance | undefined> {
    await initPlugins(tsParticles);

    const options = new FireworkOptions();

    options.load(sourceOptions);

    const particlesOptions = getOptions(options, canvas),
        container = await tsParticles.load({ id, element: canvas, options: particlesOptions });

    if (!container) {
        return;
    }

    return new FireworksInstance(container);
}

/**
 * @param idOrOptions - the id used for displaying the animation, or the animation configuration if an id is not necessary
 * @param sourceOptions - the animation configuration if an id is provided
 * @returns the loaded instance
 */
export async function fireworks(
    idOrOptions?: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> {
    let id: string;
    let options: RecursivePartial<IFireworkOptions>;

    if (isString(idOrOptions)) {
        id = idOrOptions;
        options = sourceOptions ?? {};
    } else {
        id = "fireworks";
        options = idOrOptions ?? {};
    }

    return getFireworksInstance(id, options);
}

fireworks.create = async (
    canvas: HTMLCanvasElement,
    options?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> => {
    const id = canvas.id || "fireworks";

    return getFireworksInstance(id, options ?? {}, canvas);
};

fireworks.init = async (): Promise<void> => {
    await initPlugins(tsParticles);
};

fireworks.version = __VERSION__;

if (!isSsr()) {
    window.fireworks = fireworks;
}
