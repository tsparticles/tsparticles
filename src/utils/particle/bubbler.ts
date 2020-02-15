import { Particle } from "../../classes/particle";
import { Container } from "../../classes/container";
import { Utils } from "../utils";
import { HoverMode, ClickMode, ProcessBubbleType } from "../enums";

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

    private process(dist_mouse: number, time_spent: number, bubble_param: number, particles_param: number, p_obj_bubble: number | undefined, p_obj: number, id: ProcessBubbleType): void {
        const container = this.container;
        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;

        if (bubble_param !== particles_param) {
            if (!container.bubble.duration_end) {
                if (dist_mouse <= options.interactivity.modes.bubble.distance) {
                    let obj;

                    if (p_obj_bubble) {
                        obj = p_obj_bubble;
                    } else {
                        obj = p_obj;
                    }

                    if (obj !== bubble_param) {
                        const value = p_obj - (time_spent * (p_obj - bubble_param) / bubbleDuration);

                        if (id === ProcessBubbleType.size) {
                            this.radius = value;
                        }

                        if (id === ProcessBubbleType.opacity) {
                            this.opacity = value;
                        }
                    }
                } else {
                    if (id === ProcessBubbleType.size) {
                        this.radius = undefined;
                    }

                    if (id === ProcessBubbleType.opacity)
                        this.opacity = undefined;
                }
            } else if (p_obj_bubble) {
                const value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / bubbleDuration);
                const dif = bubble_param - value_tmp;
                const value = bubble_param + dif;

                if (id === ProcessBubbleType.size) {
                    this.radius = value;
                }

                if (id === ProcessBubbleType.opacity) {
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
        const dx_mouse = particle.position.x - (container.interactivity.mouse.click_pos_x || 0);
        const dy_mouse = particle.position.y - (container.interactivity.mouse.click_pos_y || 0);
        const distMouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        const timeSpent = (new Date().getTime() - (container.interactivity.mouse.click_time || 0)) / 1000;

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
            const sizeMode = options.interactivity.modes.bubble.size;
            const optSize = options.particles.size.value;
            const radius = this.radius;
            const pRadius = this.particle.radius;
            const opacityMode = options.interactivity.modes.bubble.opacity;
            const optOpacity = options.particles.opacity.value;
            const opacity = this.opacity;
            const pOpacity = this.particle.opacity.value;

            this.process(distMouse, timeSpent, sizeMode, optSize, radius, pRadius, ProcessBubbleType.size);
            /* opacity */
            this.process(distMouse, timeSpent, opacityMode, optOpacity, opacity, pOpacity, ProcessBubbleType.opacity);
        }
    }

    private hoverBubble(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        let dx_mouse = (particle.position.x + particle.offset.x) - (container.interactivity.mouse.pos_x || 0);
        let dy_mouse = (particle.position.y + particle.offset.y) - (container.interactivity.mouse.pos_y || 0);
        let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        let ratio = 1 - dist_mouse / options.interactivity.modes.bubble.distance;

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
                let size = particle.radius + (options.interactivity.modes.bubble.size * ratio);

                if (size >= 0) {
                    this.radius = size;
                }
            } else {
                let dif = particle.radius - options.interactivity.modes.bubble.size;
                let size = particle.radius - (dif * ratio);

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
