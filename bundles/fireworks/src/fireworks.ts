import type { Container, CustomEventArgs, ISourceOptions, Particle, RecursivePartial } from "tsparticles-engine";
import {
    DestroyType,
    EventType,
    MoveDirection,
    OutMode,
    StartValueType,
    getRangeMax,
    getRangeMin,
    setRangeValue,
    tsParticles,
} from "tsparticles-engine";
import { FireworkOptions } from "./FireworkOptions";
import type { IFireworkOptions } from "./IFireworkOptions";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadDestroyUpdater } from "tsparticles-updater-destroy";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadLineShape } from "tsparticles-shape-line";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSoundsPlugin } from "tsparticles-plugin-sounds";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";

let initialized = false;
let initializing = false;

const explodeSoundCheck = (args: CustomEventArgs): boolean => {
    const data = args.data as { particle: Particle };

    return data.particle.shape === "line";
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

async function initPlugins(): Promise<void> {
    if (initialized) {
        return;
    }

    if (initializing) {
        return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (initialized) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    initializing = true;

    await loadBaseMover(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadSoundsPlugin(tsParticles);
    await loadCircleShape(tsParticles);
    await loadLineShape(tsParticles);
    await loadAngleUpdater(tsParticles);
    await loadColorUpdater(tsParticles);
    await loadDestroyUpdater(tsParticles);
    await loadLifeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadStrokeColorUpdater(tsParticles);

    initializing = false;
    initialized = true;
}

export async function fireworks(
    idOrOptions: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>
): Promise<FireworksInstance | undefined> {
    await initPlugins();

    let id: string;

    const options = new FireworkOptions();

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options.load(sourceOptions);
    } else {
        id = "fireworks";
        options.load(idOrOptions);
    }

    const particlesOptions: ISourceOptions = {
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
                delay:
                    typeof options.rate === "number"
                        ? 1 / options.rate
                        : { min: 1 / getRangeMin(options.rate), max: 1 / getRangeMax(options.rate) },
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
                value: options.colors,
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
                width: 0.5,
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

    const container = await tsParticles.load(id, particlesOptions);

    if (!container) {
        return;
    }

    return new FireworksInstance(container);
}
