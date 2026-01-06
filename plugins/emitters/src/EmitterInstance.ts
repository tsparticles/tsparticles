import {
    type Container,
    type IColorAnimation,
    type ICoordinates,
    type IDelta,
    type IDimension,
    type IDimensionWithMode,
    type IHsl,
    type IParticlesOptions,
    type IRgb,
    PixelMode,
    type RecursivePartial,
    Vector,
    calcPositionOrRandomFromSizeRanged,
    deepExtend,
    getRangeValue,
    getSize,
    hMax,
    half,
    isPointInside,
    itemFromSingleOrMultiple,
    lMax,
    millisecondsToSeconds,
    randomInRange,
    rangeColorToHsl,
    sMax,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterSize } from "./Options/Classes/EmitterSize.js";
import type { Emitters } from "./Emitters.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize.js";

const defaultLifeDelay = 0,
    minLifeCount = 0,
    defaultSpawnDelay = 0,
    defaultEmitDelay = 0,
    defaultLifeCount = -1,
    defaultColorAnimationFactor = 1;

/**
 *
 * @param particlesOptions -
 * @param color -
 */
function setParticlesOptionsColor(particlesOptions: RecursivePartial<IParticlesOptions>, color: IHsl | IRgb): void {
    if (particlesOptions.color) {
        particlesOptions.color.value = color;
    } else {
        particlesOptions.color = {
            value: color,
        };
    }
}

/**
 */
export class EmitterInstance {
    fill;
    readonly name?: string;
    options;
    position: ICoordinates;
    size: IDimension;
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
    private _mutationObserver?: MutationObserver;
    private readonly _particlesOptions: RecursivePartial<IParticlesOptions>;
    private _paused;
    private _resizeObserver?: ResizeObserver;
    private readonly _shape?: IEmitterShape;
    private _size;
    private _spawnDelay?: number;
    private _startParticlesAdded;

    constructor(
        engine: EmittersEngine,
        private readonly emitters: Emitters,
        private readonly container: Container,
        options: Emitter | RecursivePartial<IEmitter>,
        position?: ICoordinates,
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

        this._spawnDelay = container.retina.reduceFactor
            ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
              container.retina.reduceFactor
            : Infinity;
        this.position = this._initialPosition ?? this._calcPosition();
        this.name = this.options.name;

        this.fill = this.options.fill;

        this._firstSpawn = !this.options.life.wait;
        this._startParticlesAdded = false;

        const particlesOptions = deepExtend({}, this.options.particles) as RecursivePartial<IParticlesOptions>;

        particlesOptions.move ??= {};
        particlesOptions.move.direction ??= this.options.direction;

        if (this.options.spawnColor) {
            this.spawnColor = rangeColorToHsl(this._engine, this.options.spawnColor);
        }

        this._paused = !this.options.autoPlay;
        this._particlesOptions = particlesOptions;
        this._size = this._calcSize();
        this.size = getSize(this._size, this.container.canvas.size);
        this._lifeCount = this.options.life.count ?? defaultLifeCount;
        this._immortal = this._lifeCount <= minLifeCount;

        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);

            if (element) {
                this._mutationObserver = new MutationObserver(() => {
                    this.resize();
                });

                this._resizeObserver = new ResizeObserver(() => {
                    this.resize();
                });

                this._mutationObserver.observe(element, {
                    attributes: true,
                    attributeFilter: ["style", "width", "height"],
                });
                this._resizeObserver.observe(element);
            }
        }

        const shapeOptions = this.options.shape,
            shapeGenerator = this._engine.emitterShapeManager?.getShapeGenerator(shapeOptions.type);

        if (shapeGenerator) {
            this._shape = shapeGenerator.generate(this.position, this.size, this.fill, shapeOptions.options);
        }

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

    async init(): Promise<void> {
        await this._shape?.init();
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
                (this._lifeCount > minLifeCount || this._immortal || !this.options.life.count) &&
                (this._firstSpawn || this._currentSpawnDelay >= (this._spawnDelay ?? defaultSpawnDelay))
            )
        ) {
            return;
        }

        const container = this.container;

        if (this._emitDelay === undefined) {
            const delay = getRangeValue(this.options.rate.delay);

            this._emitDelay = container.retina.reduceFactor
                ? (delay * millisecondsToSeconds) / container.retina.reduceFactor
                : Infinity;
        }

        if (this._lifeCount > minLifeCount || this._immortal) {
            this._prepareToDie();
        }
    }

    resize(): void {
        const initialPosition = this._initialPosition,
            container = this.container;

        this.position =
            initialPosition && isPointInside(initialPosition, container.canvas.size, Vector.origin)
                ? initialPosition
                : this._calcPosition();

        this._size = this._calcSize();
        this.size = getSize(this._size, container.canvas.size);

        this._shape?.resize(this.position, this.size);
    }

    update(delta: IDelta): void {
        if (this._paused) {
            return;
        }

        const container = this.container;

        if (this._firstSpawn) {
            this._firstSpawn = false;

            this._currentSpawnDelay = this._spawnDelay ?? defaultSpawnDelay;
            this._currentEmitDelay = this._emitDelay ?? defaultEmitDelay;
        }

        if (!this._startParticlesAdded) {
            this._startParticlesAdded = true;

            this._emitParticles(this.options.startCount);
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

                if (this._lifeCount > minLifeCount || this._immortal) {
                    this.position = this._calcPosition();

                    this._shape?.resize(this.position, this.size);

                    this._spawnDelay = container.retina.reduceFactor
                        ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
                          container.retina.reduceFactor
                        : Infinity;
                } else {
                    this._destroy();
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
                this._emit();
                this._currentEmitDelay -= this._emitDelay;
            }
        }
    }

    private _calcPosition(): ICoordinates {
        const container = this.container;

        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);

            if (element) {
                const elRect = element.getBoundingClientRect(),
                    pxRatio = container.retina.pixelRatio;

                return {
                    x: (elRect.x + elRect.width * half) * pxRatio,
                    y: (elRect.y + elRect.height * half) * pxRatio,
                };
            }
        }

        return calcPositionOrRandomFromSizeRanged({
            size: container.canvas.size,
            position: this.options.position,
        });
    }

    private _calcSize(): IDimensionWithMode {
        const container = this.container;

        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);

            if (element) {
                const elRect = element.getBoundingClientRect();

                return {
                    width: elRect.width * container.retina.pixelRatio,
                    height: elRect.height * container.retina.pixelRatio,
                    mode: PixelMode.precise,
                };
            }
        }

        return (
            this.options.size ??
            ((): IEmitterSize => {
                const size = new EmitterSize();

                size.load({
                    height: 0,
                    mode: PixelMode.percent,
                    width: 0,
                });

                return size;
            })()
        );
    }

    private readonly _destroy: () => void = () => {
        this._mutationObserver?.disconnect();
        this._mutationObserver = undefined;

        this._resizeObserver?.disconnect();
        this._resizeObserver = undefined;

        this.emitters.removeEmitter(this);

        this._engine.dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this,
            },
        });
    };

    private _emit(): void {
        if (this._paused) {
            return;
        }

        const quantity = getRangeValue(this.options.rate.quantity);

        this._emitParticles(quantity);
    }

    private _emitParticles(quantity: number): void {
        const singleParticlesOptions = itemFromSingleOrMultiple(this._particlesOptions),
            reduceFactor = this.container.retina.reduceFactor;

        for (let i = 0; i < quantity * reduceFactor; i++) {
            const particlesOptions = deepExtend({}, singleParticlesOptions) as RecursivePartial<IParticlesOptions>;

            if (this.spawnColor) {
                const hslAnimation = this.options.spawnColor?.animation;

                if (hslAnimation) {
                    const maxValues = {
                            h: hMax,
                            s: sMax,
                            l: lMax,
                        },
                        colorFactor = 3.6;

                    this.spawnColor.h = this._setColorAnimation(
                        hslAnimation.h,
                        this.spawnColor.h,
                        maxValues.h,
                        colorFactor,
                    );
                    this.spawnColor.s = this._setColorAnimation(hslAnimation.s, this.spawnColor.s, maxValues.s);
                    this.spawnColor.l = this._setColorAnimation(hslAnimation.l, this.spawnColor.l, maxValues.l);
                }

                setParticlesOptionsColor(particlesOptions, this.spawnColor);
            }

            const shapeOptions = this.options.shape;

            let position: ICoordinates | null = this.position;

            if (this._shape) {
                const shapePosData = this._shape.randomPosition();

                if (shapePosData) {
                    position = shapePosData.position;

                    const replaceData = shapeOptions.replace;

                    if (replaceData.color && shapePosData.color) {
                        setParticlesOptionsColor(particlesOptions, shapePosData.color);
                    }

                    if (replaceData.opacity) {
                        if (particlesOptions.opacity) {
                            particlesOptions.opacity.value = shapePosData.opacity;
                        } else {
                            particlesOptions.opacity = {
                                value: shapePosData.opacity,
                            };
                        }
                    }
                } else {
                    position = null;
                }
            }

            if (position) {
                this.container.particles.addParticle(position, particlesOptions);
            }
        }
    }

    private readonly _prepareToDie: () => void = () => {
        if (this._paused) {
            return;
        }

        const duration =
                this.options.life.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined,
            minDuration = 0,
            minLifeCount = 0;

        if ((this._lifeCount > minLifeCount || this._immortal) && duration !== undefined && duration > minDuration) {
            this._duration = duration * millisecondsToSeconds;
        }
    };

    private readonly _setColorAnimation = (
        animation: IColorAnimation,
        initValue: number,
        maxValue: number,
        factor: number = defaultColorAnimationFactor,
    ): number => {
        const container = this.container;

        if (!animation.enable) {
            return initValue;
        }

        const colorOffset = randomInRange(animation.offset),
            delay = getRangeValue(this.options.rate.delay),
            emitFactor = container.retina.reduceFactor
                ? (delay * millisecondsToSeconds) / container.retina.reduceFactor
                : Infinity,
            colorSpeed = getRangeValue(animation.speed);

        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * factor) % maxValue;
    };
}
