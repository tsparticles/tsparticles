import { Container } from "./Container";
import { ICoordinates } from "../Interfaces/ICoordinates";
import { IEmitter } from "../Interfaces/Options/Emitters/IEmitter";
import { Particle } from "./Particle";

export class Emitter {
	public position: ICoordinates;

	private readonly container: Container;
	private startInterval?: number;
	public emitterOptions: IEmitter;

	constructor(container: Container, emitterOptions: IEmitter) {
		this.container = container;
		this.emitterOptions = emitterOptions;
		this.position = this.calcPosition();

		if (this.emitterOptions.autoStart) {
			this.start();
		}
	}

	public emit(): void {
		const container = this.container;
		const particle = new Particle(container, this.position, this);

		for (let i = 0; i < this.emitterOptions.rate.quantity; i++) {
			container.particles.addParticle(particle);
		}
	}

	public start(): void {
		if (this.startInterval === undefined) {
			this.startInterval = setInterval(() => {
				this.emit();
			}, 1000 * this.emitterOptions.rate.seconds);
		}

		this.prepareToDie();
	}

	public stop(): void {
		const interval = this.startInterval;

		if (interval !== undefined) {
			clearInterval(interval);

			delete this.startInterval;
		}
	}

	private prepareToDie(): void {
		if (this.emitterOptions.life !== undefined) {
			setTimeout(() => {
				this.stop();

				this.position = this.calcPosition();
			}, this.emitterOptions.life * 1000);
		}
	}

	private calcPosition(): ICoordinates {
		const container = this.container;

		const percentPosition = this.emitterOptions.position ?? {
			x: Math.random() * 100,
			y: Math.random() * 100,
		}

		return {
			x: percentPosition.x / 100 * container.canvas.dimension.width,
			y: percentPosition.y / 100 * container.canvas.dimension.height,
		}
	}
}