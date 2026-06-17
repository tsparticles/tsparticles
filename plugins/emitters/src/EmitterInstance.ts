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
  hMax,
  half,
  isPointInside,
  itemFromSingleOrMultiple,
  lMax,
  millisecondsToSeconds,
  percentDenominator,
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
 * @param particlesOptions - The particlesOptions
 * @param color - The color
 * @param opacity - The opacity value
 * @param enable - The enable
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
 * @param particlesOptions - The particlesOptions
 * @param color - The color
 * @param opacity - The opacity value
 * @param width - The width
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
 * The EmitterInstance class manages a single emitter, handling particle emission,
 * lifecycle (duration/count), positioning, sizing, and shape-based spawning.
 */
export class EmitterInstance {
  /**
   * Sets if the particles will spawn at the emitter perimeter or inside the area
   */
  fill;
  /**
   * The emitter name
   */
  readonly name?: string;
  /**
   * The emitter options
   */
  options;
  /**
   * The emitter position
   */
  position: ICoordinates;
  /**
   * The emitter size
   */
  size: IDimension;
  /**
   * The emitter spawn fill color
   */
  spawnFillColor?: IHsl;
  /**
   * The emitter spawn fill enabled flag
   */
  spawnFillEnabled?: boolean;
  /**
   * The emitter spawn fill opacity
   */
  spawnFillOpacity?: number;
  /**
   * The emitter spawn stroke color
   */
  spawnStrokeColor?: IHsl;
  /**
   * The emitter spawn stroke opacity
   */
  spawnStrokeOpacity?: number;
  /**
   * The emitter spawn stroke width
   */
  spawnStrokeWidth?: number;

  readonly #container;
  #currentDuration;
  #currentEmitDelay;
  #currentSpawnDelay;
  #duration?: number;
  #emitDelay?: number;
  #firstSpawn;
  readonly #immortal;
  readonly #initialPosition?: ICoordinates;
  #lifeCount;
  #mutationObserver?: MutationObserver;
  readonly #particlesOptions: RecursivePartial<IParticlesOptions>;
  #paused;
  readonly #pluginManager;
  readonly #removeCallback;
  #resizeObserver?: ResizeObserver;
  readonly #shape?: IEmitterShape;
  #size;
  #spawnDelay?: number;
  #startParticlesAdded;

  constructor(
    pluginManager: EmittersPluginManager,
    container: Container,
    removeCallback: (emitter: EmitterInstance) => void,
    options: Emitter | RecursivePartial<IEmitter>,
    position?: ICoordinates,
  ) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#removeCallback = removeCallback;
    this.#currentDuration = 0;
    this.#currentEmitDelay = 0;
    this.#currentSpawnDelay = 0;
    this.#initialPosition = position;

    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }

    this.#spawnDelay = container.retina.reduceFactor
      ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
        container.retina.reduceFactor
      : Infinity;
    this.position = this.#initialPosition ?? this.#calcPosition();
    this.name = this.options.name;

    this.fill = this.options.fill;

    this.#firstSpawn = !this.options.life.wait;
    this.#startParticlesAdded = false;

    const particlesOptions = deepExtend({}, this.options.particles) as RecursivePartial<IParticlesOptions>;

    particlesOptions.move ??= {};
    particlesOptions.move.direction ??= this.options.direction;

    if (this.options.spawn.fill?.color) {
      this.spawnFillColor = rangeColorToHsl(this.#pluginManager, this.options.spawn.fill.color);
    }

    if (this.options.spawn.stroke?.color) {
      this.spawnStrokeColor = rangeColorToHsl(this.#pluginManager, this.options.spawn.stroke.color);
    }

    this.#paused = !this.options.autoPlay;
    this.#particlesOptions = particlesOptions;
    this.#size = this.#calcSize();
    this.size =
      this.#size.mode === PixelMode.percent
        ? {
            width: (this.#size.width / percentDenominator) * this.#container.canvas.size.width,
            height: (this.#size.height / percentDenominator) * this.#container.canvas.size.height,
          }
        : { width: this.#size.width, height: this.#size.height };
    this.#lifeCount = this.options.life.count ?? defaultLifeCount;
    this.#immortal = this.#lifeCount <= minLifeCount;

    if (this.options.domId) {
      const element = safeDocument().getElementById(this.options.domId);

      if (element) {
        this.#mutationObserver = new MutationObserver(() => {
          this.resize();
        });

        this.#resizeObserver = new ResizeObserver(() => {
          this.resize();
        });

        this.#mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ["style", "width", "height"],
        });
        this.#resizeObserver.observe(element);
      }
    }

    const shapeOptions = this.options.shape,
      shapeGenerator = this.#pluginManager.emitterShapeManager?.getShapeGenerator(shapeOptions.type);

    if (shapeGenerator) {
      this.#shape = shapeGenerator.generate(this.#container, this.position, this.size, this.fill, shapeOptions.options);
    }

    this.#container.dispatchEvent("emitterCreated", {
      emitter: this,
    });

    this.play();
  }

  /**
   * Pauses the emitter from external calls
   */
  externalPause(): void {
    this.#paused = true;

    this.pause();
  }

  /**
   * Resumes the emitter from external calls
   */
  externalPlay(): void {
    this.#paused = false;

    this.play();
  }

  /**
   * Initializes the emitter shape
   */
  async init(): Promise<void> {
    await this.#shape?.init();
  }

  /**
   * Pauses the emitter
   */
  pause(): void {
    if (this.#paused) {
      return;
    }

    this.#emitDelay = undefined;
  }

  /**
   * Starts or resumes the emitter
   */
  play(): void {
    if (this.#paused) {
      return;
    }

    if (
      !(
        (this.#lifeCount > minLifeCount || this.#immortal || !this.options.life.count) &&
        (this.#firstSpawn || this.#currentSpawnDelay >= (this.#spawnDelay ?? defaultSpawnDelay))
      )
    ) {
      return;
    }

    const container = this.#container;

    if (this.#emitDelay === undefined) {
      const delay = getRangeValue(this.options.rate.delay);

      this.#emitDelay = container.retina.reduceFactor
        ? (delay * millisecondsToSeconds) / container.retina.reduceFactor
        : Infinity;
    }

    if (this.#lifeCount > minLifeCount || this.#immortal) {
      this.#prepareToDie();
    }
  }

  /**
   * Resizes the emitter, recalculating position and size, and notifying the shape
   */
  resize(): void {
    const initialPosition = this.#initialPosition,
      container = this.#container;

    this.position =
      initialPosition && isPointInside(initialPosition, container.canvas.size, Vector.origin)
        ? initialPosition
        : this.#calcPosition();

    this.#size = this.#calcSize();
    this.size =
      this.#size.mode === PixelMode.percent
        ? {
            width: (this.#size.width / percentDenominator) * container.canvas.size.width,
            height: (this.#size.height / percentDenominator) * container.canvas.size.height,
          }
        : { width: this.#size.width, height: this.#size.height };

    this.#shape?.resize(this.position, this.size);
  }

  /**
   * Updates the emitter state, handling spawning delays, life cycle, and particle emission
   * @param delta - the delta time of the frame
   */
  update(delta: IDelta): void {
    if (this.#paused) {
      return;
    }

    const container = this.#container;

    if (this.#firstSpawn) {
      this.#firstSpawn = false;

      this.#currentSpawnDelay = this.#spawnDelay ?? defaultSpawnDelay;
      this.#currentEmitDelay = this.#emitDelay ?? defaultEmitDelay;
    }

    if (!this.#startParticlesAdded) {
      this.#startParticlesAdded = true;

      this.#emitParticles(this.options.startCount);
    }

    if (this.#duration !== undefined) {
      this.#currentDuration += delta.value;

      if (this.#currentDuration >= this.#duration) {
        this.pause();

        if (this.#spawnDelay !== undefined) {
          this.#spawnDelay = undefined;
        }

        if (!this.#immortal) {
          this.#lifeCount--;
        }

        if (this.#lifeCount > minLifeCount || this.#immortal) {
          this.position = this.#calcPosition();

          this.#shape?.resize(this.position, this.size);

          this.#spawnDelay = container.retina.reduceFactor
            ? (getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds) /
              container.retina.reduceFactor
            : Infinity;
        } else {
          this.#destroy();
        }

        this.#currentDuration -= this.#duration;

        this.#duration = undefined;
      }
    }

    if (this.#spawnDelay !== undefined) {
      this.#currentSpawnDelay += delta.value;

      if (this.#currentSpawnDelay >= this.#spawnDelay) {
        this.#container.dispatchEvent("emitterPlay");

        this.play();

        this.#currentSpawnDelay -= this.#spawnDelay;

        this.#spawnDelay = undefined;
      }
    }

    if (this.#emitDelay !== undefined) {
      this.#currentEmitDelay += delta.value;

      if (this.#currentEmitDelay >= this.#emitDelay) {
        this.#emit();
        this.#currentEmitDelay -= this.#emitDelay;
      }
    }
  }

  #calcPosition(): ICoordinates {
    const container = this.#container;

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

  #calcSize(): IDimensionWithMode {
    const container = this.#container;

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

  #destroy(): void {
    this.#mutationObserver?.disconnect();
    this.#mutationObserver = undefined;

    this.#resizeObserver?.disconnect();
    this.#resizeObserver = undefined;

    this.#removeCallback(this);

    this.#container.dispatchEvent("emitterDestroyed", {
      emitter: this,
    });
  }

  #emit(): void {
    if (this.#paused) {
      return;
    }

    const quantity = getRangeValue(this.options.rate.quantity);

    this.#emitParticles(quantity);
  }

  #emitParticles(quantity: number): void {
    const singleParticlesOptions = (itemFromSingleOrMultiple(this.#particlesOptions) ??
        {}) as RecursivePartial<IParticlesOptions>,
      fillHslAnimation = this.options.spawn.fill?.color?.animation,
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
      reduceFactor = this.#container.retina.reduceFactor,
      needsFillColorAnimation = !!fillHslAnimation,
      needsStrokeColorAnimation = !!strokeHslAnimation,
      needsShapeData = !!this.#shape,
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
          this.spawnFillColor.h = this.#setColorAnimation(
            fillHslAnimation.h,
            this.spawnFillColor.h,
            maxValues.h,
            colorFactor,
          );
          this.spawnFillColor.s = this.#setColorAnimation(fillHslAnimation.s, this.spawnFillColor.s, maxValues.s);
          this.spawnFillColor.l = this.#setColorAnimation(fillHslAnimation.l, this.spawnFillColor.l, maxValues.l);
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
          this.spawnStrokeColor.h = this.#setColorAnimation(
            strokeHslAnimation.h,
            this.spawnStrokeColor.h,
            maxValues.h,
            colorFactor,
          );
          this.spawnStrokeColor.s = this.#setColorAnimation(strokeHslAnimation.s, this.spawnStrokeColor.s, maxValues.s);
          this.spawnStrokeColor.l = this.#setColorAnimation(strokeHslAnimation.l, this.spawnStrokeColor.l, maxValues.l);
        }

        setParticlesOptionsStrokeColor(
          particlesOptions,
          this.spawnStrokeColor,
          this.spawnStrokeOpacity,
          this.spawnStrokeWidth,
        );
      }

      let position: ICoordinates | null = this.position;

      if (this.#shape) {
        const shapePosData = this.#shape.randomPosition();

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
        this.#container.particles.addParticle(position, particlesOptions);
      }
    }
  }

  #prepareToDie(): void {
    if (this.#paused) {
      return;
    }

    const duration = this.options.life.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined,
      minDuration = 0,
      minLifeCount = 0;

    if ((this.#lifeCount > minLifeCount || this.#immortal) && duration !== undefined && duration > minDuration) {
      this.#duration = duration * millisecondsToSeconds;
    }
  }

  #setColorAnimation(
    animation: IColorAnimation,
    initValue: number,
    maxValue: number,
    factor: number = defaultColorAnimationFactor,
  ): number {
    const container = this.#container;

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
  }
}
