import type { Container } from "./Container.js";
import type { Particle } from "./Particle.js";
import { getRangeValue } from "../Utils/NumberUtils.js";
import { isSsr } from "../Utils/Utils.js";

/**
 */
export class Retina {
    attractDistance!: number;
    maxSpeed!: number;
    pixelRatio: number;
    reduceFactor: number;
    sizeAnimationSpeed!: number;

    constructor(private readonly container: Container) {
        this.pixelRatio = 1;
        this.reduceFactor = 1;
    }

    /**
     * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
     */
    init(): void {
        const container = this.container,
            options = container.actualOptions;

        this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
        this.reduceFactor = 1;

        const ratio = this.pixelRatio,
            canvas = container.canvas;

        if (canvas.element) {
            const element = canvas.element;

            canvas.size.width = element.offsetWidth * ratio;
            canvas.size.height = element.offsetHeight * ratio;
        }

        const particles = options.particles,
            moveOptions = particles.move;

        this.attractDistance = getRangeValue(moveOptions.attract.distance) * ratio;
        this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
        this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
    }

    initParticle(particle: Particle): void {
        const options = particle.options,
            ratio = this.pixelRatio,
            moveOptions = options.move,
            moveDistance = moveOptions.distance,
            props = particle.retina;

        props.attractDistance = getRangeValue(moveOptions.attract.distance) * ratio;
        props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
        props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
        props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;

        const maxDistance = props.maxDistance;

        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;

        props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    }
}
