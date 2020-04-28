import type { Container } from "../../Container";
import type { IBubblerProcessParam } from "../../../Interfaces/IBubblerProcessParam";
import { ProcessBubbleType } from "../../../Enums/ProcessBubbleType";
import { Utils } from "../../Utils/Utils";
import { HoverMode } from "../../../Enums/Modes/HoverMode";
import { ClickMode } from "../../../Enums/Modes/ClickMode";
import { Constants } from "../../Utils/Constants";
import type { IParticle } from "../../../Interfaces/IParticle";
import { ColorUtils } from "../../Utils/ColorUtils";
import { Particle } from "../../Particle";

/**
 * Particle bubble manager
 */
export class Bubbler {
    public static reset(particle: IParticle): void {
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }

    public static bubble(container: Container): void {
        const options = container.options;
        const hoverEnabled = options.interactivity.events.onHover.enable;
        const hoverMode = options.interactivity.events.onHover.mode;
        const clickEnabled = options.interactivity.events.onClick.enable;
        const clickMode = options.interactivity.events.onClick.mode;

        /* on hover event */
        if (hoverEnabled && Utils.isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble(container);
        } else if (clickEnabled && Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble(container);
        }
    }

    private static process(container: Container,
                           particle: Particle,
                           distMouse: number,
                           timeSpent: number, data: IBubblerProcessParam): void {
        const bubbleParam = data.bubbleObj.optValue;

        if (bubbleParam === undefined) {
            return;
        }

        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleDistance = container.retina.bubbleModeDistance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;

        if (bubbleParam !== particlesParam) {
            if (!container.bubble.durationEnd) {
                if (distMouse <= bubbleDistance) {
                    const obj = pObjBubble ?? pObj;

                    if (obj !== bubbleParam) {
                        const value = pObj - (timeSpent * (pObj - bubbleParam) / bubbleDuration);

                        if (type === ProcessBubbleType.size) {
                            particle.bubble.radius = value;
                        }

                        if (type === ProcessBubbleType.opacity) {
                            particle.bubble.opacity = value;
                        }
                    }
                } else {
                    if (type === ProcessBubbleType.size) {
                        delete particle.bubble.radius;
                    }

                    if (type === ProcessBubbleType.opacity) {
                        delete particle.bubble.opacity;
                    }
                }
            } else if (pObjBubble) {
                if (type === ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }

                if (type === ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        }
    }

    private static clickBubble(container: Container): void {
        const options = container.options;

        /* on click event */
        const mouseClickPos = container.interactivity.mouse.clickPosition;

        if (mouseClickPos === undefined) {
            return;
        }

        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.spatialGrid.queryRadius(mouseClickPos, distance);

        for (const particle of query) {
            const pos = {
                x: particle.position.x + particle.offset.x,
                y: particle.position.y + particle.offset.y,
            };
            const distMouse = Utils.getDistanceBetweenCoordinates(pos, mouseClickPos);
            const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

            if (container.bubble.clicking) {
                if (timeSpent > options.interactivity.modes.bubble.duration) {
                    container.bubble.durationEnd = true;
                }

                if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                    container.bubble.clicking = false;
                    container.bubble.durationEnd = false;
                }

                /* size */
                const sizeData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: container.retina.bubbleModeSize,
                        value: particle.bubble.radius,
                    },
                    particlesObj: {
                        optValue: particle.sizeValue ?? container.retina.sizeValue,
                        value: particle.size.value,
                    },
                    type: ProcessBubbleType.size,
                };

                this.process(container, particle, distMouse, timeSpent, sizeData);

                /* opacity */
                const opacityData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: options.interactivity.modes.bubble.opacity,
                        value: particle.bubble.opacity,
                    },
                    particlesObj: {
                        optValue: particle.particlesOptions.opacity.value,
                        value: particle.opacity.value,
                    },
                    type: ProcessBubbleType.opacity,
                };

                this.process(container, particle, distMouse, timeSpent, opacityData);

                if (!container.bubble.durationEnd) {
                    if (distMouse <= container.retina.bubbleModeDistance) {
                        this.hoverBubbleColor(container, particle);
                    } else {
                        delete particle.bubble.color;
                    }
                } else {
                    delete particle.bubble.color;
                }
            }
        }
    }

    private static hoverBubble(container: Container): void {
        const mousePos = container.interactivity.mouse.position;

        if (mousePos === undefined) {
            return;
        }

        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.spatialGrid.queryRadiusWithDistance(mousePos, distance);

        for (const { distance, particle } of query) {
            const ratio = 1 - distance / container.retina.bubbleModeDistance;

            /* mousemove - check ratio */
            if (distance <= container.retina.bubbleModeDistance) {
                if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
                    /* size */
                    this.hoverBubbleSize(container, particle, ratio);

                    /* opacity */
                    this.hoverBubbleOpacity(container, particle, ratio);

                    /* color */
                    this.hoverBubbleColor(container, particle);
                }
            } else {
                this.reset(particle);
            }

            /* mouseleave */
            if (container.interactivity.status === Constants.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }

    private static hoverBubbleSize(container: Container, particle: Particle, ratio: number): void {
        const modeSize = container.retina.bubbleModeSize;

        if (modeSize === undefined) {
            return;
        }

        const optSize = particle.sizeValue ?? container.retina.sizeValue;
        const pSize = particle.size.value;
        const size = this.calculateBubbleValue(pSize, modeSize, optSize, ratio);

        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }

    private static hoverBubbleOpacity(container: Container, particle: Particle, ratio: number): void {
        const options = container.options;
        const modeOpacity = options.interactivity.modes.bubble.opacity;

        if (modeOpacity === undefined) {
            return;
        }

        const optOpacity = particle.particlesOptions.opacity.value;
        const pOpacity = particle.opacity.value;
        const opacity = this.calculateBubbleValue(pOpacity, modeOpacity, optOpacity, ratio);

        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }

    private static calculateBubbleValue(particleValue: number,
                                        modeValue: number,
                                        optionsValue: number,
                                        ratio: number): number | undefined {
        if (modeValue > optionsValue) {
            const size = particleValue + (modeValue - optionsValue) * ratio;

            return Utils.clamp(size, particleValue, modeValue);
        } else if (modeValue < optionsValue) {
            const size = particleValue - (optionsValue - modeValue) * ratio;

            return Utils.clamp(size, modeValue, particleValue);
        }
    }

    private static hoverBubbleColor(container: Container, particle: Particle): void {
        const options = container.options;

        if (particle.bubble.color === undefined) {
            const modeColor = options.interactivity.modes.bubble.color;

            if (modeColor === undefined) {
                return;
            }

            particle.bubble.color = ColorUtils.colorToRgb(modeColor instanceof Array ?
                Utils.itemFromArray(modeColor) :
                modeColor);
        }
    }
}
