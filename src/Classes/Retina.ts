"use strict";

import {Container} from "./Container";

export class Retina {
    public isRetina: boolean;

    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
        this.isRetina = false;
    }

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.retina_detect && window.devicePixelRatio > 1) {
            container.canvas.pxRatio = window.devicePixelRatio;

            this.isRetina = true;
        } else {
            container.canvas.pxRatio = 1;

            this.isRetina = false;
        }

        const ratio = container.canvas.pxRatio;

        container.canvas.dimension.width = container.canvas.element.offsetWidth * ratio;
        container.canvas.dimension.height = container.canvas.element.offsetHeight * ratio;

        options.interactivity.modes.bubble.distance *= ratio;
        options.interactivity.modes.bubble.size *= ratio;
        options.interactivity.modes.grab.distance *= ratio;
        options.interactivity.modes.repulse.distance *= ratio;
        options.particles.line_linked.distance *= ratio;
        options.particles.line_linked.width *= ratio;
        options.particles.move.speed *= ratio;
        options.particles.size.value *= ratio;
        options.particles.size.anim.speed *= ratio;
    }

    public reset(): void {
        const container = this.container;
        const options = container.options;
        const ratio = container.canvas.pxRatio;

        options.interactivity.modes.bubble.distance /= ratio;
        options.interactivity.modes.bubble.size /= ratio;
        options.interactivity.modes.grab.distance /= ratio;
        options.interactivity.modes.repulse.distance /= ratio;
        options.particles.line_linked.distance /= ratio;
        options.particles.line_linked.width /= ratio;
        options.particles.move.speed /= ratio;
        options.particles.size.value /= ratio;
        options.particles.size.anim.speed /= ratio;
    }
}
