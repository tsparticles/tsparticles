"use strict";

import { ClickMode } from "../../Enums/ClickMode";
import { Container } from "../Container";
import { HoverMode } from "../../Enums/HoverMode";
import { IBubblerProcessParam } from "../../Interfaces/IBubblerProcessParam";
import { Particle } from "../Particle";
import { ProcessBubbleType } from "../../Enums/ProcessBubbleType";
import { Utils } from "../Utils/Utils";

export class Bubbler {
    public opacity?: number;
    public radius?: number;

    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public bubble(): void {
        const container = this.container;
        const options = container.options;
        const hoverEnabled = options.interactivity.events.onhover.enable;
        const hoverMode = options.interactivity.events.onhover.mode;
        const clickEnabled = options.interactivity.events.onclick.enable;
        const clickMode = options.interactivity.events.onclick.mode;

        /* on hover event */
        if (hoverEnabled && Utils.isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        } else if (clickEnabled && Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble();
        }
    }

    private init(): void {
        const particle = this.particle;

        this.opacity = particle.opacity.value;
        this.radius = particle.radius;
    }

    private process(distMouse: number, timeSpent: number, data: IBubblerProcessParam): void {
        const container = this.container;
        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleParam = data.bubbleObj.optValue;
        const bubbleDistance = options.interactivity.modes.bubble.distance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;

        if (bubbleParam !== particlesParam) {
            if (!container.bubble.duration_end) {
                if (distMouse <= bubbleDistance) {
                    let obj;

                    if (pObjBubble) {
                        obj = pObjBubble;
                    } else {
                        obj = pObj;
                    }

                    if (obj !== bubbleParam) {
                        const value = pObj - (timeSpent * (pObj - bubbleParam) / bubbleDuration);

                        if (type === ProcessBubbleType.size) {
                            this.radius = value;
                        }

                        if (type === ProcessBubbleType.opacity) {
                            this.opacity = value;
                        }
                    }
                } else {
                    if (type === ProcessBubbleType.size) {
                        this.radius = undefined;
                    }

                    if (type === ProcessBubbleType.opacity) {
                        this.opacity = undefined;
                    }
                }
            } else if (pObjBubble) {
                const value_tmp = pObj - (timeSpent * (pObj - bubbleParam) / bubbleDuration);
                const dif = bubbleParam - value_tmp;
                const value = bubbleParam + dif;

                if (type === ProcessBubbleType.size) {
                    this.radius = value;
                }

                if (type === ProcessBubbleType.opacity) {
                    this.opacity = value;
                }
            }
        }
    }

    private clickBubble(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* on click event */
        const mouseClickPos = container.interactivity.mouse.clickPosition || { x: 0, y: 0 };
        const dx_mouse = particle.position.x - mouseClickPos.x;
        const dy_mouse = particle.position.y - mouseClickPos.y;
        const distMouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

        if (container.bubble.clicking) {
            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.duration_end = true;
            }

            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.duration_end = false;
            }
        }

        if (container.bubble.clicking) {
            /* size */
            const sizeData: IBubblerProcessParam = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.size,
                    value: this.radius,
                },
                particlesObj: {
                    optValue: options.particles.size.value,
                    value: this.particle.radius,
                },
                type: ProcessBubbleType.size,
            };

            this.process(distMouse, timeSpent, sizeData);

            /* opacity */
            const opacityData: IBubblerProcessParam = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: this.opacity,
                },
                particlesObj: {
                    optValue: options.particles.opacity.value,
                    value: this.particle.opacity.value,
                },
                type: ProcessBubbleType.opacity,
            };

            this.process(distMouse, timeSpent, opacityData);
        }
    }

    private hoverBubble(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
        const dx_mouse = (particle.position.x + particle.offset.x) - mousePos.x;
        const dy_mouse = (particle.position.y + particle.offset.y) - mousePos.y;
        const dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        const ratio = 1 - dist_mouse / options.interactivity.modes.bubble.distance;

        /* mousemove - check ratio */
        if (dist_mouse <= options.interactivity.modes.bubble.distance) {
            if (ratio >= 0 && container.interactivity.status === "mousemove") {
                /* size */
                this.hoverBubbleSize(ratio);

                /* opacity */
                this.hoverBubbleOpacity(ratio);
            }
        } else {
            this.init();
        }

        /* mouseleave */
        if (container.interactivity.status === "mouseleave") {
            this.init();
        }
    }

    private hoverBubbleSize(ratio: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.interactivity.modes.bubble.size !== options.particles.size.value) {
            if (options.interactivity.modes.bubble.size > options.particles.size.value) {
                const size = particle.radius + (options.interactivity.modes.bubble.size * ratio);

                if (size >= 0) {
                    this.radius = size;
                }
            } else {
                const dif = particle.radius - options.interactivity.modes.bubble.size;
                const size = particle.radius - (dif * ratio);

                if (size > 0) {
                    this.radius = size;
                } else {
                    this.radius = 0;
                }
            }
        }
    }

    private hoverBubbleOpacity(ratio: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const modeOpacity = options.interactivity.modes.bubble.opacity;
        const optOpacity = options.particles.opacity.value;
        const pOpacity = particle.opacity.value;

        if (modeOpacity !== optOpacity) {
            if (modeOpacity > optOpacity) {
                const opacity = options.interactivity.modes.bubble.opacity * ratio;

                if (opacity > pOpacity && opacity <= modeOpacity) {
                    this.opacity = opacity;
                }
            } else {
                const opacity = pOpacity - (optOpacity - modeOpacity) * ratio;

                if (opacity < pOpacity && opacity >= modeOpacity) {
                    this.opacity = opacity;
                }
            }
        }
    }
}
