import type { Container } from "../../Core/Container";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import { Utils } from "../../Utils";
import { SizeMode } from "../../Enums";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import type { Emitters } from "./Emitters";
import type { RecursivePartial } from "../../Types";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize";
import { IDelta } from "../../Core/Interfaces/IDelta";

function randomCoordinate(position: number, offset: number): number {
    return position + offset * (Math.random() - 0.5);
}

function randomPosition(position: ICoordinates, offset: ICoordinates): ICoordinates {
    return {
        x: randomCoordinate(position.x, offset.x),
        y: randomCoordinate(position.y, offset.y),
    };
}

/**
 * @category Emitters Plugin
 */
export class EmitterInstance {
    public position: ICoordinates;
    public size: IEmitterSize;
    public emitterOptions: IEmitter;
    public readonly name?: string;
    private currentEmitDelay;
    private currentSpawnDelay;
    private currentDuration;

    private lifeCount;

    private duration?: number;
    private emitDelay?: number;
    private spawnDelay?: number;

    private readonly immortal;

    private readonly initialPosition?: ICoordinates;
    private readonly particlesOptions: RecursivePartial<IParticles>;

    constructor(
        private readonly emitters: Emitters,
        private readonly container: Container,
        emitterOptions: IEmitter,
        position?: ICoordinates
    ) {
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        this.emitterOptions = Utils.deepExtend({}, emitterOptions) as IEmitter;
        this.position = this.initialPosition ?? this.calcPosition();
        this.name = emitterOptions.name;

        let particlesOptions = Utils.deepExtend({}, this.emitterOptions.particles) as RecursivePartial<IParticles>;

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
        if (
            this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count)
        ) {
            if (this.emitDelay === undefined) {
                this.emitDelay = (1000 * this.emitterOptions.rate.delay) / this.container.retina.reduceFactor;
            }

            if (this.lifeCount > 0 || this.immortal) {
                this.prepareToDie();
            }
        }
    }

    public pause(): void {
        delete this.emitDelay;
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    public update(delta: IDelta): void {
        if (this.duration !== undefined) {
            this.currentDuration += delta.value;

            if (this.currentDuration >= this.duration) {
                this.pause();

                if (this.spawnDelay !== undefined) {
                    delete this.spawnDelay;
                }

                if (!this.immortal) {
                    this.lifeCount--;
                }

                if (this.lifeCount > 0 || this.immortal) {
                    this.position = this.calcPosition();

                    this.spawnDelay =
                        ((this.emitterOptions.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
                } else {
                    this.destroy();
                }

                this.currentDuration -= this.duration;
                delete this.duration;
            }
        }

        if (this.spawnDelay !== undefined) {
            this.currentSpawnDelay += delta.value;

            if (this.currentSpawnDelay >= this.spawnDelay) {
                this.play();
                this.currentSpawnDelay -= this.currentSpawnDelay;
                delete this.spawnDelay;
            }
        }

        if (this.emitDelay !== undefined) {
            this.currentEmitDelay += delta.value;

            if (this.currentEmitDelay >= this.emitDelay) {
                this.emit();
                this.currentEmitDelay -= this.emitDelay;
            }
        }
    }

    private prepareToDie(): void {
        const duration = this.emitterOptions.life?.duration;

        if (
            this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal) &&
            duration !== undefined &&
            duration > 0
        ) {
            this.duration = duration * 1000;
        }
    }

    private destroy(): void {
        this.emitters.removeEmitter(this);
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.emitterOptions.position;

        return {
            x: ((percentPosition?.x ?? Math.random() * 100) / 100) * container.canvas.size.width,
            y: ((percentPosition?.y ?? Math.random() * 100) / 100) * container.canvas.size.height,
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
            const particlesOptions = Utils.deepExtend({}, this.particlesOptions) as RecursivePartial<IParticles>;

            container.particles.addParticle(randomPosition(position, offset), particlesOptions);
        }
    }
}
