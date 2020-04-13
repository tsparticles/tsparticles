import type { Container } from "./Container";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IEmitter } from "../Interfaces/Options/Emitters/IEmitter";
import { Particle } from "./Particle";

export class Emitter {
	public position: ICoordinates;
	public emitterOptions: IEmitter;

	private readonly container: Container;
	private startInterval?: number;
	private lifeCount: number

	constructor(container: Container, emitterOptions: IEmitter) {
		this.container = container;
		this.emitterOptions = emitterOptions;
		this.position = this.calcPosition();
		this.lifeCount = this.emitterOptions.life.count ?? -1;

		this.start();
	}

	public emit(): void {
		const container = this.container;
		const particle = new Particle(container, this.position, this);

		for (let i = 0; i < this.emitterOptions.rate.quantity; i++) {
			container.particles.addParticle(particle);
		}
	}

	public start(): void {
		if (this.lifeCount > 0 || !this.emitterOptions.life.count) {
			if (this.startInterval === undefined) {
				this.startInterval = setInterval(() => {
					this.emit();
				}, 1000 * this.emitterOptions.rate.delay);
			}

			if (this.lifeCount > 0) {
				this.prepareToDie();
			}
		}
	}

	public stop(): void {
		const interval = this.startInterval;

		if (interval !== undefined) {
			clearInterval(interval);

			delete this.startInterval;
		}
	}

	private prepareToDie(): void {
		if (this.lifeCount > 0 && this.emitterOptions.life?.duration !== undefined) {
			setTimeout(() => {
				this.stop();
				this.lifeCount--;

				if (this.lifeCount > 0) {
					this.position = this.calcPosition();

					setTimeout(() => {
						this.start();
					}, this.emitterOptions.life.delay ?? 0);
				}
			}, this.emitterOptions.life.duration * 1000);
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
