import type { Container, RecursivePartial } from "tsparticles-engine";
import { ConfettiOptions } from "./ConfettiOptions";
import type { EmitterContainer } from "tsparticles-plugin-emitters";
import type { IConfettiOptions } from "./IConfettiOptions";
import { loadCardsShape } from "tsparticles-shape-cards";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { loadHeartShape } from "tsparticles-shape-heart";
import { loadStarShape } from "tsparticles-shape-star";
import { tsParticles } from "tsparticles-engine";

export type ConfettiFirstParam = string | ConfettiOptions;

let initialized = false;
let initializing = false;

const ids = new Map<string, Container | undefined>();

type ConfettiParams = {
    canvas?: HTMLCanvasElement;
    id: string;
    options: RecursivePartial<IConfettiOptions>;
};

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

    await loadConfettiPreset(tsParticles);
    await loadStarShape(tsParticles);
    await loadHeartShape(tsParticles);
    await loadCardsShape(tsParticles);

    initializing = false;
    initialized = true;
}

async function setConfetti(params: ConfettiParams): Promise<Container | undefined> {
    const actualOptions = new ConfettiOptions();

    actualOptions.load(params.options);

    let container;

    if (ids.has(params.id)) {
        container = ids.get(params.id);

        if (container && !container.destroyed) {
            const alias = container as EmitterContainer;

            if (alias.addEmitter) {
                alias.addEmitter({
                    startCount: actualOptions.count,
                    position: actualOptions.position,
                    size: {
                        width: 0,
                        height: 0,
                    },
                    rate: {
                        delay: 0,
                        quantity: 0,
                    },
                    life: {
                        duration: 0.1,
                        count: 1,
                    },
                    particles: {
                        color: {
                            value: actualOptions.colors,
                        },
                        shape: {
                            type: actualOptions.shapes,
                            options: actualOptions.shapeOptions,
                        },
                        size: {
                            value: 5 * actualOptions.scalar,
                        },
                        life: {
                            duration: {
                                value: actualOptions.ticks / 60,
                            },
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
                            gravity: {
                                acceleration: actualOptions.gravity * 9.81,
                            },
                            speed: actualOptions.startVelocity * 3,
                            decay: 1 - actualOptions.decay,
                            direction: -actualOptions.angle,
                        },
                    },
                });

                return;
            }
        }
    }

    const particlesOptions = {
        preset: "confetti",
        fullScreen: {
            enable: !params.canvas,
            zIndex: actualOptions.zIndex,
        },
        particles: {
            color: {
                value: actualOptions.colors,
            },
            shape: {
                type: actualOptions.shapes,
            },
            size: {
                value: 5 * actualOptions.scalar,
            },
            life: {
                duration: {
                    value: actualOptions.ticks / 60,
                },
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
                gravity: {
                    acceleration: actualOptions.gravity * 9.81,
                },
                speed: actualOptions.startVelocity * 3,
                decay: 1 - actualOptions.decay,
                direction: -actualOptions.angle,
            },
        },
        motion: {
            disable: actualOptions.disableForReducedMotion,
        },
        emitters: {
            name: "confetti",
            startCount: actualOptions.count,
            position: actualOptions.position,
            size: {
                width: 0,
                height: 0,
            },
            rate: {
                delay: 0,
                quantity: 0,
            },
            life: {
                duration: 0.1,
                count: 1,
            },
        },
    };

    if (params.id) {
        container = await tsParticles.load(params.id, particlesOptions);
    } else if (params.canvas) {
        container = await tsParticles.set(params.id, params.canvas, particlesOptions);
    }

    ids.set(params.id, container);

    return container;
}

type ConfettiFunc = (
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
) => Promise<Container | undefined>;

export async function confetti(
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
): Promise<Container | undefined> {
    await initPlugins();

    let options: RecursivePartial<IConfettiOptions>;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = "confetti";
        options = idOrOptions;
    }

    return setConfetti({
        id,
        options,
    });
}

confetti.create = async (
    canvas: HTMLCanvasElement,
    options: RecursivePartial<IConfettiOptions>
): Promise<ConfettiFunc> => {
    if (!canvas) {
        return confetti;
    }

    await initPlugins();

    const id = canvas.getAttribute("id") || "confetti";

    canvas.setAttribute("id", id);

    setConfetti({
        id,
        canvas,
        options,
    });

    return confetti;
};
