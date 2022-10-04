import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { getRangeValue } from "../Utils/NumberUtils";
import { isSsr } from "../Utils/Utils";

/**
 * @category Core
 */
export class Retina {
    attractDistance!: number;
    maxSpeed!: number;
    pixelRatio!: number;
    reduceFactor!: number;
    sizeAnimationSpeed!: number;

    constructor(private readonly container: Container) {}

    /**
     * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
     */
    init(): void {
        const container = this.container,
            options = container.actualOptions;

        this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
        this.reduceFactor = 1;

        const ratio = this.pixelRatio;

        if (container.canvas.element) {
            const element = container.canvas.element;

            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }

        const particles = options.particles;

        this.attractDistance = getRangeValue(particles.move.attract.distance) * ratio;
        this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
        this.maxSpeed = getRangeValue(particles.move.gravity.maxSpeed) * ratio;
    }

    initParticle(particle: Particle): void {
        const options = particle.options,
            ratio = this.pixelRatio,
            moveDistance = options.move.distance,
            props = particle.retina;

        props.attractDistance = getRangeValue(options.move.attract.distance) * ratio;
        props.moveDrift = getRangeValue(options.move.drift) * ratio;
        props.moveSpeed = getRangeValue(options.move.speed) * ratio;
        props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;

        const maxDistance = props.maxDistance;

        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;

        props.maxSpeed = getRangeValue(options.move.gravity.maxSpeed) * ratio;
    }
}
