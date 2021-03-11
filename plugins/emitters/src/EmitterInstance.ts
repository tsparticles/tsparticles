import type { Container } from "tsparticles-engine/Core/Container";
import type { ICoordinates } from "tsparticles-engine/Core/Interfaces/ICoordinates";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import { colorToHsl, deepExtend, isPointInside, randomInRange } from "tsparticles-engine/Utils";
import { SizeMode } from "tsparticles-engine/Enums";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import type { Emitters } from "./Emitters";
import type { RecursivePartial } from "tsparticles-engine/Types";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize";
import type { IHsl } from "tsparticles-engine/Core/Interfaces/Colors";
import type { IDelta } from "tsparticles-engine/Core/Interfaces/IDelta";
import type { IColorAnimation } from "tsparticles-engine/Options/Interfaces/IColorAnimation";
import type { IHslAnimation } from "tsparticles-engine/Options/Interfaces/IHslAnimation";

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
    public spawnColor?: IHsl;
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
        this.emitterOptions = deepExtend({}, emitterOptions) as IEmitter;
        this.position = this.initialPosition ?? this.calcPosition();
        this.name = emitterOptions.name;

        let particlesOptions = deepExtend({}, this.emitterOptions.particles) as RecursivePartial<IParticles>;

        if (particlesOptions === undefined) {
            particlesOptions = {};
        }

        if (particlesOptions.move === undefined) {
            particlesOptions.move = {};
        }

        if (particlesOptions.move.direction === undefined) {
            particlesOptions.move.direction = this.emitterOptions.direction;
        }

        if (this.emitterOptions.spawnColor !== undefined) {
            this.spawnColor = colorToHsl(this.emitterOptions.spawnColor);
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
            initialPosition && isPointInside(initialPosition, this.container.canvas.size)
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
            const particlesOptions = deepExtend({}, this.particlesOptions) as RecursivePartial<IParticles>;

            if (this.spawnColor !== undefined) {
                const colorAnimation = this.emitterOptions.spawnColor?.animation;

                if (colorAnimation) {
                    const hueAnimation = colorAnimation as IColorAnimation;

                    if (hueAnimation.enable) {
                        this.spawnColor.h = this.setColorAnimation(hueAnimation, this.spawnColor.h, 360);
                    } else {
                        const hslAnimation = colorAnimation as IHslAnimation;

                        this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                        this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                        this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                    }
                }

                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                } else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }

            if (this.emitterOptions.spin.enable) {
                if (!particlesOptions.move) {
                    particlesOptions.move = {};
                }

                if (!particlesOptions.move.spin) {
                    particlesOptions.move.spin = {
                        enable: true,
                        position: {
                            x: (position.x * 100) / container.canvas.size.width,
                            y: (position.y * 100) / container.canvas.size.height,
                        },
                    };
                }
            }

            container.particles.addParticle(randomPosition(position, offset), particlesOptions);
        }
    }

    private setColorAnimation(animation: IColorAnimation, initValue: number, maxValue: number): number {
        const container = this.container;

        if (!animation.enable) {
            return initValue;
        }

        const colorOffset = randomInRange(animation.offset);

        const emitFactor = (1000 * this.emitterOptions.rate.delay) / container.retina.reduceFactor;
        const colorSpeed = animation.speed ?? 0;

        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
