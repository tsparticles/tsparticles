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
    attractDistance!: number;
    slowModeRadius!: number;
    linksDistance!: number;
    linksWidth!: number;
    sizeValue!: number;
    sizeAnimationSpeed!: number;
    pixelRatio!: number;
    bounceModeDistance!: number;
    maxSpeed!: number;

    constructor(private readonly container: Container) {}

    /**
     * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
     */
    init(): void {
        const container = this.container;
        const options = container.actualOptions;

        this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;

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
        this.maxSpeed = particles.move.gravity.maxSpeed * ratio;

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
        const particlesOptions = particle.options;
        const ratio = this.pixelRatio;

        particle.attractDistance = particlesOptions.move.attract.distance * ratio;
        particle.linksDistance = particlesOptions.links.distance * ratio;
        particle.linksWidth = particlesOptions.links.width * ratio;
        particle.moveDrift = getRangeValue(particlesOptions.move.drift) * ratio;
        particle.moveSpeed = getRangeValue(particlesOptions.move.speed) * ratio;
        particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
        particle.maxDistance = particlesOptions.move.distance * ratio;
        particle.wobbleDistance = getRangeValue(particlesOptions.wobble.distance) * ratio;
        particle.maxSpeed = particlesOptions.move.gravity.maxSpeed * ratio;
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
