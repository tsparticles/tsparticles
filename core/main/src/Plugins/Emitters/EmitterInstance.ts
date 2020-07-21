import type { Container } from "../../Core/Container";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import { Utils } from "../../Utils";
import { SizeMode } from "../../Enums";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import type { Emitters } from "./Emitters";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import { IEmitterSize } from "./Options/Interfaces/IEmitterSize";

export class EmitterInstance {
    public position: ICoordinates;
    public size: IEmitterSize;
    public emitterOptions: IEmitter;

    private readonly immortal: boolean;
    private readonly initialPosition?: ICoordinates;
    private readonly particlesOptions: RecursivePartial<IParticles>;
    private startInterval?: number;
    private lifeCount: number;

    constructor(
        private readonly emitters: Emitters,
        private readonly container: Container,
        emitterOptions: IEmitter,
        position?: ICoordinates
    ) {
        this.initialPosition = position;
        this.emitterOptions = Utils.deepExtend({}, emitterOptions);
        this.position = this.initialPosition ?? this.calcPosition();

        let particlesOptions = Utils.deepExtend({}, this.emitterOptions.particles);

        if (particlesOptions === undefined) {
            particlesOptions = {};
        }

        if (particlesOptions.move === undefined) {
            particlesOptions.move = {};
        }

        if (particlesOptions.move.direction === undefined) {
            particlesOptions.move.direction = this.emitterOptions.direction;
        }

        this.particlesOptions = particlesOptions;

        this.size =
            this.emitterOptions.size ??
            ((): IEmitterSize => {
                const size = new EmitterSize();

                size.load({
                    height: 0,
                    mode: SizeMode.percent,
                    width: 0,
                });

                return size;
            })();

        this.lifeCount = this.emitterOptions.life.count ?? -1;
        this.immortal = this.lifeCount <= 0;

        this.play();
    }

    public play(): void {
        if (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count) {
            if (this.startInterval === undefined) {
                this.startInterval = window.setInterval(() => {
                    this.emit();
                }, 1000 * this.emitterOptions.rate.delay);
            }

            if (this.lifeCount > 0 || this.immortal) {
                this.prepareToDie();
            }
        }
    }

    public pause(): void {
        const interval = this.startInterval;

        if (interval !== undefined) {
            clearInterval(interval);

            delete this.startInterval;
        }
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    private prepareToDie(): void {
        const duration = this.emitterOptions.life?.duration;

        if ((this.lifeCount > 0 || this.immortal) && duration !== undefined && duration > 0) {
            window.setTimeout(() => {
                this.pause();

                if (!this.immortal) {
                    this.lifeCount--;
                }

                if (this.lifeCount > 0 || this.immortal) {
                    this.position = this.calcPosition();

                    window.setTimeout(() => {
                        this.play();
                    }, (this.emitterOptions.life.delay ?? 0) * 1000);
                } else {
                    this.destroy();
                }
            }, duration * 1000);
        }
    }

    private destroy(): void {
        this.emitters.removeEmitter(this);
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.emitterOptions.position ?? {
            x: Math.random() * 100,
            y: Math.random() * 100,
        };

        return {
            x: (percentPosition.x / 100) * container.canvas.size.width,
            y: (percentPosition.y / 100) * container.canvas.size.height,
        };
    }

    private emit(): void {
        const container = this.container;
        const position = this.position;
        const offset = {
            x:
                this.size.mode === SizeMode.percent
                    ? (container.canvas.size.width * this.size.width) / 100
                    : this.size.width,
            y:
                this.size.mode === SizeMode.percent
                    ? (container.canvas.size.height * this.size.height) / 100
                    : this.size.height,
        };

        for (let i = 0; i < this.emitterOptions.rate.quantity; i++) {
            container.particles.addParticle(
                {
                    x: position.x + offset.x * (Math.random() - 0.5),
                    y: position.y + offset.y * (Math.random() - 0.5),
                },
                this.particlesOptions
            );
        }
    }
}
