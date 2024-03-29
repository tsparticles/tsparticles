import type { ICenterCoordinates, ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates.js";
import type { IHsl, IRgb } from "./Interfaces/Colors.js";
import { Vector, Vector3d } from "./Utils/Vectors.js";
import {
    calcExactPositionOrRandomFromSize,
    clamp,
    degToRad,
    getDistance,
    getParticleBaseVelocity,
    getParticleDirectionAngle,
    getRandom,
    getRangeValue,
    randomInRange,
    setRangeValue,
} from "../Utils/NumberUtils.js";
import {
    deepExtend,
    getPosition,
    initParticleNumericAnimationValue,
    isInArray,
    itemFromSingleOrMultiple,
} from "../Utils/Utils.js";
import { errorPrefix, millisecondsToSeconds } from "./Utils/Constants.js";
import { getHslFromAnimation, rangeColorToRgb } from "../Utils/ColorUtils.js";
import type { Container } from "./Container.js";
import type { Engine } from "./Engine.js";
import { EventType } from "../Enums/Types/EventType.js";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData.js";
import type { IDelta } from "./Interfaces/IDelta.js";
import type { IEffect } from "../Options/Interfaces/Particles/Effect/IEffect.js";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator.js";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation.js";
import type { IParticleNumericValueAnimation } from "./Interfaces/IParticleValueAnimation.js";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps.js";
import type { IParticleRoll } from "./Interfaces/IParticleRoll.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape.js";
import type { IShapeValues } from "./Interfaces/IShapeValues.js";
import type { ISlowParticleData } from "./Interfaces/ISlowParticleData.js";
import { Interactivity } from "../Options/Classes/Interactivity/Interactivity.js";
import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { OutMode } from "../Enums/Modes/OutMode.js";
import { ParticleOutType } from "../Enums/Types/ParticleOutType.js";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import { PixelMode } from "../Enums/Modes/PixelMode.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { alterHsl } from "../Utils/CanvasUtils.js";
import { loadParticlesOptions } from "../Utils/OptionsUtils.js";

const defaultRetryCount = 0,
    double = 2,
    half = 0.5,
    squareExp = 2,
    randomString = "random";

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

    if (!effectData) {
        return;
    }

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

    if (!shapeData) {
        return;
    }

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
    effect!: string;

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
     * Gets particle shadow color
     */
    shadowColor?: IRgb;

    /**
     * Gets particle shape type
     */
    shape!: string;

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
            shapeDrawer = container.shapeDrawers.get(this.shape);

        shapeDrawer?.particleDestroy?.(this);

        for (const [, plugin] of container.plugins) {
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

        for (const [, plugin] of container.plugins) {
            canvas.drawParticlePlugin(plugin, this, delta);
        }

        canvas.drawParticle(this, delta);
    }

    getFillColor(): IHsl | undefined {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
    }

    getMass(): number {
        return this.getRadius() ** squareExp * Math.PI * half;
    }

    getPosition(): ICoordinates3d {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }

    getRadius(): number {
        return this.bubble.radius ?? this.size.value;
    }

    getStrokeColor(): IHsl | undefined {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
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
            { reduceDuplicates } = particlesOptions,
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

        if (this.effect === randomString) {
            const availableEffects = [...this.container.effectDrawers.keys()];

            this.effect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
        }

        if (this.shape === randomString) {
            const availableShapes = [...this.container.shapeDrawers.keys()];

            this.shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
        }

        this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
        this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);

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

        const decayOffset = 1;

        this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);

        const particles = container.particles;

        particles.setLastZIndex(this.position.z);

        // Scale z-index factor
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;

        let effectDrawer = container.effectDrawers.get(this.effect);

        if (!effectDrawer) {
            effectDrawer = this._engine.getEffectDrawer(this.effect);

            if (effectDrawer) {
                container.effectDrawers.set(this.effect, effectDrawer);
            }
        }

        if (effectDrawer?.loadEffect) {
            effectDrawer.loadEffect(this);
        }

        let shapeDrawer = container.shapeDrawers.get(this.shape);

        if (!shapeDrawer) {
            shapeDrawer = this._engine.getShapeDrawer(this.shape);

            if (shapeDrawer) {
                container.shapeDrawers.set(this.shape, shapeDrawer);
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
        this.shadowColor = rangeColorToRgb(this.options.shadow.color);

        for (const updater of particles.updaters) {
            updater.init(this);
        }

        for (const mover of particles.movers) {
            mover.init?.(this);
        }

        effectDrawer?.particleInit?.(container, this);
        shapeDrawer?.particleInit?.(container, this);

        for (const [, plugin] of container.plugins) {
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

    private readonly _calcPosition: (
        container: Container,
        position: ICoordinates | undefined,
        zIndex: number,
        tryCount?: number,
    ) => Vector3d = (container, position, zIndex, tryCount = defaultRetryCount) => {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos) {
                return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
            }
        }

        const canvasSize = container.canvas.size,
            exactPosition = calcExactPositionOrRandomFromSize({
                size: canvasSize,
                position: position,
            }),
            pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex),
            radius = this.getRadius(),
            /* check position - into the canvas */
            outModes = this.options.move.outModes,
            fixHorizontal = (outMode: OutMode | keyof typeof OutMode): void => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce],
                    coord: pos.x,
                    maxCoord: container.canvas.size.width,
                    setCb: (value: number) => (pos.x += value),
                    radius,
                });
            },
            fixVertical = (outMode: OutMode | keyof typeof OutMode): void => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce],
                    coord: pos.y,
                    maxCoord: container.canvas.size.height,
                    setCb: (value: number) => (pos.y += value),
                    radius,
                });
            };

        fixHorizontal(outModes.left ?? outModes.default);
        fixHorizontal(outModes.right ?? outModes.default);
        fixVertical(outModes.top ?? outModes.default);
        fixVertical(outModes.bottom ?? outModes.default);

        if (this._checkOverlap(pos, tryCount)) {
            const increment = 1;

            return this._calcPosition(container, undefined, zIndex, tryCount + increment);
        }

        return pos;
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
            res.angle += randomInRange(setRangeValue(range.left, range.right));
        }

        if (moveOptions.random && typeof moveOptions.speed === "number") {
            res.length *= getRandom();
        }

        return res;
    };

    private readonly _checkOverlap: (pos: ICoordinates, tryCount?: number) => boolean = (
        pos,
        tryCount = defaultRetryCount,
    ) => {
        const collisionsOptions = this.options.collisions,
            radius = this.getRadius();

        if (!collisionsOptions.enable) {
            return false;
        }

        const overlapOptions = collisionsOptions.overlap;

        if (overlapOptions.enable) {
            return false;
        }

        const retries = overlapOptions.retries,
            minRetries = 0;

        if (retries >= minRetries && tryCount > retries) {
            throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
        }

        return !!this.container.particles.find(
            particle => getDistance(pos, particle.position) < radius + particle.getRadius(),
        );
    };

    private readonly _getRollColor: (color?: IHsl) => IHsl | undefined = color => {
        if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
            return color;
        }

        const rollFactor = 1,
            none = 0,
            backFactor = this.roll.horizontal && this.roll.vertical ? double * rollFactor : rollFactor,
            backSum = this.roll.horizontal ? Math.PI * half : none,
            rolled = Math.floor(((this.roll.angle ?? none) + backSum) / (Math.PI / backFactor)) % double;

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
            zIndexValue = getRangeValue(this.options.zIndex.value),
            minZ = 0;

        this.position = this._calcPosition(container, position, clamp(zIndexValue, minZ, container.zLayers));
        this.initialPosition = this.position.copy();

        const canvasSize = container.canvas.size,
            defaultRadius = 0;

        this.moveCenter = {
            ...getPosition(this.options.move.center, canvasSize),
            radius: this.options.move.center.radius ?? defaultRadius,
            mode: this.options.move.center.mode ?? PixelMode.percent,
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
