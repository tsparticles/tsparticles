import type { Container, RecursivePartial } from "tsparticles-engine";
import { ConfettiOptions } from "./ConfettiOptions";
import type { EmitterContainer } from "tsparticles-plugin-emitters";
import type { IConfettiOptions } from "./IConfettiOptions";
import { loadCardsShape } from "tsparticles-shape-cards";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { loadHeartShape } from "tsparticles-shape-heart";
import { tsParticles } from "tsparticles-engine";

export type ConfettiFirstParam = string | ConfettiOptions;

let init = false;

const ids = new Map<string, Container | undefined>();

export async function confetti(
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
): Promise<Container | undefined> {
    if (!init) {
        init = true;

        await loadConfettiPreset(tsParticles);
        await loadCardsShape(tsParticles);
        await loadHeartShape(tsParticles);
    }

    let options: RecursivePartial<IConfettiOptions>;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = `confetti`;
        options = idOrOptions;
    }

    const actualOptions = new ConfettiOptions();

    actualOptions.load(options);

    let container;

    if (ids.has(id)) {
        container = ids.get(id);

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
                            speed: actualOptions.startVelocity,
                            decay: 1 - actualOptions.decay,
                            direction: -actualOptions.angle,
                        },
                    },
                });

                return;
            }
        }
    }

    container = await tsParticles.load(id, {
        preset: "confetti",
        fullScreen: {
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
                speed: actualOptions.startVelocity,
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
    });

    ids.set(id, container);

    return container;
}
