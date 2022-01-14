import type { IEmitter } from "./Options/Interfaces/IEmitter";
import {
    colorToHsl,
    deepExtend,
    getRangeValue,
    isPointInside,
    randomInRange,
    SizeMode,
    Vector,
} from "tsparticles-engine";
import type {
    Container,
    ICoordinates,
    IDelta,
    IHsl,
    RecursivePartial,
    Engine,
    IParticlesOptions,
    IColorAnimation,
    IHslAnimation,
} from "tsparticles-engine";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import type { Emitters } from "./Emitters";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize";
import { ShapeManager } from "./ShapeManager";

/**
 * @category Emitters Plugin
 */
export class EmitterInstance {
    position: ICoordinates;
    size: IEmitterSize;
    emitterOptions: IEmitter;
    spawnColor?: IHsl;
    fill;

    #engine;
    #firstSpawn;
    #startParticlesAdded;

    readonly name?: string;
    private paused;
    private currentEmitDelay;
    private currentSpawnDelay;
    private currentDuration;
    private lifeCount;

    private duration?: number;
    private emitDelay?: number;
    private spawnDelay?: number;

    private readonly immortal;

    private readonly shape?: IEmitterShape;
    private readonly initialPosition?: ICoordinates;
    private readonly particlesOptions: RecursivePartial<IParticlesOptions>;

    constructor(
        private readonly emitters: Emitters,
        private readonly container: Container,
        engine: Engine,
        emitterOptions: IEmitter,
        position?: ICoordinates
    ) {
        this.#engine = engine;
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        this.emitterOptions = deepExtend({}, emitterOptions) as IEmitter;
        this.spawnDelay = ((this.emitterOptions.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
        this.position = this.initialPosition ?? this.calcPosition();
        this.name = emitterOptions.name;
        this.shape = ShapeManager.getShape(emitterOptions.shape);
        this.fill = emitterOptions.fill;
        this.#firstSpawn = !this.emitterOptions.life.wait;
        this.#startParticlesAdded = false;

        let particlesOptions = deepExtend({}, this.emitterOptions.particles) as RecursivePartial<IParticlesOptions>;

        particlesOptions ??= {};
        particlesOptions.move ??= {};
        particlesOptions.move.direction ??= this.emitterOptions.direction;

        if (this.emitterOptions.spawnColor !== undefined) {
            this.spawnColor = colorToHsl(this.emitterOptions.spawnColor);
        }

        this.paused = !this.emitterOptions.autoPlay;
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

        this.#engine.dispatchEvent("emitterCreated", {
            container,
            data: {
                emitter: this,
            },
        });

        this.play();
    }

    externalPlay(): void {
        this.paused = false;

        this.play();
    }

    externalPause(): void {
        this.paused = true;

        this.pause();
    }

    play(): void {
        if (this.paused) {
            return;
        }

        if (
            this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count) &&
            (this.#firstSpawn || this.currentSpawnDelay >= (this.spawnDelay ?? 0))
        ) {
            if (this.emitDelay === undefined) {
                const delay = getRangeValue(this.emitterOptions.rate.delay);

                this.emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
            }

            if (this.lifeCount > 0 || this.immortal) {
                this.prepareToDie();
            }
        }
    }

    pause(): void {
        if (this.paused) {
            return;
        }

        delete this.emitDelay;
    }

    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin)
                ? initialPosition
                : this.calcPosition();
    }

    update(delta: IDelta): void {
        if (this.paused) {
            return;
        }

        if (this.#firstSpawn) {
            this.#firstSpawn = false;

            this.currentSpawnDelay = this.spawnDelay ?? 0;
            this.currentEmitDelay = this.emitDelay ?? 0;
        }

        if (!this.#startParticlesAdded) {
            this.#startParticlesAdded = true;

            this.emitParticles(this.emitterOptions.startCount);
        }

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
                this.#engine.dispatchEvent("emitterPlay", {
                    container: this.container,
                });

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
        if (this.paused) {
            return;
        }

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

        this.#engine.dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this,
            },
        });
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
        if (this.paused) {
            return;
        }

        const quantity = getRangeValue(this.emitterOptions.rate.quantity);

        this.emitParticles(quantity);
    }

    private emitParticles(quantity: number): void {
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

        for (let i = 0; i < quantity; i++) {
            const particlesOptions = deepExtend({}, this.particlesOptions) as RecursivePartial<IParticlesOptions>;

            if (this.spawnColor) {
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

            const pPosition = this.shape?.randomPosition(position, offset, this.fill) ?? position;

            container.particles.addParticle(pPosition, particlesOptions);
        }
    }

    private setColorAnimation(animation: IColorAnimation, initValue: number, maxValue: number): number {
        const container = this.container;

        if (!animation.enable) {
            return initValue;
        }

        const colorOffset = randomInRange(animation.offset);

        const delay = getRangeValue(this.emitterOptions.rate.delay);
        const emitFactor = (1000 * delay) / container.retina.reduceFactor;
        const colorSpeed = animation.speed ?? 0;

        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
