import { ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import {
    IParticleNumericValueAnimation,
    IParticleTiltValueAnimation,
    IParticleValueAnimation,
} from "./Interfaces/IParticleValueAnimation";
import { OutMode, OutModeAlt } from "../Enums/Modes/OutMode";
import {
    calcExactPositionOrRandomFromSize,
    clamp,
    getDistance,
    getParticleBaseVelocity,
    getParticleDirectionAngle,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getValue,
    randomInRange,
    setRangeValue,
} from "../Utils/NumberUtils";
import { colorToRgb, getHslFromAnimation } from "../Utils/ColorUtils";
import { deepExtend, isInArray, itemFromArray, loadParticlesOptions } from "../Utils/Utils";
import { AnimationStatus } from "../Enums/AnimationStatus";
import type { Container } from "./Container";
import { DestroyMode } from "../Enums/Modes/DestroyMode";
import type { Engine } from "../engine";
import { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IDelta } from "./Interfaces/IDelta";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticleGravity } from "./Interfaces/IParticleGravity";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation";
import type { IParticleLife } from "./Interfaces/IParticleLife";
import type { IParticleRetinaProps } from "./Interfaces/IParticleRetinaProps";
import type { IParticleRoll } from "./Interfaces/IParticleRoll";
import type { IParticleWobble } from "./Interfaces/IParticleWobble";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape";
import type { IShapeValues } from "./Interfaces/IShapeValues";
import { MoveDirection } from "../Enums/Directions/MoveDirection";
import { ParticleOutType } from "../Enums/Types/ParticleOutType";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { RollMode } from "../Enums/Modes/RollMode";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import { StartValueType } from "../Enums/Types/StartValueType";
import { Stroke } from "../Options/Classes/Particles/Stroke";
import { Vector } from "./Utils/Vector";
import { Vector3d } from "./Utils/Vector3d";
import { alterHsl } from "../Utils/CanvasUtils";

/**
 * fixes out mode, calling the given callback if needed
 * @param data
 */
const fixOutMode = (data: {
    outMode: OutMode | keyof typeof OutMode | OutModeAlt;
    checkModes: (OutMode | keyof typeof OutMode | OutModeAlt)[];
    coord: number;
    maxCoord: number;
    setCb: (value: number) => void;
    radius: number;
}): void => {
    if (!(isInArray(data.outMode, data.checkModes) || isInArray(data.outMode, data.checkModes))) {
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
     * Checks if the particle is destroyed
     */
    destroyed;

    /**
     * When this is enabled, the particle won't resize when the canvas resize event is fired
     */
    ignoresResizeRatio;

    /**
     * Last path timestamp
     */
    lastPathTime;

    /**
     * Check if the particle needs a fix on the position
     */
    misplaced;

    /**
     * Check if the particle is spawning, and can't be touched
     */
    spawning;

    /**
     * Sets the count of particles created when destroyed with split mode
     */
    splitCount;

    /**
     * Checks if the particle is unbreakable, if true the particle won't destroy on collisions
     */
    unbreakable;

    /**
     * Gets the delay for every path step
     */
    readonly pathDelay;

    /**
     * Gets the particle side count
     */
    readonly sides;

    /**
     * Gets the particle options
     */
    readonly options;

    /**
     * Gets the particle life values
     */
    readonly life: IParticleLife;

    /**
     * Gets the particle roll options
     */
    roll?: IParticleRoll;

    /**
     * Gets the particle wobble options
     */
    wobble?: IParticleWobble;

    /**
     * Particles back color
     */
    backColor?: IHsl;

    /**
     * Checks if the particle shape needs a closed path
     */
    close: boolean;

    /**
     * Checks if the particle shape needs to be filled with a color
     */
    fill: boolean;

    /**
     * The random index used by the particle
     */
    randomIndexData?: number;

    /**
     * Gets the particle rotate options
     */
    rotate?: IParticleValueAnimation<number>;

    /**
     * Gets the particle tilt options
     */
    tilt?: IParticleTiltValueAnimation;

    /**
     * Gets the particle color options
     */
    color?: IParticleHslAnimation;

    /**
     * Gets the particle opacity options
     */
    opacity?: IParticleNumericValueAnimation;

    /**
     * Sets the particle stroke width
     */
    strokeWidth?: number;

    /**
     * Gets the particle stroke options
     */
    stroke?: Stroke;

    /**
     * Sets the particle stroke color
     */
    strokeColor?: IParticleHslAnimation;

    readonly moveCenter: ICoordinates & { radius: number };

    /**
     * Gets particle gravity options
     */
    readonly gravity: IParticleGravity;

    /**
     * Gets particle movement speed decay
     */
    readonly moveDecay: number;

    readonly outType: ParticleOutType;

    /**
     * Gets particle direction, the value is an angle in rad
     */
    direction: number;

    /**
     * Gets particle current position
     */
    readonly position: Vector3d;

    /**
     * Gets particle offset position, used for parallax interaction
     */
    readonly offset: Vector;

    /**
     * Gets particle shadow color
     */
    readonly shadowColor: IRgb | undefined;

    /**
     * Gets particle size options
     */
    readonly size: IParticleNumericValueAnimation;

    /**
     * Gets particle current velocity
     */
    readonly velocity: Vector;

    /**
     * Gets particle shape type
     */
    readonly shape: string;

    /**
     * Gets particle initial position
     */
    readonly initialPosition: Vector;

    /**
     * Gets particle initial velocity
     */
    readonly initialVelocity: Vector;

    /**
     * Gets particle shape options
     */
    readonly shapeData?: IShapeValues;

    /**
     * Gets particles bubble data
     */
    readonly bubble: IBubbleParticleData;

    /**
     * Gets the particle Z-Index factor
     */
    readonly zIndexFactor: number;

    /**
     * Gets the particle retina values
     */
    readonly retina: IParticleRetinaProps;

    /**
     * Gets the particle containing engine instance
     * @private
     */
    readonly #engine;

    constructor(
        engine: Engine,
        readonly id: number,
        readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticlesOptions>,
        readonly group?: string
    ) {
        this.#engine = engine;
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.splitCount = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = ParticleOutType.normal;
        this.ignoresResizeRatio = true;

        const pxRatio = container.retina.pixelRatio,
            mainOptions = container.actualOptions,
            particlesOptions = loadParticlesOptions(mainOptions.particles);

        const shapeType = particlesOptions.shape.type,
            reduceDuplicates = particlesOptions.reduceDuplicates;

        this.shape = shapeType instanceof Array ? itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;

        if (overrideOptions?.shape) {
            if (overrideOptions.shape.type) {
                const overrideShapeType = overrideOptions.shape.type;

                this.shape =
                    overrideShapeType instanceof Array
                        ? itemFromArray(overrideShapeType, this.id, reduceDuplicates)
                        : overrideShapeType;
            }

            const shapeOptions = new Shape();

            shapeOptions.load(overrideOptions.shape);

            if (this.shape) {
                this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
            }
        } else {
            this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
        }

        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }

        if (this.shapeData?.particles !== undefined) {
            particlesOptions.load(this.shapeData?.particles);
        }

        this.fill = this.shapeData?.fill ?? this.fill;
        this.close = this.shapeData?.close ?? this.close;
        this.options = particlesOptions;
        this.pathDelay = getValue(this.options.move.path.delay) * 1000;

        const zIndexValue = getRangeValue(this.options.zIndex.value);

        container.retina.initParticle(this);

        /* size */
        const sizeOptions = this.options.size,
            sizeRange = sizeOptions.value;

        this.size = {
            enable: sizeOptions.animation.enable,
            value: getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
            max: getRangeMax(sizeRange) * pxRatio,
            min: getRangeMin(sizeRange) * pxRatio,
            loops: 0,
            maxLoops: getRangeValue(sizeOptions.animation.count),
        };

        const sizeAnimation = sizeOptions.animation;

        if (sizeAnimation.enable) {
            this.size.status = AnimationStatus.increasing;

            switch (sizeAnimation.startValue) {
                case StartValueType.min:
                    this.size.value = this.size.min;
                    this.size.status = AnimationStatus.increasing;

                    break;

                case StartValueType.random:
                    this.size.value = randomInRange(this.size) * pxRatio;
                    this.size.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    this.size.value = this.size.max;
                    this.size.status = AnimationStatus.decreasing;

                    break;
            }

            this.size.velocity =
                ((this.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
                container.retina.reduceFactor;

            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }

        /* position */
        this.bubble = {
            inRange: false,
        };
        this.position = this.calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();

        const canvasSize = container.canvas.size,
            moveCenterPerc = this.options.move.center;

        this.moveCenter = {
            x: (canvasSize.width * moveCenterPerc.x) / 100,
            y: (canvasSize.height * moveCenterPerc.y) / 100,
            radius: this.options.move.center.radius,
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
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);
        const gravityOptions = this.options.move.gravity;
        this.gravity = {
            enable: gravityOptions.enable,
            acceleration: getRangeValue(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };

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
            drawer = this.#engine.plugins.getShapeDrawer(this.shape);

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

        this.life = this.loadLife();
        this.spawning = this.life.delay > 0;
        this.shadowColor = colorToRgb(this.options.shadow.color);

        for (const updater of container.particles.updaters) {
            if (updater.init) {
                updater.init(this);
            }
        }

        for (const mover of container.particles.movers) {
            if (mover.init) {
                mover.init(this);
            }
        }

        if (drawer && drawer.particleInit) {
            drawer.particleInit(container, this);
        }

        for (const [, plugin] of container.plugins) {
            if (plugin.particleCreated) {
                plugin.particleCreated(this);
            }
        }
    }

    isVisible(): boolean {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
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

    draw(delta: IDelta): void {
        const container = this.container;

        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }

        container.canvas.drawParticle(this, delta);
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

    getMass(): number {
        return (this.getRadius() ** 2 * Math.PI) / 2;
    }

    getFillColor(): IHsl | undefined {
        const color = this.bubble.color ?? getHslFromAnimation(this.color);

        if (color && this.roll && (this.backColor || this.roll.alter)) {
            const backFactor = this.options.roll.mode === RollMode.both ? 2 : 1,
                backSum = this.options.roll.mode === RollMode.horizontal ? Math.PI / 2 : 0,
                rolled = Math.floor(((this.roll.angle ?? 0) + backSum) / (Math.PI / backFactor)) % 2;

            if (rolled) {
                if (this.backColor) {
                    return this.backColor;
                }

                if (this.roll.alter) {
                    return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
                }
            }
        }

        return color;
    }

    getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? getHslFromAnimation(this.strokeColor) ?? this.getFillColor();
    }

    destroy(override?: boolean): void {
        this.destroyed = true;
        this.bubble.inRange = false;

        if (this.unbreakable) {
            return;
        }

        this.destroyed = true;
        this.bubble.inRange = false;

        for (const [, plugin] of this.container.plugins) {
            if (plugin.particleDestroyed) {
                plugin.particleDestroyed(this, override);
            }
        }

        if (override) {
            return;
        }

        const destroyOptions = this.options.destroy;

        if (destroyOptions.mode === DestroyMode.split) {
            this.split();
        }
    }

    /**
     * This method is used when the particle has lost a life and needs some value resets
     */
    reset(): void {
        if (this.opacity) {
            this.opacity.loops = 0;
        }

        this.size.loops = 0;
    }

    private split(): void {
        const splitOptions = this.options.destroy.split;

        if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
            return;
        }

        const rate = getValue(splitOptions.rate);

        for (let i = 0; i < rate; i++) {
            this.container.particles.addSplitParticle(this);
        }
    }

    private calcPosition(
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
            /* check position  - into the canvas */
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

        if (this.checkOverlap(pos, tryCount)) {
            return this.calcPosition(container, undefined, zIndex, tryCount + 1);
        }

        return pos;
    }

    private checkOverlap(pos: ICoordinates, tryCount = 0): boolean {
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

    private calculateVelocity(): Vector {
        const baseVelocity = getParticleBaseVelocity(this.direction);
        const res = baseVelocity.copy();
        const moveOptions = this.options.move;

        if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
            return res;
        }

        const rad = (Math.PI / 180) * getRangeValue(moveOptions.angle.value);
        const radOffset = (Math.PI / 180) * getRangeValue(moveOptions.angle.offset);

        const range = {
            left: radOffset - rad / 2,
            right: radOffset + rad / 2,
        };

        if (!moveOptions.straight) {
            res.angle += randomInRange(setRangeValue(range.left, range.right));
        }

        if (moveOptions.random && typeof moveOptions.speed === "number") {
            res.length *= Math.random();
        }

        return res;
    }

    private loadShapeData(shapeOptions: IShape, reduceDuplicates: boolean): IShapeValues | undefined {
        const shapeData = shapeOptions.options[this.shape];

        if (shapeData) {
            return deepExtend(
                {},
                shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData
            ) as IShapeValues;
        }
    }

    private loadLife(): IParticleLife {
        const container = this.container,
            particlesOptions = this.options,
            lifeOptions = particlesOptions.life,
            life = {
                delay: container.retina.reduceFactor
                    ? ((getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random())) /
                          container.retina.reduceFactor) *
                      1000
                    : 0,
                delayTime: 0,
                duration: container.retina.reduceFactor
                    ? ((getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random())) /
                          container.retina.reduceFactor) *
                      1000
                    : 0,
                time: 0,
                count: particlesOptions.life.count,
            };

        if (life.duration <= 0) {
            life.duration = -1;
        }

        if (life.count <= 0) {
            life.count = -1;
        }

        return life;
    }
}
