import type { ICenterCoordinates, ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates.js";
import type { IContainerPlugin, IDimension, IParticleTransformValues, IParticleUpdater } from "../export-types.js";
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
import {
  deepExtend,
  getPosition,
  initParticleNumericAnimationValue,
  isInArray,
  itemFromSingleOrMultiple,
} from "../Utils/Utils.js";
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
  none,
  randomColorValue,
  squareExp,
  triple,
  tryCountIncrement,
  zIndexFactorOffset,
} from "./Utils/Constants.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData.js";
import type { IEffect } from "../Options/Interfaces/Particles/Effect/IEffect.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation.js";
import type { IParticleInitData } from "./Interfaces/IParticleInitData.js";
import type { IParticleNumericValueAnimation } from "./Interfaces/IParticleValueAnimation.js";
import type { IParticleOpacityData } from "./Interfaces/IParticleOpacityData.js";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps.js";
import type { IParticleRoll } from "./Interfaces/IParticleRoll.js";
import type { IParticleRotateData } from "./Interfaces/IParticleRotateData.js";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape.js";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer.js";
import type { IShapeValues } from "./Interfaces/IShapeValues.js";
import type { ISlowParticleData } from "./Interfaces/ISlowParticleData.js";
import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { OutMode } from "../Enums/Modes/OutMode.js";
import { ParticleOutType } from "../Enums/Types/ParticleOutType.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";

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

  canvasSize!: Readonly<IDimension>;

  currentZIndex!: number;

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

  group?: string;

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

  isRotating!: boolean;

  /**
   * Last path timestamp
   */
  lastPathTime!: number;

  /**
   * Check if the particle needs a fix on the position
   */
  misplaced!: boolean;

  moveCenter!: ICenterCoordinates;

  next?: Particle;

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

  outType!: ParticleOutType;

  /**
   * Gets if the particle should rotate with path
   */
  pathRotation!: boolean;

  /**
   * Gets particle current position
   */
  position!: Vector3d;

  prev?: Particle;

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

  private readonly _cachedOpacityData: IParticleOpacityData = {
    fillOpacity: defaultOpacity,
    opacity: defaultOpacity,
    strokeOpacity: defaultOpacity,
  };

  private readonly _cachedPosition = Vector3d.origin;
  private readonly _cachedRotateData: IParticleRotateData = { sin: 0, cos: 0 };
  private readonly _cachedTransform: IParticleTransformValues = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
  };

  private _dispatchEvent!: (type: string, data: unknown) => void;

  private _effectDrawer?: IEffectDrawer;

  private _onDestroyCallback?: () => void;
  private _particleCheckPositionPlugins!: IContainerPlugin[];
  private _particleCreatedPlugins!: IContainerPlugin[];
  private _particleDestroyedPlugins!: IContainerPlugin[];
  private _particlePositionPlugins!: IContainerPlugin[];

  private _shapeDrawer?: IShapeDrawer;

  private _updaters: IParticleUpdater[] = [];

  destroy(override?: boolean): void {
    if (this.unbreakable || this.destroyed) {
      this._onDestroyCallback?.();

      return;
    }

    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;

    const shapeDrawer = this._shapeDrawer;

    shapeDrawer?.particleDestroy?.(this);

    for (const plugin of this._particleDestroyedPlugins) {
      plugin.particleDestroyed?.(this, override);
    }

    for (const updater of this._updaters) {
      updater.particleDestroyed?.(this, override);
    }

    this._updaters = [];

    this._onDestroyCallback?.();

    this._dispatchEvent(EventType.particleDestroyed, {
      particle: this,
    });
  }

  getAngle(): number {
    return this.rotation + (this.pathRotation ? this.velocity.angle : defaultAngle);
  }

  getFillColor(): IHsl | undefined {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.fillColor));
  }

  getMass(): number {
    return this.getRadius() ** squareExp * Math.PI * half;
  }

  getOpacity(): IParticleOpacityData {
    const zIndexOptions = this.options.zIndex,
      zIndexFactor = zIndexFactorOffset - this.zIndexFactor,
      zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate,
      opacity = this.bubble.opacity ?? getRangeValue(this.opacity?.value ?? defaultOpacity),
      fillOpacity = this.fillOpacity ?? defaultOpacity,
      strokeOpacity = this.strokeOpacity ?? defaultOpacity;

    this._cachedOpacityData.fillOpacity = opacity * fillOpacity * zOpacityFactor;
    this._cachedOpacityData.opacity = opacity * zOpacityFactor;
    this._cachedOpacityData.strokeOpacity = opacity * strokeOpacity * zOpacityFactor;

    return this._cachedOpacityData;
  }

  getPosition(): ICoordinates3d {
    this._cachedPosition.x = this.position.x + this.offset.x;
    this._cachedPosition.y = this.position.y + this.offset.y;
    this._cachedPosition.z = this.position.z;

    return this._cachedPosition;
  }

  getRadius(): number {
    return this.bubble.radius ?? this.size.value;
  }

  getRotateData(): IParticleRotateData {
    const angle = this.getAngle();

    this._cachedRotateData.sin = Math.sin(angle);
    this._cachedRotateData.cos = Math.cos(angle);

    return this._cachedRotateData;
  }

  getStrokeColor(): IHsl | undefined {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }

  getTransformData(externalTransform: Partial<IParticleTransformValues>): IParticleTransformValues {
    const rotateData = this.getRotateData(),
      rotating = this.isRotating;

    this._cachedTransform.a = rotateData.cos * (externalTransform.a ?? defaultTransform.a);
    this._cachedTransform.b = rotating
      ? rotateData.sin * (externalTransform.b ?? identity)
      : (externalTransform.b ?? defaultTransform.b);
    this._cachedTransform.c = rotating
      ? -rotateData.sin * (externalTransform.c ?? identity)
      : (externalTransform.c ?? defaultTransform.c);
    this._cachedTransform.d = rotateData.cos * (externalTransform.d ?? defaultTransform.d);

    return this._cachedTransform;
  }

  init(data: IParticleInitData): void {
    const {
      canvasSize,
      dispatchEvent,
      effectDrawers,
      group,
      id,
      initRetina,
      onDestroyCallback,
      overrideOptions,
      position,
      particleCheckPositionPlugins,
      particleCreatedPlugins,
      particleDestroyedPlugins,
      particlePositionPlugins,
      particlesOptions,
      pixelRatio,
      shapeDrawers,
      updaters,
      zLayers,
    } = data;

    this._dispatchEvent = dispatchEvent;
    this._onDestroyCallback = onDestroyCallback;
    this._particleCheckPositionPlugins = particleCheckPositionPlugins;
    this._particleCreatedPlugins = particleCreatedPlugins;
    this._particleDestroyedPlugins = particleDestroyedPlugins;
    this._particlePositionPlugins = particlePositionPlugins;
    this.canvasSize = canvasSize;
    this.id = id;
    this.group = group;
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
      maxSpeed: none,
      moveSpeed: none,
      moveDrift: none,
      sizeAnimationSpeed: none,
    };
    this.outType = ParticleOutType.normal;
    this.ignoresResizeRatio = true;

    const reduceDuplicates = particlesOptions.reduceDuplicates,
      effectType = particlesOptions.effect.type,
      shapeType = particlesOptions.shape.type;

    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);

    const effectOptions = particlesOptions.effect,
      shapeOptions = particlesOptions.shape;

    if (overrideOptions) {
      if (overrideOptions.effect?.type) {
        const overrideEffectType = overrideOptions.effect.type,
          effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);

        if (effect) {
          this.effect = effect;

          effectOptions.load(overrideOptions.effect);
        }
      }

      if (overrideOptions.shape?.type) {
        const overrideShapeType = overrideOptions.shape.type,
          shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);

        if (shape) {
          this.shape = shape;

          shapeOptions.load(overrideOptions.shape);
        }
      }
    }

    if (this.effect === randomColorValue) {
      const availableEffects = [...effectDrawers.keys()];

      this.effect = availableEffects[Math.floor(getRandom() * availableEffects.length)];
    }

    if (this.shape === randomColorValue) {
      const availableShapes = [...shapeDrawers.keys()];

      this.shape = availableShapes[Math.floor(getRandom() * availableShapes.length)];
    }

    this.effectData = this.effect ? loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates) : undefined;
    this.shapeData = this.shape ? loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates) : undefined;

    particlesOptions.load(overrideOptions);

    const effectData = this.effectData;

    if (effectData) {
      particlesOptions.load(effectData.particles);
    }

    const shapeData = this.shapeData;

    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }

    this.effectClose = effectData?.close ?? particlesOptions.effect.close;
    this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;

    initRetina();

    /* size */
    this.size = initParticleNumericAnimationValue(this.options.size, pixelRatio);

    /* position */
    this.bubble = {
      inRange: false,
    };
    this.slow = {
      inRange: false,
      factor: 1,
    };

    this._initPosition(position, zLayers);

    /* animation - velocity for speed */
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.currentZIndex = Math.floor(this.position.z);

    // Scale z-index factor
    this.zIndexFactor = this.position.z / zLayers;
    this.sides = 24;

    this._effectDrawer = this.effect ? effectDrawers.get(this.effect) : undefined;

    const effectDrawer = this._effectDrawer;

    if (effectDrawer?.loadEffect) {
      effectDrawer.loadEffect(this);
    }

    this._shapeDrawer = this.shape ? shapeDrawers.get(this.shape) : undefined;

    const shapeDrawer = this._shapeDrawer;

    if (shapeDrawer?.loadShape) {
      shapeDrawer.loadShape(this);
    }

    const sideCountFunc = shapeDrawer?.getSidesCount;

    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }

    this.spawning = false;
    this._updaters = updaters;

    for (const updater of this._updaters) {
      updater.init(this);
    }

    effectDrawer?.particleInit?.(this);
    shapeDrawer?.particleInit?.(this);

    for (const plugin of this._particleCreatedPlugins) {
      plugin.particleCreated?.(this);
    }
  }

  isInsideCanvas(): boolean {
    const radius = this.getRadius(),
      canvasSize = this.canvasSize,
      position = this.position;

    return (
      position.x >= -radius &&
      position.y >= -radius &&
      position.y <= canvasSize.height + radius &&
      position.x <= canvasSize.width + radius
    );
  }

  isShowingBack(): boolean {
    if (!this.roll) {
      return false;
    }

    const angle = this.roll.angle;

    if (this.roll.horizontal && this.roll.vertical) {
      const normalizedAngle = angle % doublePI,
        adjustedAngle = normalizedAngle < defaultAngle ? normalizedAngle + doublePI : normalizedAngle;

      return adjustedAngle >= Math.PI * half && adjustedAngle < Math.PI * triple * half;
    }

    if (this.roll.horizontal) {
      const normalizedAngle = (angle + Math.PI * half) % (Math.PI * double),
        adjustedAngle = normalizedAngle < defaultAngle ? normalizedAngle + Math.PI * double : normalizedAngle;

      return adjustedAngle >= Math.PI && adjustedAngle < Math.PI * double;
    }

    if (this.roll.vertical) {
      const normalizedAngle = angle % (Math.PI * double),
        adjustedAngle = normalizedAngle < defaultAngle ? normalizedAngle + Math.PI * double : normalizedAngle;

      return adjustedAngle >= Math.PI && adjustedAngle < Math.PI * double;
    }

    return false;
  }

  isVisible(): boolean {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }

  /**
   * This method is used when the particle has lost a life and needs some value resets
   */
  reset(): void {
    for (const updater of this._updaters) {
      updater.reset?.(this);
    }
  }

  private readonly _calcPosition: (position: ICoordinates | undefined, zIndex: number) => Vector3d | undefined = (
    position,
    zIndex,
  ) => {
    let tryCount = defaultRetryCount,
      posVec = position ? Vector3d.create(position.x, position.y, zIndex) : undefined;

    const plugins = this._particlePositionPlugins,
      outModes = this.options.move.outModes,
      radius = this.getRadius(),
      canvasSize = this.canvasSize,
      abortController = new AbortController(),
      { signal } = abortController;

    while (!signal.aborted) {
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
      this._fixHorizontal(pos, radius, outModes.left ?? outModes.default);
      this._fixHorizontal(pos, radius, outModes.right ?? outModes.default);
      this._fixVertical(pos, radius, outModes.top ?? outModes.default);
      this._fixVertical(pos, radius, outModes.bottom ?? outModes.default);

      let isValidPosition = true;

      for (const plugin of this._particleCheckPositionPlugins) {
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

    return posVec;
  };

  private readonly _calculateVelocity: () => Vector = () => {
    const baseVelocity = getParticleBaseVelocity(this.direction),
      res = baseVelocity.copy(),
      moveOptions = this.options.move;

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
  };

  private readonly _fixHorizontal = (
    pos: ICoordinates,
    radius: number,
    outMode: OutMode | keyof typeof OutMode,
  ): void => {
    fixOutMode({
      outMode,
      checkModes: [OutMode.bounce],
      coord: pos.x,
      maxCoord: this.canvasSize.width,
      setCb: (value: number) => (pos.x += value),
      radius,
    });
  };

  private readonly _fixVertical = (
    pos: ICoordinates,
    radius: number,
    outMode: OutMode | keyof typeof OutMode,
  ): void => {
    fixOutMode({
      outMode,
      checkModes: [OutMode.bounce],
      coord: pos.y,
      maxCoord: this.canvasSize.height,
      setCb: (value: number) => (pos.y += value),
      radius,
    });
  };

  private readonly _getRollColor: (color?: IHsl) => IHsl | undefined = color => {
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
  };

  private readonly _initPosition: (position: ICoordinates | undefined, zLayers: number) => void = (
    position,
    zLayers,
  ) => {
    const zIndexValue = Math.floor(getRangeValue(this.options.zIndex.value)),
      initialPosition = this._calcPosition(position, clamp(zIndexValue, minZ, zLayers));

    if (!initialPosition) {
      throw new Error("a valid position cannot be found for particle");
    }

    this.position = initialPosition;
    this.initialPosition = this.position.copy();

    const canvasSize = this.canvasSize;

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
  };
}
