import type {
    Container,
    IColorAnimation,
    ICoordinates,
    IDelta,
    IDimension,
    IHsl,
    IParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import {
    SizeMode,
    Vector,
    calcPositionOrRandomFromSizeRanged,
    colorToHsl,
    deepExtend,
    getRangeValue,
    isPointInside,
    randomInRange,
} from "tsparticles-engine";
import { Emitter } from "./Options/Classes/Emitter";
import { EmitterSize } from "./Options/Classes/EmitterSize";
import type { Emitters } from "./Emitters";
import type { EmittersEngine } from "./EmittersEngine";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import type { IEmitterShape } from "./IEmitterShape";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize";

/**
 * @category Emitters Plugin
 */
export class EmitterInstance {
    position?: ICoordinates;
    size;
    options;
    spawnColor?: IHsl;
    fill;

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

    readonly #engine;

    constructor(
        engine: EmittersEngine,
        private readonly emitters: Emitters,
        private readonly container: Container,
        options: RecursivePartial<IEmitter>,
        position?: ICoordinates
    ) {
        this.#engine = engine;
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;

        if (options instanceof Emitter) {
            this.options = options;
        } else {
            this.options = new Emitter();
            this.options.load(options);
        }

        this.spawnDelay = ((this.options.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
        this.position = this.initialPosition ?? this.calcPosition();
        this.name = this.options.name;
        this.shape = this.#engine.emitterShapeManager?.getShape(this.options.shape);
        this.fill = this.options.fill;
        this.#firstSpawn = !this.options.life.wait;
        this.#startParticlesAdded = false;

        let particlesOptions = deepExtend({}, this.options.particles) as RecursivePartial<IParticlesOptions>;

        particlesOptions ??= {};
        particlesOptions.move ??= {};
        particlesOptions.move.direction ??= this.options.direction;

        if (this.options.spawnColor) {
            this.spawnColor = colorToHsl(this.options.spawnColor);
        }

        this.paused = !this.options.autoPlay;
        this.particlesOptions = particlesOptions;
        this.size =
            this.options.size ??
            ((): IEmitterSize => {
                const size = new EmitterSize();

                size.load({
                    height: 0,
                    mode: SizeMode.percent,
                    width: 0,
                });

                return size;
            })();
        this.lifeCount = this.options.life.count ?? -1;
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
            !(
                this.container.retina.reduceFactor &&
                (this.lifeCount > 0 || this.immortal || !this.options.life.count) &&
                (this.#firstSpawn || this.currentSpawnDelay >= (this.spawnDelay ?? 0))
            )
        ) {
            return;
        }

        if (this.emitDelay === undefined) {
            const delay = getRangeValue(this.options.rate.delay);

            this.emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
        }

        if (this.lifeCount > 0 || this.immortal) {
            this.prepareToDie();
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

            this.emitParticles(this.options.startCount);
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

                    this.spawnDelay = ((this.options.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
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

    getPosition(): ICoordinates | undefined {
        if (this.options.domId) {
            const container = this.container,
                element = document.getElementById(this.options.domId);

            if (element) {
                const elRect = element.getBoundingClientRect();

                return {
                    x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
                    y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio,
                };
            }
        }

        return this.position;
    }

    getSize(): IDimension {
        const container = this.container;

        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);

            if (element) {
                const elRect = element.getBoundingClientRect();

                return {
                    width: elRect.width * container.retina.pixelRatio,
                    height: elRect.height * container.retina.pixelRatio,
                };
            }
        }

        return {
            width:
                this.size.mode === SizeMode.percent
                    ? (container.canvas.size.width * this.size.width) / 100
                    : this.size.width,
            height:
                this.size.mode === SizeMode.percent
                    ? (container.canvas.size.height * this.size.height) / 100
                    : this.size.height,
        };
    }

    private prepareToDie(): void {
        if (this.paused) {
            return;
        }

        const duration = this.options.life?.duration;

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
        return calcPositionOrRandomFromSizeRanged({
            size: this.container.canvas.size,
            position: this.options.position,
        });
    }

    private emit(): void {
        if (this.paused) {
            return;
        }

        const quantity = getRangeValue(this.options.rate.quantity);

        this.emitParticles(quantity);
    }

    private emitParticles(quantity: number): void {
        const position = this.getPosition(),
            size = this.getSize();

        for (let i = 0; i < quantity; i++) {
            const particlesOptions = deepExtend({}, this.particlesOptions) as RecursivePartial<IParticlesOptions>;

            if (this.spawnColor) {
                const hslAnimation = this.options.spawnColor?.animation;

                if (hslAnimation) {
                    this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                    this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                    this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                }

                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                } else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }

            if (!position) {
                return;
            }

            const pPosition = this.shape?.randomPosition(position, size, this.fill) ?? position;

            this.container.particles.addParticle(pPosition, particlesOptions);
        }
    }

    private setColorAnimation(animation: IColorAnimation, initValue: number, maxValue: number): number {
        const container = this.container;

        if (!animation.enable) {
            return initValue;
        }

        const colorOffset = randomInRange(animation.offset),
            delay = getRangeValue(this.options.rate.delay),
            emitFactor = (1000 * delay) / container.retina.reduceFactor,
            colorSpeed = getRangeValue(animation.speed ?? 0);

        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
