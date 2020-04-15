import type { Container } from "./Container";
import { Particle } from "./Particle";

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

		const ratio = this.pixelRatio;

		if (container.canvas.element) {
			container.canvas.dimension.width = container.canvas.element.offsetWidth * ratio;
			container.canvas.dimension.height = container.canvas.element.offsetHeight * ratio;
		}

		this.connectModeDistance = options.interactivity.modes.connect.distance * ratio;
		this.connectModeRadius = options.interactivity.modes.connect.radius * ratio;
		this.grabModeDistance = options.interactivity.modes.grab.distance * ratio;
		this.repulseModeDistance = options.interactivity.modes.repulse.distance * ratio;
		this.slowModeRadius = options.interactivity.modes.slow.radius * ratio;
		this.lineLinkedDistance = options.particles.lineLinked.distance * ratio;
		this.lineLinkedWidth = options.particles.lineLinked.width * ratio;
		this.moveSpeed = options.particles.move.speed * ratio;
		this.sizeValue = options.particles.size.value * ratio;
		this.bubbleModeDistance = options.interactivity.modes.bubble.distance * ratio;
		this.bubbleModeSize = options.interactivity.modes.bubble.size ?? this.sizeValue * ratio;
		this.sizeAnimationSpeed = options.particles.size.animation.speed * ratio;
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
