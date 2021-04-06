import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { getRangeValue, isSsr } from "../Utils";

/**
 * @category Core
 */
export class Retina {
    reduceFactor!: number;
    bubbleModeDistance!: number;
    bubbleModeSize?: number;
    connectModeDistance!: number;
    connectModeRadius!: number;
    grabModeDistance!: number;
    repulseModeDistance!: number;
    attractModeDistance!: number;
    slowModeRadius!: number;
    attractDistance!: number;
    linksDistance!: number;
    linksWidth!: number;
    sizeAnimationSpeed!: number;
    pixelRatio!: number;
    bounceModeDistance!: number;
    orbitRadius?: number;

    constructor(private readonly container: Container) {}

    /**
     * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
     */
    init(): void {
        const container = this.container;
        const options = container.actualOptions;

        if (options.detectRetina) {
            this.pixelRatio = typeof devicePixelRatio === "undefined" ? 1 : devicePixelRatio;
        } else {
            this.pixelRatio = 1;
        }

        const motionOptions = this.container.actualOptions.motion;

        if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
            if (isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
                this.reduceFactor = 1;
            } else {
                const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");

                if (mediaQuery) {
                    // Check if the media query matches or is not available.
                    this.handleMotionChange(mediaQuery);

                    // Ads an event listener to check for changes in the media query's value.
                    const handleChange = () => {
                        this.handleMotionChange(mediaQuery);

                        container.refresh().catch(() => {
                            // ignore
                        });
                    };

                    if (mediaQuery.addEventListener !== undefined) {
                        mediaQuery.addEventListener("change", handleChange);
                    } else if (mediaQuery.addListener !== undefined) {
                        mediaQuery.addListener(handleChange);
                    }
                }
            }
        } else {
            this.reduceFactor = 1;
        }

        const ratio = this.pixelRatio;

        if (container.canvas.element) {
            const element = container.canvas.element;

            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }

        const particles = options.particles;

        this.attractDistance = particles.move.attract.distance * ratio;
        this.linksDistance = particles.links.distance * ratio;
        this.linksWidth = particles.links.width * ratio;
        this.sizeAnimationSpeed = particles.size.animation.speed * ratio;

        if (particles.orbit.radius !== undefined) {
            this.orbitRadius = particles.orbit.radius * this.container.retina.pixelRatio;
        }

        const modes = options.interactivity.modes;

        this.connectModeDistance = modes.connect.distance * ratio;
        this.connectModeRadius = modes.connect.radius * ratio;
        this.grabModeDistance = modes.grab.distance * ratio;
        this.repulseModeDistance = modes.repulse.distance * ratio;
        this.bounceModeDistance = modes.bounce.distance * ratio;
        this.attractModeDistance = modes.attract.distance * ratio;
        this.slowModeRadius = modes.slow.radius * ratio;
        this.bubbleModeDistance = modes.bubble.distance * ratio;

        if (modes.bubble.size) {
            this.bubbleModeSize = modes.bubble.size * ratio;
        }
    }

    initParticle(particle: Particle): void {
        const options = particle.options;
        const ratio = this.pixelRatio;
        const orbit = options.orbit;
        const moveDistance = options.move.distance;

        particle.attractDistance = options.move.attract.distance * ratio;
        particle.linksDistance = options.links.distance * ratio;
        particle.linksWidth = options.links.width * ratio;
        particle.sizeAnimationSpeed = options.size.animation.speed * ratio;
        particle.orbitRadius = orbit?.radius !== undefined ? orbit.radius * ratio : undefined;

        if (particle.spin) {
            particle.spin.acceleration = options.move.spin.acceleration * ratio;
        }

        const maxDistance = particle.maxDistance;

        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;

        particle.moveDrift = getRangeValue(options.move.drift) * ratio;
    }

    private handleMotionChange(mediaQuery: MediaQueryList): void {
        const options = this.container.actualOptions;

        if (mediaQuery.matches) {
            const motion = options.motion;

            this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
        } else {
            this.reduceFactor = 1;
        }
    }
}
