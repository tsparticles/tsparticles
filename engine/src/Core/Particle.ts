import type { ICenterCoordinates, ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import {
    calcExactPositionOrRandomFromSize,
    clamp,
    getDistance,
    getParticleBaseVelocity,
    getParticleDirectionAngle,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getValue,
    randomInRange,
    setRangeValue,
} from "../Utils/NumberUtils";
import { deepExtend, isInArray, itemFromSingleOrMultiple } from "../Utils/Utils";
import { getHslFromAnimation, rangeColorToRgb } from "../Utils/ColorUtils";
import { AnimationStatus } from "../Enums/AnimationStatus";
import type { Container } from "./Container";
import type { Engine } from "../engine";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IDelta } from "./Interfaces/IDelta";
import type { IMovePathGenerator } from "./Interfaces/IMovePathGenerator";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation";
import type { IParticleNumericValueAnimation } from "./Interfaces/IParticleValueAnimation";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps";
import type { IParticleRoll } from "./Interfaces/IParticleRoll";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape";
import type { IShapeValues } from "./Interfaces/IShapeValues";
import type { ISlowParticleData } from "./Interfaces/ISlowParticleData";
import { Interactivity } from "../Options/Classes/Interactivity/Interactivity";
import { MoveDirection } from "../Enums/Directions/MoveDirection";
import { OutMode } from "../Enums/Modes/OutMode";
import type { OutModeAlt } from "../Enums/Modes/OutMode";
import { ParticleOutType } from "../Enums/Types/ParticleOutType";
import type { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { SizeMode } from "../Enums/Modes/SizeMode";
import { StartValueType } from "../Enums/Types/StartValueType";
import { Vector } from "./Utils/Vector";
import { Vector3d } from "./Utils/Vector3d";
import { alterHsl } from "../Utils/CanvasUtils";
import { loadParticlesOptions } from "../Utils/OptionsUtils";

/**
 * fixes out mode, calling the given callback if needed
 * @param data
 */
const fixOutMode = (data: {
    checkModes: (OutMode | keyof typeof OutMode | OutModeAlt)[];
    coord: number;
    maxCoord: number;
    outMode: OutMode | keyof typeof OutMode | OutModeAlt;
    radius: number;
    setCb: (value: number) => void;
}): void => {
    if (!isInArray(data.outMode, data.checkModes)) {
        return;
    }

    if (data.coord > data.maxCoord - data.radius * 2) {
        data.setCb(-data.radius);
    } else if (data.coord < data.radius * 2) {
        data.setCb(data.radius);
    }
};

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    /**
     * Particles back color
     */
    backColor?: IHsl;

    /**
     * Gets particles bubble data
     */
    bubble!: IBubbleParticleData;

    /**
     * Checks if the particle shape needs a closed path
     */
    close!: boolean;

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
     * Checks if the particle shape needs to be filled with a color
     */
    fill!: boolean;

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
     * @private
     */
    private readonly _engine;

    constructor(
        engine: Engine,
        id: number,
        readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        group?: string
    ) {
        this._engine = engine;

        this.init(id, position, overrideOptions, group);
    }

    destroy(override?: boolean): void {
        if (this.unbreakable || this.destroyed) {
            return;
        }

        this.destroyed = true;
        this.bubble.inRange = false;
        this.slow.inRange = false;

        for (const [, plugin] of this.container.plugins) {
            if (plugin.particleDestroyed) {
                plugin.particleDestroyed(this, override);
            }
        }

        for (const updater of this.container.particles.updaters) {
            if (updater.particleDestroyed) {
                updater.particleDestroyed(this, override);
            }
        }

        this.pathGenerator?.reset(this);
    }

    draw(delta: IDelta): void {
        const container = this.container;

        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }

        container.canvas.drawParticle(this, delta);
    }

    getFillColor(): IHsl | undefined {
        return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
    }

    getMass(): number {
        return (this.getRadius() ** 2 * Math.PI) / 2;
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
        group?: string
    ): void {
        const container = this.container,
            engine = this._engine;

        this.id = id;
        this.group = group;
        this.fill = true;
        this.pathRotation = false;
        this.close = true;
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
            shapeType = particlesOptions.shape.type,
            { reduceDuplicates } = particlesOptions;

        this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);

        const shapeOptions = particlesOptions.shape;

        if (overrideOptions && overrideOptions.shape && overrideOptions.shape.type) {
            const overrideShapeType = overrideOptions.shape.type,
                shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);

            if (shape) {
                this.shape = shape;

                shapeOptions.load(overrideOptions.shape);
            }
        }

        this.shapeData = this._loadShapeData(shapeOptions, reduceDuplicates);

        particlesOptions.load(overrideOptions);
        particlesOptions.load(this.shapeData?.particles);

        this.interactivity = new Interactivity(engine, container);

        this.interactivity.load(container.actualOptions.interactivity);
        this.interactivity.load(particlesOptions.interactivity);

        this.fill = this.shapeData?.fill ?? this.fill;
        this.close = this.shapeData?.close ?? this.close;
        this.options = particlesOptions;

        const pathOptions = this.options.move.path;

        this.pathDelay = getValue(pathOptions.delay) * 1000;

        if (pathOptions.generator) {
            this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);

            if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
                this.pathGenerator.init(container);
            }
        }

        const zIndexValue = getRangeValue(this.options.zIndex.value);

        container.retina.initParticle(this);

        /* size */
        const sizeOptions = this.options.size,
            sizeRange = sizeOptions.value,
            sizeAnimation = sizeOptions.animation;

        this.size = {
            enable: sizeOptions.animation.enable,
            value: getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
            max: getRangeMax(sizeRange) * pxRatio,
            min: getRangeMin(sizeRange) * pxRatio,
            loops: 0,
            maxLoops: getRangeValue(sizeOptions.animation.count),
        };

        if (sizeAnimation.enable) {
            this.size.status = AnimationStatus.increasing;
            this.size.decay = 1 - getRangeValue(sizeAnimation.decay);

            switch (sizeAnimation.startValue) {
                case StartValueType.min:
                    this.size.value = this.size.min;
                    this.size.status = AnimationStatus.increasing;

                    break;

                case StartValueType.random:
                    this.size.value = randomInRange(this.size);
                    this.size.status = getRandom() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    this.size.value = this.size.max;
                    this.size.status = AnimationStatus.decreasing;

                    break;
            }
        }

        this.size.initialValue = this.size.value;

        /* position */
        this.bubble = {
            inRange: false,
        };
        this.slow = {
            inRange: false,
            factor: 1,
        };

        this.position = this._calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();

        const canvasSize = container.canvas.size,
            moveCenter = { ...this.options.move.center },
            isCenterPercent = moveCenter.mode === SizeMode.percent;

        this.moveCenter = {
            x: moveCenter.x * (isCenterPercent ? canvasSize.width / 100 : 1),
            y: moveCenter.y * (isCenterPercent ? canvasSize.height / 100 : 1),
            radius: this.options.move.center.radius ?? 0,
            mode: this.options.move.center.mode ?? SizeMode.percent,
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

        /* animation - velocity for speed */
        this.initialVelocity = this._calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);

        /* parallax */
        this.offset = Vector.origin;

        const particles = container.particles;

        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;

        // Scale z-index factor
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;

        let drawer = container.drawers.get(this.shape);

        if (!drawer) {
            drawer = this._engine.plugins.getShapeDrawer(this.shape);

            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }

        if (drawer?.loadShape) {
            drawer?.loadShape(this);
        }

        const sideCountFunc = drawer?.getSidesCount;

        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }

        this.spawning = false;
        this.shadowColor = rangeColorToRgb(this.options.shadow.color);

        for (const updater of container.particles.updaters) {
            updater.init(this);
        }

        for (const mover of container.particles.movers) {
            mover.init?.(this);
        }

        if (drawer?.particleInit) {
            drawer.particleInit(container, this);
        }

        for (const [, plugin] of container.plugins) {
            plugin.particleCreated?.(this);
        }
    }

    isInsideCanvas(): boolean {
        const radius = this.getRadius(),
            canvasSize = this.container.canvas.size;

        return (
            this.position.x >= -radius &&
            this.position.y >= -radius &&
            this.position.y <= canvasSize.height + radius &&
            this.position.x <= canvasSize.width + radius
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

    private _calcPosition(
        container: Container,
        position: ICoordinates | undefined,
        zIndex: number,
        tryCount = 0
    ): Vector3d {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
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
            fixHorizontal = (outMode: OutMode | keyof typeof OutMode | OutModeAlt): void => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce, OutMode.bounceHorizontal],
                    coord: pos.x,
                    maxCoord: container.canvas.size.width,
                    setCb: (value: number) => (pos.x += value),
                    radius,
                });
            },
            fixVertical = (outMode: OutMode | keyof typeof OutMode | OutModeAlt): void => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce, OutMode.bounceVertical],
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
            return this._calcPosition(container, undefined, zIndex, tryCount + 1);
        }

        return pos;
    }

    private _calculateVelocity(): Vector {
        const baseVelocity = getParticleBaseVelocity(this.direction),
            res = baseVelocity.copy(),
            moveOptions = this.options.move;

        if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
            return res;
        }

        const rad = (Math.PI / 180) * getRangeValue(moveOptions.angle.value),
            radOffset = (Math.PI / 180) * getRangeValue(moveOptions.angle.offset),
            range = {
                left: radOffset - rad / 2,
                right: radOffset + rad / 2,
            };

        if (!moveOptions.straight) {
            res.angle += randomInRange(setRangeValue(range.left, range.right));
        }

        if (moveOptions.random && typeof moveOptions.speed === "number") {
            res.length *= getRandom();
        }

        return res;
    }

    private _checkOverlap(pos: ICoordinates, tryCount = 0): boolean {
        const collisionsOptions = this.options.collisions,
            radius = this.getRadius();

        if (!collisionsOptions.enable) {
            return false;
        }

        const overlapOptions = collisionsOptions.overlap;

        if (overlapOptions.enable) {
            return false;
        }

        const retries = overlapOptions.retries;

        if (retries >= 0 && tryCount > retries) {
            throw new Error("Particle is overlapping and can't be placed");
        }

        let overlaps = false;

        for (const particle of this.container.particles.array) {
            if (getDistance(pos, particle.position) < radius + particle.getRadius()) {
                overlaps = true;
                break;
            }
        }

        return overlaps;
    }

    private _getRollColor(color?: IHsl): IHsl | undefined {
        if (!color || !this.roll || (!this.backColor && !this.roll.alter)) {
            return color;
        }

        const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1,
            backSum = this.roll.horizontal ? Math.PI / 2 : 0,
            rolled = Math.floor(((this.roll.angle ?? 0) + backSum) / (Math.PI / backFactor)) % 2;

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
    }

    private _loadShapeData(shapeOptions: IShape, reduceDuplicates: boolean): IShapeValues | undefined {
        const shapeData = shapeOptions.options[this.shape];

        if (shapeData) {
            return deepExtend({}, itemFromSingleOrMultiple(shapeData, this.id, reduceDuplicates)) as IShapeValues;
        }
    }
}
