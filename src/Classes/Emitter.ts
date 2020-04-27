import type { Container } from "./Container";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IEmitter } from "../Interfaces/Options/Emitters/IEmitter";
import { Particle } from "./Particle";
import type { IDimension } from "../Interfaces/IDimension";
import { Utils } from "./Utils/Utils";

export class Emitter {
    public position: ICoordinates;
    public size: IDimension;
    public emitterOptions: IEmitter;

    private readonly container: Container;
    private readonly initialPosition?: ICoordinates;
    private startInterval?: number;
    private lifeCount: number

    constructor(container: Container, emitterOptions: IEmitter, position?: ICoordinates) {
        this.container = container;
        this.initialPosition = position;
        this.emitterOptions = Utils.deepExtend({}, emitterOptions);
        this.position = this.initialPosition ?? this.calcPosition();
        this.size = this.emitterOptions.size ?? {
            height: 0,
            width: 0,
        };
        this.lifeCount = this.emitterOptions.life.count ?? -1;

        this.start();
    }

    public emit(): void {
        const container = this.container;
        const position = this.position;
        const offset = {
            x: container.canvas.size.width * this.size.width / 100,
            y: container.canvas.size.height * this.size.height / 100,
        };

        for (let i = 0; i < this.emitterOptions.rate.quantity; i++) {
            const particle = new Particle(container, {
                x: position.x + offset.x * (Math.random() - 0.5),
                y: position.y + offset.y * (Math.random() - 0.5),
            }, this);

            container.particles.addParticle(particle);
        }
    }

    public start(): void {
        if (this.lifeCount > 0 || !this.emitterOptions.life.count) {
            if (this.startInterval === undefined) {
                this.startInterval = window.setInterval(() => {
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

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position = initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size) ?
            initialPosition :
            this.calcPosition();
    }

    private prepareToDie(): void {
        if (this.lifeCount > 0 && this.emitterOptions.life?.duration !== undefined) {
            window.setTimeout(() => {
                this.stop();
                this.lifeCount--;

                if (this.lifeCount > 0) {
                    this.position = this.calcPosition();

                    window.setTimeout(() => {
                        this.start();
                    }, this.emitterOptions.life.delay ?? 0);
                } else {
                    this.destroy();
                }
            }, this.emitterOptions.life.duration * 1000);
        }
    }

    private destroy(): void {
        const container = this.container;
        const index = container.emitters.indexOf(this);

        if (index >= 0) {
            container.emitters.splice(index, 1);
        }
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.emitterOptions.position ?? {
            x: Math.random() * 100,
            y: Math.random() * 100,
        };

        return {
            x: percentPosition.x / 100 * container.canvas.size.width,
            y: percentPosition.y / 100 * container.canvas.size.height,
        }
    }
}
