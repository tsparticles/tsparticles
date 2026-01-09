import type { ICenterCoordinates, ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates.js";
import { Vector, Vector3d } from "./Utils/Vectors.js";
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
    decayOffset,
    defaultAngle,
    defaultOpacity,
    defaultRetryCount,
    defaultTransform,
    double,
    half,
    identity,
    millisecondsToSeconds,
    minZ,
    none,
    randomColorValue,
    rollFactor,
    squareExp,
    tryCountIncrement,
    zIndexFactorOffset,
} from "./Utils/Constants.js";
import {
    deepExtend,
    getPosition,
    initParticleNumericAnimationValue,
    isInArray,
    itemFromSingleOrMultiple,
} from "../Utils/Utils.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IEffect } from "../Options/Interfaces/Particles/Effect/IEffect.js";
import type { IEffectDrawer } from "./Interfaces/IEffectDrawer.js";
import type { IHsl } from "./Interfaces/Colors.js";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator.js";
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
import { Interactivity } from "../Options/Classes/Interactivity/Interactivity.js";
import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { OutMode } from "../Enums/Modes/OutMode.js";
import { ParticleOutType } from "../Enums/Types/ParticleOutType.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { alterHsl } from "../Utils/CanvasUtils.js";
import { getHslFromAnimation } from "../Utils/ColorUtils.js";
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
            fill: effectOptions.fill,
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
            fill: shapeOptions.fill,
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
     * Gets the particle color options
     */
    color?: IParticleHslAnimation;

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
     * Checks if the particle effect needs to be filled with a color
     */
    effectFill!: boolean;

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

    interactivity!: Interactivity;

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

    /**
     * Gets particle movement speed decay
     */
    moveDecay!: number;

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
     * Gets the delay for every path step
     */
    pathDelay!: number;

    /**
     * Gets the particle's path generator
     */
    pathGenerator?: IMovePathGenerator;

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
     * Checks if the particle shape needs to be filled with a color
     */
    shapeFill!: boolean;

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

    /**
     * Gets the particle containing engine instance
     * @internal
     */
    private readonly _engine;

    constructor(
        engine: Engine,
        readonly container: Container,
    ) {
        this._engine = engine;
    }

    destroy(override?: boolean): void {
        if (this.unbreakable || this.destroyed) {
            return;
        }

        this.destroyed = true;
        this.bubble.inRange = false;
        this.slow.inRange = false;

        const container = this.container,
            pathGenerator = this.pathGenerator,
            shapeDrawer = this.shape ? container.shapeDrawers.get(this.shape) : undefined;

        shapeDrawer?.particleDestroy?.(this);

        for (const plugin of container.plugins.values()) {
            plugin.particleDestroyed?.(this, override);
        }

        for (const updater of container.particles.updaters) {
            updater.particleDestroyed?.(this, override);
        }

        pathGenerator?.reset(this);

        this._engine.dispatchEvent(EventType.particleDestroyed, {
            container: this.container,
            data: {
                particle: this,
            },
        });
    }

    draw(delta: IDelta): void {
        const container = this.container,
            canvas = container.canvas;

        for (const plugin of container.plugins.values()) {
            canvas.drawParticlePlugin(plugin, this, delta);
        }

        canvas.drawParticle(this, delta);
    }

    getAngle(): number {
        return this.rotation + (this.pathRotation ? this.velocity.angle : defaultAngle);
    }

    getFillColor(): IHsl | undefined {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
    }

    getMass(): number {
        return this.getRadius() ** squareExp * Math.PI * half;
    }

    getOpacity(): IParticleOpacityData {
        const zIndexOptions = this.options.zIndex,
            zIndexFactor = zIndexFactorOffset - this.zIndexFactor,
            zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate,
            opacity = this.bubble.opacity ?? getRangeValue(this.opacity?.value ?? defaultOpacity),
            strokeOpacity = this.strokeOpacity ?? opacity;

        this._cachedOpacityData.opacity = opacity * zOpacityFactor;
        this._cachedOpacityData.strokeOpacity = strokeOpacity * zOpacityFactor;

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

    init(
        id: number,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string,
    ): void {
        const container = this.container,
            engine = this._engine;

        this.id = id;
        this.group = group;
        this.effectClose = true;
        this.effectFill = true;
        this.shapeClose = true;
        this.shapeFill = true;
        this.pathRotation = false;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.isRotating = false;
        this.rotation = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = ParticleOutType.normal;
        this.ignoresResizeRatio = true;

        const pxRatio = container.retina.pixelRatio,
            mainOptions = container.actualOptions,
            particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles),
            reduceDuplicates = particlesOptions.reduceDuplicates,
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
            const availableEffects = [...this.container.effectDrawers.keys()];

            this.effect = availableEffects[Math.floor(getRandom() * availableEffects.length)];
        }

        if (this.shape === randomColorValue) {
            const availableShapes = [...this.container.shapeDrawers.keys()];

            this.shape = availableShapes[Math.floor(getRandom() * availableShapes.length)];
        }

        this.effectData = this.effect
            ? loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates)
            : undefined;
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

        const interactivity = new Interactivity(engine, container);

        interactivity.load(container.actualOptions.interactivity);
        interactivity.load(particlesOptions.interactivity);

        this.interactivity = interactivity;

        this.effectFill = effectData?.fill ?? particlesOptions.effect.fill;
        this.effectClose = effectData?.close ?? particlesOptions.effect.close;
        this.shapeFill = shapeData?.fill ?? particlesOptions.shape.fill;
        this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
        this.options = particlesOptions;

        const pathOptions = this.options.move.path;

        this.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;

        if (pathOptions.generator) {
            this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);

            if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
                this.pathGenerator.init(container);
            }
        }

        container.retina.initParticle(this);

        /* size */
        this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);

        /* position */
        this.bubble = {
            inRange: false,
        };
        this.slow = {
            inRange: false,
            factor: 1,
        };

        this._initPosition(position);

        /* animation - velocity for speed */
        this.initialVelocity = this._calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);

        const particles = container.particles;

        particles.setLastZIndex(this.position.z);

        // Scale z-index factor
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;

        let effectDrawer: IEffectDrawer | undefined, shapeDrawer: IShapeDrawer | undefined;

        if (this.effect) {
            effectDrawer = container.effectDrawers.get(this.effect);

            if (!effectDrawer) {
                effectDrawer = this._engine.getEffectDrawer(this.effect);

                if (effectDrawer) {
                    container.effectDrawers.set(this.effect, effectDrawer);
                }
            }
        }

        if (effectDrawer?.loadEffect) {
            effectDrawer.loadEffect(this);
        }

        if (this.shape) {
            shapeDrawer = container.shapeDrawers.get(this.shape);

            if (!shapeDrawer) {
                shapeDrawer = this._engine.getShapeDrawer(this.shape);

                if (shapeDrawer) {
                    container.shapeDrawers.set(this.shape, shapeDrawer);
                }
            }
        }

        if (shapeDrawer?.loadShape) {
            shapeDrawer.loadShape(this);
        }

        const sideCountFunc = shapeDrawer?.getSidesCount;

        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }

        this.spawning = false;

        for (const updater of particles.updaters) {
            updater.init(this);
        }

        for (const mover of particles.movers) {
            mover.init(this);
        }

        effectDrawer?.particleInit?.(container, this);
        shapeDrawer?.particleInit?.(container, this);

        for (const plugin of container.plugins.values()) {
            plugin.particleCreated?.(this);
        }
    }

    isInsideCanvas(): boolean {
        const radius = this.getRadius(),
            canvasSize = this.container.canvas.size,
            position = this.position;

        return (
            position.x >= -radius &&
            position.y >= -radius &&
            position.y <= canvasSize.height + radius &&
            position.x <= canvasSize.width + radius
        );
    }

    isVisible(): boolean {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
    }

    /**
     * This method is used when the particle has lost a life and needs some value resets
     */
    reset(): void {
        for (const updater of this.container.particles.updaters) {
            updater.reset?.(this);
        }
    }

    private readonly _calcPosition: (position: ICoordinates | undefined, zIndex: number) => Vector3d | undefined = (
        position,
        zIndex,
    ) => {
        let tryCount = defaultRetryCount,
            posVec = position ? Vector3d.create(position.x, position.y, zIndex) : undefined;

        const container = this.container,
            plugins = Array.from(container.plugins.values()),
            outModes = this.options.move.outModes,
            radius = this.getRadius(),
            canvasSize = container.canvas.size,
            { signal } = container.abortController,
            maxTryCount = 3;

        while (!signal.aborted && tryCount < maxTryCount) {
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

            for (const plugin of plugins) {
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
            maxCoord: this.container.canvas.size.width,
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
            maxCoord: this.container.canvas.size.height,
            setCb: (value: number) => (pos.y += value),
            radius,
        });
    };

    private readonly _getRollColor: (color?: IHsl) => IHsl | undefined = color => {
        if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
            return color;
        }

        const backFactor = this.roll.horizontal && this.roll.vertical ? double * rollFactor : rollFactor,
            backSum = this.roll.horizontal ? Math.PI * half : none,
            rolled = Math.floor((this.roll.angle + backSum) / (Math.PI / backFactor)) % double;

        if (!rolled) {
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

    private readonly _initPosition: (position?: ICoordinates) => void = position => {
        const container = this.container,
            zIndexValue = getRangeValue(this.options.zIndex.value);

        const initialPosition = this._calcPosition(position, clamp(zIndexValue, minZ, container.zLayers));

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
        }

        /* parallax */
        this.offset = Vector.origin;
    };
}
