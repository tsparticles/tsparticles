import type { Container } from "./Container";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AlterType,
    AnimationStatus,
    DestroyMode,
    OutMode,
    RotateDirection,
    ShapeType,
    StartValueType,
    TiltDirection,
} from "../Enums";
import type { RecursivePartial } from "../Types";
import {
    clamp,
    colorToHsl,
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
import type { ILink } from "./Interfaces/ILink";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation";
import type { Stroke } from "../Options/Classes/Particles/Stroke";
import { Vector } from "./Particle/Vector";
import type {
    IBubbleParticleData,
    ICoordinates,
    ICoordinates3d,
    IDelta,
    IDistance,
    IHsl,
    IParticle,
    IParticleHslAnimation,
    IParticleLife,
    IParticleLoops,
    IParticleNumericValueAnimation,
    IParticleTiltValueAnimation,
    IParticleValueAnimation,
    IRgb,
    IShapeValues,
} from "./Interfaces";
import { Vector3d } from "./Particle/Vector3d";
import { IShape } from "../Options/Interfaces/Particles/Shape/IShape";

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    destroyed;
    lastPathTime;
    misplaced;
    rollAngle;
    rollSpeed;
    spawning;
    splitCount;
    unbreakable;
    wobbleAngle;
    wobbleDistance;
    wobbleSpeed;

    readonly pathDelay;
    readonly sides;
    readonly strokeWidth;
    readonly options;
    readonly life: IParticleLife;
    readonly loops: IParticleLoops;
    readonly maxDistance: Partial<IDistance>;

    alterValue?: number;
    alterType?: AlterType;
    attractDistance?: number;
    backColor?: IHsl;
    close: boolean;
    fill: boolean;
    links: ILink[];
    randomIndexData?: number;
    linksDistance?: number;
    linksWidth?: number;
    moveDrift?: number;
    moveSpeed?: number;
    maxSpeed?: number;
    sizeAnimationSpeed?: number;

    readonly direction: number;
    readonly stroke: Stroke;
    readonly position: Vector3d;
    readonly offset: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly color?: IParticleHslAnimation;
    readonly opacity: IParticleNumericValueAnimation;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleNumericValueAnimation;
    readonly tilt: IParticleTiltValueAnimation;
    readonly strokeColor?: IParticleHslAnimation;
    readonly velocity: Vector;
    readonly shape: ShapeType | string;
    readonly initialPosition: Vector;
    readonly initialVelocity: Vector;
    readonly shapeData?: IShapeValues;
    readonly bubble: IBubbleParticleData;
    readonly zIndexFactor: number;

    constructor(
        readonly id: number,
        readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        readonly group?: string
    ) {
        this.links = [];
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.splitCount = 0;
        this.misplaced = false;
        this.loops = {
            opacity: 0,
            size: 0,
        };
        this.maxDistance = {};

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

        const zIndexValue = getRangeValue(this.options.zIndex.value);

        this.pathDelay = getValue(this.options.move.path.delay) * 1000;
        this.wobbleDistance = 0;

        container.retina.initParticle(this);

        const color = this.options.color;

        /* size */
        const sizeOptions = this.options.size;
        const sizeValue = getValue(sizeOptions) * container.retina.pixelRatio;

        this.size = {
            value: sizeValue,
            max: getRangeMax(sizeOptions.value) * pxRatio,
            min: getRangeMin(sizeOptions.value) * pxRatio,
        };

        const sizeAnimation = sizeOptions.animation;

        if (sizeAnimation.enable) {
            this.size.status = AnimationStatus.increasing;

            const sizeRange = setRangeValue(sizeOptions.value, sizeAnimation.minimumValue * pxRatio);

            this.size.min = getRangeMin(sizeRange);
            this.size.max = getRangeMax(sizeRange);

            switch (sizeAnimation.startValue) {
                case StartValueType.min:
                    this.size.value = this.size.min;
                    this.size.status = AnimationStatus.increasing;

                    break;

                case StartValueType.random:
                    this.size.value = randomInRange(this.size);
                    this.size.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    this.size.value = this.size.max;
                    this.size.status = AnimationStatus.decreasing;

                    break;
            }

            this.size.velocity =
                ((this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
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

        const rotateOptions = this.options.rotate;

        this.rotate = {
            value: (getRangeValue(rotateOptions.value) * Math.PI) / 180,
        };

        let rotateDirection = rotateOptions.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }

        switch (rotateDirection) {
            case RotateDirection.counterClockwise:
            case "counterClockwise":
                this.rotate.status = AnimationStatus.decreasing;
                break;
            case RotateDirection.clockwise:
                this.rotate.status = AnimationStatus.increasing;
                break;
        }

        const rotateAnimation = this.options.rotate.animation;

        if (rotateAnimation.enable) {
            this.rotate.velocity = (rotateAnimation.speed / 360) * container.retina.reduceFactor;

            if (!rotateAnimation.sync) {
                this.rotate.velocity *= Math.random();
            }
        }

        const tiltOptions = this.options.tilt;

        this.tilt = {
            value: (getRangeValue(tiltOptions.value) * Math.PI) / 180,
            sinDirection: Math.random() >= 0.5 ? 1 : -1,
            cosDirection: Math.random() >= 0.5 ? 1 : -1,
        };

        let tiltDirection = tiltOptions.direction;

        if (tiltDirection === TiltDirection.random) {
            const index = Math.floor(Math.random() * 2);

            tiltDirection = index > 0 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
        }

        switch (tiltDirection) {
            case TiltDirection.counterClockwise:
            case "counterClockwise":
                this.tilt.status = AnimationStatus.decreasing;
                break;
            case TiltDirection.clockwise:
                this.tilt.status = AnimationStatus.increasing;
                break;
        }

        const tiltAnimation = this.options.tilt.animation;

        if (tiltAnimation.enable) {
            this.tilt.velocity = (tiltAnimation.speed / 360) * container.retina.reduceFactor;

            if (!tiltAnimation.sync) {
                this.tilt.velocity *= Math.random();
            }
        }

        /* color */
        const hslColor = colorToHsl(color, this.id, reduceDuplicates);

        if (hslColor) {
            /* color */
            this.color = {
                h: {
                    value: hslColor.h,
                },
                s: {
                    value: hslColor.s,
                },
                l: {
                    value: hslColor.l,
                },
            };

            const colorAnimation = this.options.color.animation;

            this.setColorAnimation(colorAnimation.h, this.color.h);
            this.setColorAnimation(colorAnimation.s, this.color.s);
            this.setColorAnimation(colorAnimation.l, this.color.l);
        }

        const rollOpt = this.options.roll;

        if (rollOpt.enable) {
            if (this.color) {
                if (rollOpt.backColor) {
                    this.backColor = colorToHsl(rollOpt.backColor);
                } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
                    this.alterType = Math.random() >= 0.5 ? AlterType.darken : AlterType.enlighten;
                    this.alterValue =
                        this.alterType === AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value;
                } else if (rollOpt.darken.enable) {
                    this.alterType = AlterType.darken;
                    this.alterValue = rollOpt.darken.value;
                } else if (rollOpt.enlighten.enable) {
                    this.alterType = AlterType.enlighten;
                    this.alterValue = rollOpt.enlighten.value;
                }
            }

            this.rollAngle = Math.random() * Math.PI * 2;
            this.rollSpeed = getRangeValue(rollOpt.speed) / 360;
        } else {
            this.rollAngle = 0;
            this.rollSpeed = 0;
        }

        const wobbleOpt = this.options.wobble;

        if (wobbleOpt.enable) {
            this.wobbleAngle = Math.random() * Math.PI * 2;
            this.wobbleSpeed = getRangeValue(wobbleOpt.speed) / 360;
        } else {
            this.wobbleAngle = 0;
            this.wobbleSpeed = 0;
        }

        /* position */
        this.position = this.calcPosition(this.container, position, clamp(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();

        /* parallax */
        this.offset = Vector.origin;

        const particles = this.container.particles;

        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;

        // Scale z-index factor to be between 0 and 2
        this.zIndexFactor = this.position.z / container.zLayers;

        /* opacity */
        const opacityOptions = this.options.opacity;

        this.opacity = {
            max: getRangeMax(opacityOptions.value),
            min: getRangeMin(opacityOptions.value),
            value: getValue(opacityOptions),
        };

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            this.opacity.status = AnimationStatus.increasing;

            const opacityRange = setRangeValue(opacityOptions.value, opacityAnimation.minimumValue);

            this.opacity.min = getRangeMin(opacityRange);
            this.opacity.max = getRangeMax(opacityRange);

            switch (opacityAnimation.startValue) {
                case StartValueType.min:
                    this.opacity.value = this.opacity.min;
                    this.opacity.status = AnimationStatus.increasing;

                    break;

                case StartValueType.random:
                    this.opacity.value = randomInRange(this.opacity);
                    this.opacity.status =
                        Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;

                case StartValueType.max:
                default:
                    this.opacity.value = this.opacity.max;
                    this.opacity.status = AnimationStatus.decreasing;

                    break;
            }

            this.opacity.velocity = (opacityAnimation.speed / 100) * container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

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

        this.stroke =
            this.options.stroke instanceof Array
                ? itemFromArray(this.options.stroke, this.id, reduceDuplicates)
                : this.options.stroke;

        this.strokeWidth = this.stroke.width * container.retina.pixelRatio;

        /* strokeColor */
        const strokeHslColor = colorToHsl(this.stroke.color) ?? this.getFillColor();

        if (strokeHslColor) {
            /* strokeColor */
            this.strokeColor = {
                h: {
                    value: strokeHslColor.h,
                },
                s: {
                    value: strokeHslColor.s,
                },
                l: {
                    value: strokeHslColor.l,
                },
            };

            const strokeColorAnimation = this.stroke.color?.animation;

            if (strokeColorAnimation && this.strokeColor) {
                this.setColorAnimation(strokeColorAnimation.h, this.strokeColor.h);
                this.setColorAnimation(strokeColorAnimation.s, this.strokeColor.s);
                this.setColorAnimation(strokeColorAnimation.l, this.strokeColor.l);
            }
        }

        this.life = this.loadLife();
        this.spawning = this.life.delay > 0;

        this.shadowColor = colorToRgb(this.options.shadow.color);

        if (drawer && drawer.particleInit) {
            drawer.particleInit(container, this);
        }
    }

    draw(delta: IDelta): void {
        this.container.canvas.drawParticle(this, delta);
    }

    getPosition(): ICoordinates3d {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }

    getRadius(): number {
        return this.bubble.radius || this.size.value;
    }

    getMass(): number {
        const radius = this.getRadius();

        return (radius ** 2 * Math.PI) / 2;
    }

    getFillColor(): IHsl | undefined {
        if (this.bubble.color) {
            return this.bubble.color;
        }

        const color = getHslFromAnimation(this.color);

        if (color && (this.backColor || (this.alterType && this.alterValue !== undefined))) {
            const rolled = Math.floor(this.rollAngle / (Math.PI / 2)) % 2;

            if (rolled) {
                if (this.backColor) {
                    return this.backColor;
                } else if (this.alterType && this.alterValue !== undefined) {
                    return {
                        h: color.h,
                        s: color.s,
                        l: color.l + (this.alterType === AlterType.darken ? -1 : 1) * this.alterValue,
                    };
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
        this.links = [];

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
        this.loops.opacity = 0;
        this.loops.size = 0;
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

    private setColorAnimation(colorAnimation: IColorAnimation, colorValue: IParticleValueAnimation<number>): void {
        if (colorAnimation.enable) {
            colorValue.velocity = (colorAnimation.speed / 100) * this.container.retina.reduceFactor;

            if (colorAnimation.sync) {
                return;
            }

            colorValue.status = AnimationStatus.increasing;
            colorValue.velocity *= Math.random();

            if (colorValue.value) {
                colorValue.value *= Math.random();
            }
        } else {
            colorValue.velocity = 0;
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

        /* check position  - into the canvas */
        const outMode = this.options.move.outMode;

        if (isInArray(outMode, OutMode.bounce) || isInArray(outMode, OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            } else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }

        if (isInArray(outMode, OutMode.bounce) || isInArray(outMode, OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            } else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }

        if (this.checkOverlap(pos, tryCount)) {
            return this.calcPosition(container, undefined, zIndex, tryCount + 1);
        }

        return pos;
    }

    private checkOverlap(pos: ICoordinates, tryCount = 0): boolean {
        const overlapOptions = this.options.collisions.overlap;

        if (!overlapOptions.enable) {
            const retries = overlapOptions.retries;

            if (retries >= 0 && tryCount > retries) {
                throw new Error("Particle is overlapping and can't be placed");
            }

            let overlaps = false;

            for (const particle of this.container.particles.array) {
                if (getDistance(pos, particle.position) < this.size.value + particle.size.value) {
                    overlaps = true;
                    break;
                }
            }

            return overlaps;
        }

        return false;
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
