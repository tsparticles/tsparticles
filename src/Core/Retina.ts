import type { Container } from "./Container";
import type { Particle } from "./Particle";

export class Retina {
    public isRetina: boolean;
    public bubbleModeDistance: number;
    public bubbleModeSize: number;
    public connectModeDistance: number;
    public connectModeRadius: number;
    public grabModeDistance: number;
    public repulseModeDistance: number;
    public slowModeRadius: number;
    public lineLinkedDistance: number;
    public lineLinkedWidth: number;
    public moveSpeed: number;
    public sizeValue: number;
    public sizeAnimationSpeed: number;
    public polygonMaskMoveRadius: number;
    public pixelRatio: number;

    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
        this.isRetina = false;
        this.bubbleModeDistance = 0;
        this.bubbleModeSize = 0;
        this.connectModeDistance = 0;
        this.connectModeRadius = 0;
        this.grabModeDistance = 0;
        this.repulseModeDistance = 0;
        this.slowModeRadius = 0;
        this.lineLinkedDistance = 0;
        this.lineLinkedWidth = 0;
        this.moveSpeed = 0;
        this.sizeValue = 0;
        this.sizeAnimationSpeed = 0;
        this.polygonMaskMoveRadius = 0;
        this.pixelRatio = 1;
    }

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.detectRetina && window.devicePixelRatio > 1) {
            this.pixelRatio = window.devicePixelRatio;

            this.isRetina = true;
        } else {
            this.pixelRatio = 1;

            this.isRetina = false;
        }

        let ratio = this.pixelRatio;

        if (container.canvas.element) {
            const element = container.canvas.element;

            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }

        const particles = options.particles;

        this.lineLinkedDistance = particles.lineLinked.distance * ratio;
        this.lineLinkedWidth = particles.lineLinked.width * ratio;
        this.moveSpeed = particles.move.speed * ratio;
        this.sizeValue = particles.size.value * ratio;
        this.sizeAnimationSpeed = particles.size.animation.speed * ratio;

        const interactivity = options.interactivity;

        this.connectModeDistance = interactivity.modes.connect.distance * ratio;
        this.connectModeRadius = interactivity.modes.connect.radius * ratio;
        this.grabModeDistance = interactivity.modes.grab.distance * ratio;
        this.repulseModeDistance = interactivity.modes.repulse.distance * ratio;
        this.slowModeRadius = interactivity.modes.slow.radius * ratio;
        this.bubbleModeDistance = interactivity.modes.bubble.distance * ratio;
        this.bubbleModeSize = interactivity.modes.bubble.size ?? this.sizeValue * ratio;

        this.polygonMaskMoveRadius = options.polygon.move.radius * ratio;
    }

    public initParticle(particle: Particle): void {
        const particlesOptions = particle.particlesOptions;
        const ratio = this.pixelRatio;

        particle.lineLinkedDistance = particlesOptions.lineLinked.distance * ratio;
        particle.lineLinkedWidth = particlesOptions.lineLinked.width * ratio;
        particle.moveSpeed = particlesOptions.move.speed * ratio;
        particle.sizeValue = particlesOptions.size.value * ratio;
        if (typeof particlesOptions.size.random !== "boolean") {
            particle.randomMinimumSize = particlesOptions.size.random.minimumValue;
        }
        particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
    }

    public reset(): void {
    }
}
