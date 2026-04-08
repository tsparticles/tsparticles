import {
  AnimatableColor,
  type Container,
  type IColorAnimation,
  type ICoordinates,
  type IDelta,
  type IDimension,
  type IDimensionWithMode,
  type IHsl,
  type IPaint,
  type IParticlesOptions,
  type IRgb,
  Paint,
  PixelMode,
  type RecursivePartial,
  Vector,
  calcPositionOrRandomFromSizeRanged,
  deepExtend,
  defaultOpacity,
  getRangeValue,
  getSize,
  hMax,
  half,
  isPointInside,
  itemFromSingleOrMultiple,
  lMax,
  millisecondsToSeconds,
  randomInRangeValue,
  rangeColorToHsl,
  sMax,
  safeDocument,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterSize } from "./Options/Classes/EmitterSize.js";
import type { EmittersPluginManager } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { IEmitterSize } from "./Options/Interfaces/IEmitterSize.js";

const defaultLifeDelay = 0,
  minLifeCount = 0,
  defaultSpawnDelay = 0,
  defaultEmitDelay = 0,
  defaultLifeCount = -1,
  defaultColorAnimationFactor = 1,
  colorFactor = 3.6,
  defaultStrokeWidth = 1;

/**
 *
 * @param particlesOptions -
 * @param color -
 * @param opacity -
 * @param enable -
 */
function setParticlesOptionsFillColor(
  particlesOptions: RecursivePartial<IParticlesOptions>,
  color: IHsl | IRgb,
  opacity: number,
  enable: boolean,
): void {
  const paint = (particlesOptions.paint ??= new Paint()) as RecursivePartial<IPaint>;

  paint.fill = {
    color: AnimatableColor.create(undefined, { value: color }),
    enable,
    opacity,
  };
}

/**
 *
 * @param particlesOptions -
 * @param color -
 * @param opacity -
 * @param width -
 */
function setParticlesOptionsStrokeColor(
  particlesOptions: RecursivePartial<IParticlesOptions>,
  color: IHsl | IRgb,
  opacity: number,
  width: number,
): void {
  const paint = (particlesOptions.paint ??= new Paint()) as RecursivePartial<IPaint>;

  paint.stroke = {
    color: AnimatableColor.create(undefined, { value: color }),
    opacity,
    width,
  };
}

/**
 */
export class EmitterInstance {
  fill;
  readonly name?: string;
  options;
  position: ICoordinates;
  size: IDimension;
  spawnFillColor?: IHsl;
  spawnFillEnabled?: boolean;
  spawnFillOpacity?: number;
  spawnStrokeColor?: IHsl;
  spawnStrokeOpacity?: number;
  spawnStrokeWidth?: number;

  private readonly _container;
  private _currentDuration;
  private _currentEmitDelay;
  private _currentSpawnDelay;
  private _duration?: number;
  private _emitDelay?: number;
  private _firstSpawn;
  private readonly _immortal;
  private readonly _initialPosition?: ICoordinates;
  private _lifeCount;
  private _mutationObserver?: MutationObserver;
  private readonly _particlesOptions: RecursivePartial<IParticlesOptions>;
  private _paused;
  private readonly _pluginManager;
  private readonly _removeCallback;
  private _resizeObserver?: ResizeObserver;
  private readonly _shape?: IEmitterShape;
  private _size;
  private _spawnDelay?: number;
  private _startParticlesAdded;

  constructor(
    pluginManager: EmittersPluginManager,
    container: Container,
    removeCallback: (emitter: EmitterInstance) => void,
    options: Emitter | RecursivePartial<IEmitter>,
    position?: ICoordinates,
  ) {
    this._pluginManager = pluginManager;
    this._container = container;
    this._removeCallback = removeCallback;
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

    if (this.options.spawn.fill?.color) {
      this.spawnFillColor = rangeColorToHsl(this._pluginManager, this.options.spawn.fill.color);
    }

    if (this.options.spawn.stroke?.color) {
      this.spawnStrokeColor = rangeColorToHsl(this._pluginManager, this.options.spawn.stroke.color);
    }

    this._paused = !this.options.autoPlay;
    this._particlesOptions = particlesOptions;
    this._size = this._calcSize();
    this.size = getSize(this._size, this._container.canvas.size);
    this._lifeCount = this.options.life.count ?? defaultLifeCount;
    this._immortal = this._lifeCount <= minLifeCount;

    if (this.options.domId) {
      const element = safeDocument().getElementById(this.options.domId);

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
      shapeGenerator = this._pluginManager.emitterShapeManager?.getShapeGenerator(shapeOptions.type);

    if (shapeGenerator) {
      this._shape = shapeGenerator.generate(this._container, this.position, this.size, this.fill, shapeOptions.options);
    }

    this._container.dispatchEvent("emitterCreated", {
      emitter: this,
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

    const container = this._container;

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
      container = this._container;

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

    const container = this._container;

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
        this._container.dispatchEvent("emitterPlay");

        this.play();

        this._currentSpawnDelay -= this._spawnDelay;

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
    const container = this._container;

    if (this.options.domId) {
      const element = safeDocument().getElementById(this.options.domId);

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
    const container = this._container;

    if (this.options.domId) {
      const element = safeDocument().getElementById(this.options.domId);

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

    this._removeCallback(this);

    this._container.dispatchEvent("emitterDestroyed", {
      emitter: this,
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
    const singleParticlesOptions = (itemFromSingleOrMultiple(this._particlesOptions) ??
        {}) as RecursivePartial<IParticlesOptions>,
      fillHslAnimation = this.options.spawn.fill?.color.animation,
      fillEnabled = this.options.spawn.fill?.enable ?? !!this.options.spawn.fill?.color,
      fillOpacity =
        this.options.spawn.fill?.opacity === undefined
          ? defaultOpacity
          : getRangeValue(this.options.spawn.fill.opacity),
      strokeHslAnimation = this.options.spawn.stroke?.color?.animation,
      strokeOpacity =
        this.options.spawn.stroke?.opacity === undefined
          ? defaultOpacity
          : getRangeValue(this.options.spawn.stroke.opacity),
      strokeWidth =
        this.options.spawn.stroke?.width === undefined
          ? defaultStrokeWidth
          : getRangeValue(this.options.spawn.stroke.width),
      reduceFactor = this._container.retina.reduceFactor,
      needsFillColorAnimation = !!fillHslAnimation,
      needsStrokeColorAnimation = !!strokeHslAnimation,
      needsShapeData = !!this._shape,
      needsColorAnimation = needsFillColorAnimation || needsStrokeColorAnimation,
      needsCopy = needsColorAnimation || needsShapeData,
      maxValues = needsColorAnimation ? { h: hMax, s: sMax, l: lMax } : null,
      shapeOptions = this.options.shape;

    for (let i = 0; i < quantity * reduceFactor; i++) {
      const particlesOptions = needsCopy
        ? (deepExtend({}, singleParticlesOptions) as RecursivePartial<IParticlesOptions>)
        : singleParticlesOptions;

      this.spawnFillOpacity = fillOpacity;
      this.spawnFillEnabled = fillEnabled;
      this.spawnStrokeOpacity = strokeOpacity;
      this.spawnStrokeWidth = strokeWidth;

      if (this.spawnFillColor) {
        if (fillHslAnimation && maxValues) {
          this.spawnFillColor.h = this._setColorAnimation(
            fillHslAnimation.h,
            this.spawnFillColor.h,
            maxValues.h,
            colorFactor,
          );
          this.spawnFillColor.s = this._setColorAnimation(fillHslAnimation.s, this.spawnFillColor.s, maxValues.s);
          this.spawnFillColor.l = this._setColorAnimation(fillHslAnimation.l, this.spawnFillColor.l, maxValues.l);
        }

        setParticlesOptionsFillColor(
          particlesOptions,
          this.spawnFillColor,
          this.spawnFillOpacity,
          this.spawnFillEnabled,
        );
      }

      if (this.spawnStrokeColor) {
        if (strokeHslAnimation && maxValues) {
          this.spawnStrokeColor.h = this._setColorAnimation(
            strokeHslAnimation.h,
            this.spawnStrokeColor.h,
            maxValues.h,
            colorFactor,
          );
          this.spawnStrokeColor.s = this._setColorAnimation(strokeHslAnimation.s, this.spawnStrokeColor.s, maxValues.s);
          this.spawnStrokeColor.l = this._setColorAnimation(strokeHslAnimation.l, this.spawnStrokeColor.l, maxValues.l);
        }

        setParticlesOptionsStrokeColor(
          particlesOptions,
          this.spawnStrokeColor,
          this.spawnStrokeOpacity,
          this.spawnStrokeWidth,
        );
      }

      let position: ICoordinates | null = this.position;

      if (this._shape) {
        const shapePosData = this._shape.randomPosition();

        if (shapePosData) {
          position = shapePosData.position;

          const replaceData = shapeOptions.replace;

          if (replaceData.color && shapePosData.color) {
            setParticlesOptionsFillColor(
              particlesOptions,
              shapePosData.color,
              replaceData.opacity ? (shapePosData.opacity ?? defaultOpacity) : defaultOpacity,
              true,
            );
          }
        } else {
          position = null;
        }
      }

      if (position) {
        this._container.particles.addParticle(position, particlesOptions);
      }
    }
  }

  private readonly _prepareToDie: () => void = () => {
    if (this._paused) {
      return;
    }

    const duration = this.options.life.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined,
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
    const container = this._container;

    if (!animation.enable) {
      return initValue;
    }

    const colorOffset = randomInRangeValue(animation.offset),
      delay = getRangeValue(this.options.rate.delay),
      emitFactor = container.retina.reduceFactor
        ? (delay * millisecondsToSeconds) / container.retina.reduceFactor
        : Infinity,
      colorSpeed = getRangeValue(animation.speed);

    return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * factor) % maxValue;
  };
}
