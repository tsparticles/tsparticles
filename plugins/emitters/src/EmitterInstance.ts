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
    deepExtend,
    getRangeValue,
    isPointInside,
    itemFromSingleOrMultiple,
    randomInRange,
    rangeColorToHsl,
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
    fill;
    readonly name?: string;
    options;
    position?: ICoordinates;
    size;
    spawnColor?: IHsl;

    private _currentDuration;
    private _currentEmitDelay;
    private _currentSpawnDelay;
    private _duration?: number;
    private _emitDelay?: number;
    private readonly _engine;
    private _firstSpawn;
    private readonly _immortal;
    private readonly _initialPosition?: ICoordinates;
    private _lifeCount;
    private readonly _particlesOptions: RecursivePartial<IParticlesOptions>;
    private _paused;
    private readonly _shape?: IEmitterShape;
    private _spawnDelay?: number;
    private _startParticlesAdded;

    constructor(
        engine: EmittersEngine,
        private readonly emitters: Emitters,
        private readonly container: Container,
        options: RecursivePartial<IEmitter>,
        position?: ICoordinates
    ) {
        this._engine = engine;
        this._currentDuration = 0;
        this._currentEmitDelay = 0;
        this._currentSpawnDelay = 0;
        this._initialPosition = position;

        if (options instanceof Emitter) {
            this.options = options;
        } else {
            this.options = new Emitter();
            this.options.load(options);
        }

        this._spawnDelay = ((this.options.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
        this.position = this._initialPosition ?? this.calcPosition();
        this.name = this.options.name;
        this._shape = this._engine.emitterShapeManager?.getShape(this.options.shape);
        this.fill = this.options.fill;
        this._firstSpawn = !this.options.life.wait;
        this._startParticlesAdded = false;

        let particlesOptions = deepExtend({}, this.options.particles) as RecursivePartial<IParticlesOptions>;

        particlesOptions ??= {};
        particlesOptions.move ??= {};
        particlesOptions.move.direction ??= this.options.direction;

        if (this.options.spawnColor) {
            this.spawnColor = rangeColorToHsl(this.options.spawnColor);
        }

        this._paused = !this.options.autoPlay;
        this._particlesOptions = particlesOptions;
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
        this._lifeCount = this.options.life.count ?? -1;
        this._immortal = this._lifeCount <= 0;

        this._engine.dispatchEvent("emitterCreated", {
            container,
            data: {
                emitter: this,
            },
        });

        this.play();
    }

    externalPause(): void {
        this._paused = true;

        this.pause();
    }

    externalPlay(): void {
        this._paused = false;

        this.play();
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

    pause(): void {
        if (this._paused) {
            return;
        }

        delete this._emitDelay;
    }

    play(): void {
        if (this._paused) {
            return;
        }

        if (
            !(
                this.container.retina.reduceFactor &&
                (this._lifeCount > 0 || this._immortal || !this.options.life.count) &&
                (this._firstSpawn || this._currentSpawnDelay >= (this._spawnDelay ?? 0))
            )
        ) {
            return;
        }

        if (this._emitDelay === undefined) {
            const delay = getRangeValue(this.options.rate.delay);

            this._emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
        }

        if (this._lifeCount > 0 || this._immortal) {
            this.prepareToDie();
        }
    }

    resize(): void {
        const initialPosition = this._initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin)
                ? initialPosition
                : this.calcPosition();
    }

    update(delta: IDelta): void {
        if (this._paused) {
            return;
        }

        if (this._firstSpawn) {
            this._firstSpawn = false;

            this._currentSpawnDelay = this._spawnDelay ?? 0;
            this._currentEmitDelay = this._emitDelay ?? 0;
        }

        if (!this._startParticlesAdded) {
            this._startParticlesAdded = true;

            this.emitParticles(this.options.startCount);
        }

        if (this._duration !== undefined) {
            this._currentDuration += delta.value;

            if (this._currentDuration >= this._duration) {
                this.pause();

                if (this._spawnDelay !== undefined) {
                    delete this._spawnDelay;
                }

                if (!this._immortal) {
                    this._lifeCount--;
                }

                if (this._lifeCount > 0 || this._immortal) {
                    this.position = this.calcPosition();

                    this._spawnDelay = ((this.options.life.delay ?? 0) * 1000) / this.container.retina.reduceFactor;
                } else {
                    this.destroy();
                }

                this._currentDuration -= this._duration;

                delete this._duration;
            }
        }

        if (this._spawnDelay !== undefined) {
            this._currentSpawnDelay += delta.value;

            if (this._currentSpawnDelay >= this._spawnDelay) {
                this._engine.dispatchEvent("emitterPlay", {
                    container: this.container,
                });

                this.play();

                this._currentSpawnDelay -= this._currentSpawnDelay;

                delete this._spawnDelay;
            }
        }

        if (this._emitDelay !== undefined) {
            this._currentEmitDelay += delta.value;

            if (this._currentEmitDelay >= this._emitDelay) {
                this.emit();
                this._currentEmitDelay -= this._emitDelay;
            }
        }
    }

    private calcPosition(): ICoordinates {
        return calcPositionOrRandomFromSizeRanged({
            size: this.container.canvas.size,
            position: this.options.position,
        });
    }

    private destroy(): void {
        this.emitters.removeEmitter(this);

        this._engine.dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this,
            },
        });
    }

    private emit(): void {
        if (this._paused) {
            return;
        }

        const quantity = getRangeValue(this.options.rate.quantity);

        this.emitParticles(quantity);
    }

    private emitParticles(quantity: number): void {
        const position = this.getPosition(),
            size = this.getSize(),
            singleParticlesOptions = itemFromSingleOrMultiple(this._particlesOptions);

        for (let i = 0; i < quantity; i++) {
            const particlesOptions = deepExtend({}, singleParticlesOptions) as RecursivePartial<IParticlesOptions>;

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

            const pPosition = this._shape?.randomPosition(position, size, this.fill) ?? position;

            this.container.particles.addParticle(pPosition, particlesOptions);
        }
    }

    private prepareToDie(): void {
        if (this._paused) {
            return;
        }

        const duration = this.options.life?.duration;

        if (
            this.container.retina.reduceFactor &&
            (this._lifeCount > 0 || this._immortal) &&
            duration !== undefined &&
            duration > 0
        ) {
            this._duration = duration * 1000;
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
