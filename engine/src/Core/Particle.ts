import type { ICenterCoordinates, ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates.js";
import type { IParticleCanvasBoundsData, IParticleCanvasBoundsResult } from "./Interfaces/IParticleCanvasBounds.js";
import { Vector, Vector3d } from "./Utils/Vectors.js";
import { alterHsl, getHslFromAnimation } from "../Utils/ColorUtils.js";
import {
  calcExactPositionOrRandomFromSize,
  clamp,
  degToRad,
  getParticleBaseVelocity,
  getParticleDirectionAngle,
  getRandom,
  getRangeValue,
  randomInRangeValue,
  setRangeValue,
} from "../Utils/MathUtils.js";
import { deepExtend, getPosition, isInArray, itemFromSingleOrMultiple } from "../Utils/Utils.js";
import {
  defaultAngle,
  defaultOpacity,
  defaultRetryCount,
  defaultTransform,
  double,
  doublePI,
  half,
  identity,
  minZ,
  randomColorValue,
  squareExp,
  triple,
  tryCountIncrement,
  zIndexFactorOffset,
} from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IEffect } from "../Options/Interfaces/Particles/Effect/IEffect.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation.js";
import type { IParticleNumericValueAnimation } from "./Interfaces/IParticleValueAnimation.js";
import type { IParticleOpacityData } from "./Interfaces/IParticleOpacityData.js";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps.js";
import type { IParticleRoll } from "./Interfaces/IParticleRoll.js";
import type { IParticleRotateData } from "./Interfaces/IParticleRotateData.js";
import type { IParticleTransformValues } from "../export-types.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { IShapeValues } from "./Interfaces/IShapeValues.js";
import type { ISlowParticleData } from "./Interfaces/ISlowParticleData.js";
import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { OutMode } from "../Enums/Modes/OutMode.js";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection.js";
import { ParticleOutType } from "../Enums/Types/ParticleOutType.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "./Utils/PluginManager.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { loadParticlesOptions } from "../Utils/OptionsUtils.js";

/**
 * @internal
 */
interface FixOutModeParams {
  /**
   */
  checkModes: (OutMode | keyof typeof OutMode)[];
  /**
   */
  coord: number;
  /**
   */
  maxCoord: number;
  /**
   */
  outMode: OutMode | keyof typeof OutMode;
  /**
   */
  radius: number;
  /**
   * @param value -
   */
  setCb: (value: number) => void;
}

/**
 *
 * @param effect -
 * @param effectOptions -
 * @param id -
 * @param reduceDuplicates -
 * @returns the effect data
 */
function loadEffectData(
  effect: string,
  effectOptions: IEffect,
  id: number,
  reduceDuplicates: boolean,
): IShapeValues | undefined {
  const effectData = effectOptions.options[effect];

  return deepExtend(
    {
      close: effectOptions.close,
    },
    itemFromSingleOrMultiple(effectData, id, reduceDuplicates),
  ) as IShapeValues;
}

/**
 *
 * @param shape -
 * @param shapeOptions -
 * @param id -
 * @param reduceDuplicates -
 * @returns the shape data
 */
function loadShapeData(
  shape: string,
  shapeOptions: IShape,
  id: number,
  reduceDuplicates: boolean,
): IShapeValues | undefined {
  const shapeData = shapeOptions.options[shape];

  return deepExtend(
    {
      close: shapeOptions.close,
    },
    itemFromSingleOrMultiple(shapeData, id, reduceDuplicates),
  ) as IShapeValues;
}

/**
 * fixes out mode, calling the given callback if needed
 * @internal
 * @param data -
 */
function fixOutMode(data: FixOutModeParams): void {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }

  const diameter = data.radius * double;

  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
}

/**
 * The single particle object
 */
export class Particle {
  /**
   * Particles back color
   */
  backColor?: IHsl;

  /**
   * Gets particles bubble data
   */
  bubble!: IBubbleParticleData;

  /**
   * Checks if the particle is destroyed
   */
  destroyed!: boolean;

  /**
   * Gets particle direction, the value is an angle in rad
   */
  direction!: number;

  /**
   * Gets particle effect type
   */
  effect?: string;

  /**
   * Checks if the particle effect needs a closed path
   */
  effectClose!: boolean;

  /**
   * Gets particle effect options
   */
  effectData?: IShapeValues;

  /**
   * Sets the particle fill color
   */
  fillColor?: IParticleHslAnimation;

  /**
   * Sets the particle fill status
   */
  fillEnabled?: boolean;

  /**
   * Sets the particle fill opacity
   */
  fillOpacity?: number;

  /** The particle group */
  group?: string;

  /** The particle id */
  id!: number;

  /**
   * When this is enabled, the particle won't resize when the canvas resize event is fired
   */
  ignoresResizeRatio!: boolean;

  /**
   * Gets particle initial position
   */
  initialPosition!: Vector;

  /**
   * Gets particle initial velocity
   */
  initialVelocity!: Vector;

  /** Checks if the particle is rotating */
  isRotating!: boolean;

  /** Checks if the particle just warped */
  justWarped!: boolean;

  /**
   * Last path timestamp
   */
  lastPathTime!: number;

  /**
   * Check if the particle needs a fix on the position
   */
  misplaced!: boolean;

  /** The move center coordinates */
  moveCenter!: ICenterCoordinates;

  /**
   * Gets particle offset position, used for parallax interaction
   */
  offset!: Vector;

  /**
   * Gets the particle opacity options
   */
  opacity?: IParticleNumericValueAnimation;

  /**
   * Gets the particle options
   */
  options!: ParticlesOptions;

  /** The particle out type */
  outType!: ParticleOutType;

  /**
   * Gets if the particle should rotate with path
   */
  pathRotation!: boolean;

  /**
   * Gets particle current position
   */
  position!: Vector3d;

  /**
   * The random index used by the particle
   */
  randomIndexData?: number;

  /**
   * Gets the particle retina values
   */
  retina!: IParticleRetinaProps;

  /**
   * Gets the particle roll options
   */
  roll?: IParticleRoll;

  /**
   * Gets the particle rotation angle
   */
  rotation!: number;

  /**
   * Gets particle shape type
   */
  shape?: string;

  /**
   * Checks if the particle shape needs a closed path
   */
  shapeClose!: boolean;

  /**
   * Gets particle shape options
   */
  shapeData?: IShapeValues;

  /**
   * Gets the particle side count
   */
  sides!: number;

  /**
   * Gets particle size options
   */
  size!: IParticleNumericValueAnimation;

  /**
   * Gets particle slow options
   */
  slow!: ISlowParticleData;

  /**
   * Check if the particle is spawning, and can't be touched
   */
  spawning!: boolean;

  /**
   * Sets the particle stroke color
   */
  strokeColor?: IParticleHslAnimation;

  /**
   * Sets the particle stroke opacity
   */
  strokeOpacity?: number;

  /**
   * Sets the particle stroke width
   */
  strokeWidth?: number;

  /**
   * Checks if the particle is unbreakable, if true the particle won't destroy on collisions
   */
  unbreakable!: boolean;

  /**
   * Gets particle current velocity
   */
  velocity!: Vector;

  /**
   * Gets the particle Z-Index factor
   */
  zIndexFactor!: number;

  readonly #cachedOpacityData: IParticleOpacityData = {
    fillOpacity: defaultOpacity,
    opacity: defaultOpacity,
    strokeOpacity: defaultOpacity,
  };

  readonly #cachedPosition = Vector3d.origin;
  readonly #cachedRotateData: IParticleRotateData = { sin: 0, cos: 0 };
  readonly #cachedTransform: IParticleTransformValues = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
  };

  readonly #container;

  /**
   * Gets the particle containing engine instance
   * @internal
   */
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  /**
   * Destroys the particle
   * @param override -
   */
  destroy(override?: boolean): void {
    if (this.unbreakable || this.destroyed) {
      return;
    }

    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;

    const container = this.#container,
      shapeDrawer = this.shape ? container.shapeDrawers.get(this.shape) : undefined;

    shapeDrawer?.particleDestroy?.(this);

    for (const plugin of container.particleDestroyedPlugins) {
      plugin.particleDestroyed?.(this, override);
    }

    for (const updater of container.particleUpdaters) {
      updater.particleDestroyed?.(this, override);
    }

    this.#container.dispatchEvent(EventType.particleDestroyed, {
      particle: this,
    });
  }

  /**
   * Draws the particle
   * @param delta -
   */
  draw(delta: IDelta): void {
    const container = this.#container,
      render = container.canvas.render;

    render.drawParticlePlugins(this, delta);
    render.drawParticle(this, delta);
  }

  /**
   * Gets the particle angle
   * @returns the angle in radiants
   */
  getAngle(): number {
    return this.rotation + (this.pathRotation ? this.velocity.angle : defaultAngle);
  }

  /**
   * Gets the particle fill color
   * @returns the fill color object
   */
  getFillColor(): IHsl | undefined {
    return this.#getRollColor(this.bubble.color ?? getHslFromAnimation(this.fillColor));
  }

  /**
   * Gets the particle mass
   * @returns the particle mass
   */
  getMass(): number {
    return this.getRadius() ** squareExp * Math.PI * half;
  }

  /**
   * Gets the particle opacity
   * @returns the opacity object
   */
  getOpacity(): IParticleOpacityData {
    const zIndexOptions = this.options.zIndex,
      zIndexFactor = zIndexFactorOffset - this.zIndexFactor,
      zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate,
      opacity = this.bubble.opacity ?? getRangeValue(this.opacity?.value ?? defaultOpacity),
      fillOpacity = this.fillOpacity ?? defaultOpacity,
      strokeOpacity = this.strokeOpacity ?? defaultOpacity;

    this.#cachedOpacityData.fillOpacity = opacity * fillOpacity * zOpacityFactor;
    this.#cachedOpacityData.opacity = opacity * zOpacityFactor;
    this.#cachedOpacityData.strokeOpacity = opacity * strokeOpacity * zOpacityFactor;

    return this.#cachedOpacityData;
  }

  /**
   * Gets the particle position
   * @returns the particle position
   */
  getPosition(): ICoordinates3d {
    this.#cachedPosition.x = this.position.x + this.offset.x;
    this.#cachedPosition.y = this.position.y + this.offset.y;
    this.#cachedPosition.z = this.position.z;

    return this.#cachedPosition;
  }

  /**
   * Gets the particle radius
   * @returns the particle radius
   */
  getRadius(): number {
    return this.bubble.radius ?? this.size.value;
  }

  /**
   * Gets the particle rotation data
   * @returns the rotate data
   */
  getRotateData(): IParticleRotateData {
    const angle = this.getAngle();

    this.#cachedRotateData.sin = Math.sin(angle);
    this.#cachedRotateData.cos = Math.cos(angle);

    return this.#cachedRotateData;
  }

  /**
   * Gets the particle stroke color
   * @returns the stroke color
   */
  getStrokeColor(): IHsl | undefined {
    return this.#getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }

  /**
   * Gets the particle transform data
   * @param externalTransform -
   * @returns get transform data
   */
  getTransformData(externalTransform: Partial<IParticleTransformValues>): IParticleTransformValues {
    const rotateData = this.getRotateData(),
      rotating = this.isRotating;

    this.#cachedTransform.a = rotateData.cos * (externalTransform.a ?? defaultTransform.a);
    this.#cachedTransform.b = rotating
      ? rotateData.sin * (externalTransform.b ?? identity)
      : (externalTransform.b ?? defaultTransform.b);
    this.#cachedTransform.c = rotating
      ? -rotateData.sin * (externalTransform.c ?? identity)
      : (externalTransform.c ?? defaultTransform.c);
    this.#cachedTransform.d = rotateData.cos * (externalTransform.d ?? defaultTransform.d);

    return this.#cachedTransform;
  }

  /**
   * Initializes the particle with the given parameters
   * @param id -
   * @param position -
   * @param overrideOptions -
   * @param group -
   */
  init(
    id: number,
    position?: ICoordinates,
    overrideOptions?: RecursivePartial<IParticlesOptions>,
    group?: string,
  ): void {
    const container = this.#container;

    this.id = id;
    this.group = group;
    this.justWarped = false;
    this.effectClose = true;
    this.shapeClose = true;
    this.pathRotation = false;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.isRotating = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {},
      maxSpeed: 0,
      moveDrift: 0,
      moveSpeed: 0,
      sizeAnimationSpeed: 0,
    };
    this.size = {
      value: 1,
      max: 1,
      min: 1,
      enable: false,
    };
    this.outType = ParticleOutType.normal;
    this.ignoresResizeRatio = true;

    const mainOptions = container.actualOptions,
      particlesOptions = loadParticlesOptions(this.#pluginManager, container, mainOptions.particles),
      reduceDuplicates = particlesOptions.reduceDuplicates,
      effectType = particlesOptions.effect.type,
      shapeType = particlesOptions.shape.type;

    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);

    const effectOptions = particlesOptions.effect,
      shapeOptions = particlesOptions.shape;

    if (overrideOptions) {
      if (overrideOptions.effect) {
        const overrideEffectType = overrideOptions.effect.type;

        if (overrideEffectType && overrideEffectType !== this.effect) {
          const effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);

          if (effect) {
            this.effect = effect;
          }
        }

        effectOptions.load(overrideOptions.effect);
      }

      if (overrideOptions.shape) {
        const overrideShapeType = overrideOptions.shape.type;

        if (overrideShapeType && overrideShapeType !== this.shape) {
          const shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);

          if (shape) {
            this.shape = shape;
          }
        }

        shapeOptions.load(overrideOptions.shape);
      }
    }

    if (this.effect === randomColorValue) {
      const availableEffects = [...this.#container.effectDrawers.keys()];

      this.effect = availableEffects[Math.floor(getRandom() * availableEffects.length)];
    }

    if (this.shape === randomColorValue) {
      const availableShapes = [...this.#container.shapeDrawers.keys()];

      this.shape = availableShapes[Math.floor(getRandom() * availableShapes.length)];
    }

    this.effectData = this.effect ? loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates) : undefined;
    this.shapeData = this.shape ? loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates) : undefined;

    particlesOptions.load(overrideOptions);

    const effectData = this.effectData,
      shapeData = this.shapeData;

    if (effectData) {
      particlesOptions.load(effectData.particles);
    }

    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }

    this.effectClose = effectData?.close ?? particlesOptions.effect.close;
    this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;

    container.retina.initParticle(this);

    for (const updater of container.particleUpdaters) {
      updater.preInit?.(this);
    }

    /* position */
    this.bubble = {
      inRange: false,
    };
    this.slow = {
      inRange: false,
      factor: 1,
    };

    this.#initPosition(position);

    /* animation - velocity for speed */
    this.initialVelocity = this.#calculateVelocity();
    this.velocity = this.initialVelocity.copy();

    // Scale z-index factor
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;

    let effectDrawer: IEffectDrawer | undefined, shapeDrawer: IShapeDrawer | undefined;

    if (this.effect) {
      effectDrawer = container.effectDrawers.get(this.effect);
    }

    if (effectDrawer?.loadEffect) {
      effectDrawer.loadEffect(this);
    }

    if (this.shape) {
      shapeDrawer = container.shapeDrawers.get(this.shape);
    }

    if (shapeDrawer?.loadShape) {
      shapeDrawer.loadShape(this);
    }

    const sideCountFunc = shapeDrawer?.getSidesCount;

    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }

    this.spawning = false;

    for (const updater of container.particleUpdaters) {
      updater.init(this);
    }

    effectDrawer?.particleInit?.(container, this);
    shapeDrawer?.particleInit?.(container, this);

    for (const plugin of container.particleCreatedPlugins) {
      plugin.particleCreated?.(this);
    }
  }

  /**
   * Checks if the particle is inside the canvas
   * @param direction - optional bounds side check
   * @returns true if the particle is still inside the canvas
   */
  isInsideCanvas(direction?: OutModeDirection): boolean {
    return this.#getInsideCanvasResult({ direction }).inside;
  }

  /**
   * Checks if the particle is inside the canvas for a specific out mode and direction
   * @param outMode - current out mode
   * @param direction - out mode direction
   * @returns true if the particle is still inside for the given strategy
   */
  isInsideCanvasForOutMode(outMode: OutMode | keyof typeof OutMode, direction?: OutModeDirection): boolean {
    return this.#getInsideCanvasResult({ direction, outMode }).inside;
  }

  /**
   * Checks if the particle is showing its back side
   * @returns true if the particle is showing its back side, false otherwise
   */
  isShowingBack(): boolean {
    if (!this.roll) {
      return false;
    }

    const angle = this.roll.angle;

    if (this.roll.horizontal && this.roll.vertical) {
      const adjustedAngle = normalizeAngle(angle, doublePI);

      return adjustedAngle >= Math.PI * half && adjustedAngle < Math.PI * triple * half;
    }

    if (this.roll.horizontal) {
      const adjustedAngle = normalizeAngle(angle + Math.PI * half, doublePI);

      return adjustedAngle >= Math.PI && adjustedAngle < Math.PI * double;
    }

    if (this.roll.vertical) {
      const adjustedAngle = normalizeAngle(angle, doublePI);

      return adjustedAngle >= Math.PI && adjustedAngle < Math.PI * double;
    }

    return false;
  }

  /**
   * Checks if the particle is visible
   * @returns true if the particle is still visible
   */
  isVisible(): boolean {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }

  /**
   * This method is used when the particle has lost a life and needs some value resets
   */
  reset(): void {
    for (const updater of this.#container.particleUpdaters) {
      updater.reset?.(this);
    }
  }

  #calcPosition(position: ICoordinates | undefined, zIndex: number): Vector3d | undefined {
    let tryCount = defaultRetryCount,
      posVec = position ? Vector3d.create(position.x, position.y, zIndex) : undefined;

    const container = this.#container,
      plugins = container.particlePositionPlugins,
      outModes = this.options.move.outModes,
      radius = this.getRadius(),
      canvasSize = container.canvas.size;

    for (;;) {
      for (const plugin of plugins) {
        const pluginPos = plugin.particlePosition?.(posVec, this);

        if (pluginPos) {
          return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
        }
      }

      const exactPosition = calcExactPositionOrRandomFromSize({
          size: canvasSize,
          position: posVec,
        }),
        pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex);

      /* check position - into the canvas */
      this.#fixHorizontal(pos, radius, outModes.left ?? outModes.default);
      this.#fixHorizontal(pos, radius, outModes.right ?? outModes.default);
      this.#fixVertical(pos, radius, outModes.top ?? outModes.default);
      this.#fixVertical(pos, radius, outModes.bottom ?? outModes.default);

      let isValidPosition = true;

      for (const plugin of container.particles.checkParticlePositionPlugins) {
        isValidPosition = plugin.checkParticlePosition?.(this, pos, tryCount) ?? true;

        if (!isValidPosition) {
          break;
        }
      }

      if (isValidPosition) {
        return pos;
      }

      tryCount += tryCountIncrement;

      posVec = undefined;
    }
  }

  #calculateVelocity(): Vector {
    const moveOptions = this.options.move,
      baseVelocity = getParticleBaseVelocity(this.direction),
      res = baseVelocity.copy();

    if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
      return res;
    }

    const rad = degToRad(getRangeValue(moveOptions.angle.value)),
      radOffset = degToRad(getRangeValue(moveOptions.angle.offset)),
      range = {
        left: radOffset - rad * half,
        right: radOffset + rad * half,
      };

    if (!moveOptions.straight) {
      res.angle += randomInRangeValue(setRangeValue(range.left, range.right));
    }

    if (moveOptions.random && typeof moveOptions.speed === "number") {
      res.length *= getRandom();
    }

    return res;
  }

  #fixHorizontal(pos: ICoordinates, radius: number, outMode: OutMode | keyof typeof OutMode): void {
    fixOutMode({
      outMode,
      checkModes: [OutMode.bounce],
      coord: pos.x,
      maxCoord: this.#container.canvas.size.width,
      setCb: (value: number) => (pos.x += value),
      radius,
    });
  }

  #fixVertical(pos: ICoordinates, radius: number, outMode: OutMode | keyof typeof OutMode): void {
    fixOutMode({
      outMode,
      checkModes: [OutMode.bounce],
      coord: pos.y,
      maxCoord: this.#container.canvas.size.height,
      setCb: (value: number) => (pos.y += value),
      radius,
    });
  }

  #getDefaultInsideCanvasResult(
    direction?: OutModeDirection,
    outMode?: OutMode | keyof typeof OutMode,
  ): IParticleCanvasBoundsResult {
    const radius = this.getRadius(),
      canvasSize = this.#container.canvas.size,
      position = this.position,
      isBounce = outMode === OutMode.bounce;

    if (direction === OutModeDirection.bottom) {
      return {
        inside: isBounce ? position.y + radius < canvasSize.height : position.y - radius < canvasSize.height,
        reason: "default",
      };
    }

    if (direction === OutModeDirection.left) {
      return {
        inside: isBounce ? position.x - radius > defaultAngle : position.x + radius > defaultAngle,
        reason: "default",
      };
    }

    if (direction === OutModeDirection.right) {
      return {
        inside: isBounce ? position.x + radius < canvasSize.width : position.x - radius < canvasSize.width,
        reason: "default",
      };
    }

    if (direction === OutModeDirection.top) {
      return {
        inside: isBounce ? position.y - radius > defaultAngle : position.y + radius > defaultAngle,
        reason: "default",
      };
    }

    return {
      inside:
        position.x >= -radius &&
        position.y >= -radius &&
        position.y <= canvasSize.height + radius &&
        position.x <= canvasSize.width + radius,
      reason: "default",
    };
  }

  #getInsideCanvasCallbackData(
    direction?: OutModeDirection,
    outMode?: OutMode | keyof typeof OutMode,
  ): IParticleCanvasBoundsData {
    return {
      canvasSize: this.#container.canvas.size,
      direction,
      outMode,
      particle: this,
      radius: this.getRadius(),
    };
  }

  #getInsideCanvasResult(data: {
    direction?: OutModeDirection;
    outMode?: OutMode | keyof typeof OutMode;
  }): IParticleCanvasBoundsResult {
    const defaultResult = this.#getDefaultInsideCanvasResult(data.direction, data.outMode),
      container = this.#container,
      shapeDrawer = this.shape ? container.shapeDrawers.get(this.shape) : undefined,
      effectDrawer = this.effect ? container.effectDrawers.get(this.effect) : undefined,
      shapeCheck = shapeDrawer?.isInsideCanvas,
      effectCheck = effectDrawer?.isInsideCanvas;

    if (!shapeCheck && !effectCheck) {
      return defaultResult;
    }

    const callbackData = this.#getInsideCanvasCallbackData(data.direction, data.outMode),
      shapeResult = shapeCheck ? this.#normalizeInsideCanvasResult(shapeCheck(callbackData), "shape") : undefined,
      effectResult = effectCheck ? this.#normalizeInsideCanvasResult(effectCheck(callbackData), "effect") : undefined;

    if (shapeResult && effectResult) {
      const margin = Math.max(shapeResult.margin ?? defaultAngle, effectResult.margin ?? defaultAngle);

      return {
        inside: shapeResult.inside && effectResult.inside,
        margin: margin > defaultAngle ? margin : undefined,
        reason: "combined",
      };
    }

    return shapeResult ?? effectResult ?? defaultResult;
  }

  #getRollColor(color?: IHsl): IHsl | undefined {
    if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
      return color;
    }

    if (!this.isShowingBack()) {
      return color;
    }

    if (this.backColor) {
      return this.backColor;
    }

    if (this.roll.alter) {
      return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
    }

    return color;
  }

  #initPosition(position?: ICoordinates): void {
    const container = this.#container,
      zIndexValue = Math.floor(getRangeValue(this.options.zIndex.value)),
      initialPosition = this.#calcPosition(position, clamp(zIndexValue, minZ, container.zLayers));

    if (!initialPosition) {
      throw new Error("a valid position cannot be found for particle");
    }

    this.position = initialPosition;
    this.initialPosition = this.position.copy();

    const canvasSize = container.canvas.size;

    this.moveCenter = {
      ...getPosition(this.options.move.center, canvasSize),
      radius: this.options.move.center.radius,
      mode: this.options.move.center.mode,
    };

    this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);

    switch (this.options.move.direction) {
      case MoveDirection.inside:
        this.outType = ParticleOutType.inside;
        break;
      case MoveDirection.outside:
        this.outType = ParticleOutType.outside;
        break;
      default:
        // no-op
        break;
    }

    /* parallax */
    this.offset = Vector.origin;
  }

  #normalizeInsideCanvasResult(
    result: boolean | IParticleCanvasBoundsResult,
    reason: Exclude<IParticleCanvasBoundsResult["reason"], "combined" | "default">,
  ): IParticleCanvasBoundsResult {
    if (typeof result === "boolean") {
      return {
        inside: result,
        reason,
      };
    }

    return {
      inside: result.inside,
      margin: result.margin,
      reason: result.reason ?? reason,
    };
  }
}

/**
 *
 * @param angle
 * @param modulus
 */
function normalizeAngle(angle: number, modulus: number): number {
  const normalized = angle % modulus;

  return normalized < defaultAngle ? normalized + modulus : normalized;
}
