"use strict";

import { Container } from "./container";

export class Retina {
    private container: Container;
    public isRetina: boolean;

    constructor(container: Container) {
        this.container = container;
        this.isRetina = false;
    }

    public init() {
        const container = this.container;
        let options = container.options;

        if (options.retina_detect && window.devicePixelRatio > 1) {
            container.canvas.pxratio = window.devicePixelRatio;

            this.isRetina = true;
        } else {
            container.canvas.pxratio = 1;

            this.isRetina = false;
        }

        const ratio = container.canvas.pxratio;

        container.canvas.w = container.canvas.el.offsetWidth * ratio;
        container.canvas.h = container.canvas.el.offsetHeight * ratio;

        options.interactivity.modes.bubble.distance = options.interactivity.modes.bubble.distance * ratio;
        options.interactivity.modes.bubble.size = options.interactivity.modes.bubble.size * ratio;
        options.interactivity.modes.grab.distance = options.interactivity.modes.grab.distance * ratio;
        options.interactivity.modes.repulse.distance = options.interactivity.modes.repulse.distance * ratio;
        options.particles.line_linked.distance = options.particles.line_linked.distance * ratio;
        options.particles.line_linked.width = options.particles.line_linked.width * ratio;
        options.particles.move.speed = options.particles.move.speed * ratio;
        options.particles.size.value = options.particles.size.value * ratio;
        options.particles.size.anim.speed = options.particles.size.anim.speed * ratio;
    }
}
