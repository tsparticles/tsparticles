import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { Utils } from "../Utils";

export class Retina {
    public bubbleModeDistance!: number;
    public bubbleModeSize?: number;
    public connectModeDistance!: number;
    public connectModeRadius!: number;
    public grabModeDistance!: number;
    public repulseModeDistance!: number;
    public attractModeDistance!: number;
    public slowModeRadius!: number;
    public linksDistance!: number;
    public linksWidth!: number;
    public moveSpeed!: number;
    public sizeValue!: number;
    public sizeAnimationSpeed!: number;
    public pixelRatio!: number;

    constructor(private readonly container: Container) {}

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.detectRetina) {
            this.pixelRatio = Utils.isSsr() ? 1 : window.devicePixelRatio;
        } else {
            this.pixelRatio = 1;
        }

        const ratio = this.pixelRatio;

        if (container.canvas.element) {
            const element = container.canvas.element;

            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }

        const particles = options.particles;

        this.linksDistance = particles.links.distance * ratio;
        this.linksWidth = particles.links.width * ratio;
        this.moveSpeed = particles.move.speed * ratio;
        this.sizeValue = particles.size.value * ratio;
        this.sizeAnimationSpeed = particles.size.animation.speed * ratio;

        const modes = options.interactivity.modes;

        this.connectModeDistance = modes.connect.distance * ratio;
        this.connectModeRadius = modes.connect.radius * ratio;
        this.grabModeDistance = modes.grab.distance * ratio;
        this.repulseModeDistance = modes.repulse.distance * ratio;
        this.attractModeDistance = modes.attract.distance * ratio;
        this.slowModeRadius = modes.slow.radius * ratio;
        this.bubbleModeDistance = modes.bubble.distance * ratio;

        if (modes.bubble.size) {
            this.bubbleModeSize = modes.bubble.size * ratio;
        }
    }

    public initParticle(particle: Particle): void {
        const particlesOptions = particle.particlesOptions;
        const ratio = this.pixelRatio;

        particle.linksDistance = particlesOptions.links.distance * ratio;
        particle.linksWidth = particlesOptions.links.width * ratio;
        particle.moveSpeed = particlesOptions.move.speed * ratio;
        particle.sizeValue = particlesOptions.size.value * ratio;

        if (typeof particlesOptions.size.random !== "boolean") {
            particle.randomMinimumSize = particlesOptions.size.random.minimumValue * ratio;
        }

        particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
    }
}
