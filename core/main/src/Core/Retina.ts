import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { Utils } from "../Utils";

/**
 * @category Core
 */
export class Retina {
    public reduceFactor!: number;
    public bubbleModeDistance!: number;
    public bubbleModeSize?: number;
    public connectModeDistance!: number;
    public connectModeRadius!: number;
    public grabModeDistance!: number;
    public repulseModeDistance!: number;
    public attractModeDistance!: number;
    public slowModeRadius!: number;
    public attractDistance!: number;
    public linksDistance!: number;
    public linksWidth!: number;
    public moveSpeed!: number;
    public sizeValue!: number;
    public sizeAnimationSpeed!: number;
    public pixelRatio!: number;
    public bounceModeDistance!: number;
    public orbitRadius?: number;
    public orbitRotation!: number;

    constructor(private readonly container: Container) {}

    /**
     * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
     */
    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.detectRetina) {
            this.pixelRatio = typeof devicePixelRatio === "undefined" ? 1 : devicePixelRatio;
        } else {
            this.pixelRatio = 1;
        }

        const motionOptions = this.container.options.motion;

        if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
            if (Utils.isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
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
        this.moveSpeed = particles.move.speed * ratio;
        this.sizeValue = particles.size.value * ratio;
        this.sizeAnimationSpeed = particles.size.animation.speed * ratio;
        this.orbitRotation = particles.orbit.rotation.value * this.container.retina.pixelRatio;

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

    public initParticle(particle: Particle): void {
        const particlesOptions = particle.options;
        const ratio = this.pixelRatio;
        const orbit = particlesOptions.orbit;
        const moveDistance = particlesOptions.move.distance;

        particle.attractDistance = particlesOptions.move.attract.distance * ratio;
        particle.linksDistance = particlesOptions.links.distance * ratio;
        particle.linksWidth = particlesOptions.links.width * ratio;
        particle.moveSpeed = particlesOptions.move.speed * ratio;
        particle.sizeValue = particlesOptions.size.value * ratio;
        particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
        particle.orbitRadius = orbit?.radius !== undefined ? orbit.radius * ratio : undefined;
        particle.spinAcceleration = particlesOptions.move.spin.acceleration * ratio;
        particle.maxDistance = {
            horizontal: moveDistance.horizontal ? moveDistance.horizontal * ratio : undefined,
            vertical: moveDistance.vertical ? moveDistance.vertical * ratio : undefined,
        };
    }

    private handleMotionChange(mediaQuery: MediaQueryList): void {
        const options = this.container.options;

        if (mediaQuery.matches) {
            const motion = options.motion;

            this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
        } else {
            this.reduceFactor = 1;
        }
    }
}
