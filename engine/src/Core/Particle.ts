import type { Container } from "./Container";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AnimationStatus,
    DestroyMode,
    OutMode,
    OutModeAlt,
    RotateDirection,
    ShapeType,
    StartValueType,
} from "../Enums";
import type { RecursivePartial } from "../Types";
import {
    alterHsl,
    clamp,
    colorToRgb,
    deepExtend,
    getDistance,
    getHslFromAnimation,
    getParticleBaseVelocity,
    getParticleDirectionAngle,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getValue,
    isInArray,
    itemFromArray,
    Plugins,
    randomInRange,
    setRangeValue,
} from "../Utils";
import type { Stroke } from "../Options/Classes/Particles/Stroke";
import { Vector } from "./Particle/Vector";
import type {
    IBubbleParticleData,
    ICoordinates,
    ICoordinates3d,
    IDelta,
    IHsl,
    IParticle,
    IParticleGradientAnimation,
    IParticleHslAnimation,
    IParticleLife,
    IParticleNumericValueAnimation,
    IParticleSpin,
    IParticleTiltValueAnimation,
    IParticleValueAnimation,
    IRgb,
    IShapeValues,
    IParticleRetinaProps,
} from "./Interfaces";
import { Vector3d } from "./Particle/Vector3d";
import { IShape } from "../Options/Interfaces/Particles/Shape/IShape";
import { IParticleRoll } from "./Interfaces/IParticleRoll";
import { IParticleWobble } from "./Interfaces/IParticleWobble";

const fixOutMode = (data: {
    outMode: OutMode | keyof typeof OutMode | OutModeAlt;
    checkModes: (OutMode | keyof typeof OutMode | OutModeAlt)[];
    coord: number;
    maxCoord: number;
    setCb: (value: number) => void;
    radius: number;
}) => {
    if (isInArray(data.outMode, data.checkModes) || isInArray(data.outMode, data.checkModes)) {
        if (data.coord > data.maxCoord - data.radius * 2) {
            data.setCb(-data.radius);
        } else if (data.coord < data.radius * 2) {
            data.setCb(data.radius);
        }
    }
};

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    destroyed;
    lastPathTime;
    misplaced;
    spawning;
    splitCount;
    unbreakable;

    readonly pathDelay;
    readonly sides;
    readonly options;
    readonly life: IParticleLife;

    roll?: IParticleRoll;
    wobble?: IParticleWobble;
    backColor?: IHsl;
    close: boolean;
    fill: boolean;
    randomIndexData?: number;
    gradient?: IParticleGradientAnimation;
    rotate?: IParticleValueAnimation<number>;
    tilt?: IParticleTiltValueAnimation;
    color?: IParticleHslAnimation;
    opacity?: IParticleNumericValueAnimation;
    strokeWidth?: number;
    stroke?: Stroke;
    strokeColor?: IParticleHslAnimation;

    readonly moveDecay: number;
    readonly direction: number;
    readonly position: Vector3d;
    readonly offset: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly size: IParticleNumericValueAnimation;
    readonly velocity: Vector;
    readonly shape: ShapeType | string;
    readonly spin?: IParticleSpin;
    readonly initialPosition: Vector;
    readonly initialVelocity: Vector;
    readonly shapeData?: IShapeValues;
    readonly bubble: IBubbleParticleData;
    readonly zIndexFactor: number;
    readonly retina: IParticleRetinaProps;

    constructor(
        readonly id: number,
        readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        readonly group?: string
    ) {
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

        const pxRatio = container.retina.pixelRatio;
        const options = container.actualOptions;
        const particlesOptions = new ParticlesOptions();

        particlesOptions.load(options.particles);

        const shapeType = particlesOptions.shape.type;
        const reduceDuplicates = particlesOptions.reduceDuplicates;

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
            value: getValue(sizeOptions) * container.retina.pixelRatio,
            max: getRangeMax(sizeRange) * pxRatio,
            min: getRangeMin(sizeRange) * pxRatio,
            loops: 0,
            maxLoops: sizeOptions.animation.count,
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

        this.direction = getParticleDirectionAngle(this.options.move.direction);
        this.bubble = {
            inRange: false,
        };

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);

        /* position */
        this.position = this.calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();

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
            drawer = Plugins.getShapeDrawer(this.shape);

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

        if (this.options.move.spin.enable) {
            const spinPos = this.options.move.spin.position ?? { x: 50, y: 50 };

            const spinCenter = {
                x: (spinPos.x / 100) * container.canvas.size.width,
                y: (spinPos.y / 100) * container.canvas.size.height,
            };

            const pos = this.getPosition();
            const distance = getDistance(pos, spinCenter);

            this.spin = {
                center: spinCenter,
                direction: this.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise,
                angle: this.velocity.angle,
                radius: distance,
                acceleration: this.retina.spinAcceleration ?? getRangeValue(this.options.move.spin.acceleration),
            };
        }

        this.shadowColor = colorToRgb(this.options.shadow.color);

        for (const updater of container.particles.updaters) {
            if (updater.init) {
                updater.init(this);
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
        const radius = this.getRadius();
        const canvasSize = this.container.canvas.size;

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
            const rolled = Math.floor((this.roll?.angle ?? 0) / (Math.PI / 2)) % 2;

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

        const rate = getRangeValue(splitOptions.rate.value);

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

        const canvasSize = container.canvas.size;
        const pos = Vector3d.create(
            position?.x ?? Math.random() * canvasSize.width,
            position?.y ?? Math.random() * canvasSize.height,
            zIndex
        );
        const radius = this.getRadius();

        /* check position  - into the canvas */
        const outModes = this.options.move.outModes,
            fixHorizontal = (outMode: OutMode | keyof typeof OutMode | OutModeAlt) => {
                fixOutMode({
                    outMode,
                    checkModes: [OutMode.bounce, OutMode.bounceHorizontal],
                    coord: pos.x,
                    maxCoord: container.canvas.size.width,
                    setCb: (value: number) => (pos.x += value),
                    radius,
                });
            },
            fixVertical = (outMode: OutMode | keyof typeof OutMode | OutModeAlt) => {
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
        const collisionsOptions = this.options.collisions;
        const radius = this.getRadius();

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
        const rad = (Math.PI / 180) * moveOptions.angle.value;
        const radOffset = (Math.PI / 180) * moveOptions.angle.offset;

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
        const container = this.container;
        const particlesOptions = this.options;
        const lifeOptions = particlesOptions.life;

        const life = {
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
