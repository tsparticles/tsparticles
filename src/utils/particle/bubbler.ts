import { Particle } from "../../classes/particle";
import { Container } from "../../classes/container";
import { Utils } from "../utils";
import { HoverMode, ClickMode, ProcessBubbleType } from "../enums";

export class Bubbler {
    private readonly particle: Particle;
    private readonly container: Container;

    public opacity?: number;
    public radius?: number;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    private init() {
        const particle = this.particle;

        this.opacity = particle.opacity.value;
        this.radius = particle.radius;
    }

    public bubble() {
        const container = this.container;
        const options = container.options;

        /* on hover event */
        if (options.interactivity.events.onhover.enable && Utils.isInArray(HoverMode.bubble, options.interactivity.events.onhover.mode)) {
            this.hoverBubble();
        } else if (options.interactivity.events.onclick.enable && Utils.isInArray(ClickMode.bubble, options.interactivity.events.onclick.mode)) {
            this.clickBubble();
        }
    }

    public process(dist_mouse: number, time_spent: number, bubble_param: number, particles_param: number, p_obj_bubble: number | undefined, p_obj: number, id: ProcessBubbleType) {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

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
                        let value = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration);

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
                let value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / options.interactivity.modes.bubble.duration), dif = bubble_param - value_tmp;
                let value = bubble_param + dif;

                if (id === ProcessBubbleType.size) {
                    this.radius = value;
                }

                if (id === ProcessBubbleType.opacity) {
                    this.opacity = value;
                }
            }
        }
    }

    private clickBubble() {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* on click event */
        let dx_mouse = particle.position.x - (container.interactivity.mouse.click_pos_x || 0);
        let dy_mouse = particle.position.y - (container.interactivity.mouse.click_pos_y || 0);
        let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        let time_spent = (new Date().getTime() - (container.interactivity.mouse.click_time || 0)) / 1000;

        if (container.bubble.clicking) {
            if (time_spent > options.interactivity.modes.bubble.duration) {
                container.bubble.duration_end = true;
            }

            if (time_spent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.duration_end = false;
            }
        }

        if (container.bubble.clicking) {
            /* size */
            this.process(dist_mouse, time_spent, options.interactivity.modes.bubble.size, options.particles.size.value, this.radius, this.particle.radius, ProcessBubbleType.size);
            /* opacity */
            this.process(dist_mouse, time_spent, options.interactivity.modes.bubble.opacity, options.particles.opacity.value, this.opacity, this.particle.opacity.value, ProcessBubbleType.opacity);
        }
    }

    private hoverBubble() {
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

    private hoverBubbleSize(ratio: number) {
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

    private hoverBubbleOpacity(ratio: number) {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.interactivity.modes.bubble.opacity !== options.particles.opacity.value) {
            if (options.interactivity.modes.bubble.opacity > options.particles.opacity.value) {
                let opacity = options.interactivity.modes.bubble.opacity * ratio;

                if (opacity > particle.opacity.value && opacity <= options.interactivity.modes.bubble.opacity) {
                    this.opacity = opacity;
                }
            }
            else {
                let opacity = particle.opacity.value - (options.particles.opacity.value - options.interactivity.modes.bubble.opacity) * ratio;
                if (opacity < particle.opacity.value && opacity >= options.interactivity.modes.bubble.opacity) {
                    this.opacity = opacity;
                }
            }
        }
    }
}