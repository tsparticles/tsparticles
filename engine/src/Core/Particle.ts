import type { Container } from "./Container";
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
    IParticleSpin,
    IParticleValueAnimation,
    IRgb,
} from "./Interfaces";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AnimationStatus,
    DestroyMode,
    MoveDirection,
    MoveDirectionAlt,
    OutMode,
    OutModeAlt,
    RotateDirection,
    StartValueType,
} from "../Enums";
import type { RecursivePartial } from "../Types";
import {
    clamp,
    colorToHsl,
    colorToRgb,
    deepExtend,
    deg2rad,
    getDistance,
    getHslFromAnimation,
    getRangeMax,
    getRangeMin,
    getParticleBaseVelocity,
    getRangeValue,
    isInArray,
    itemFromArray,
    Plugins,
    randomInRange,
    setRangeValue,
} from "../Utils";
import type { Stroke } from "../Options/Classes/Particles/Stroke";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation";
import type { IShape } from "../Options/Interfaces/Particles/Shape/IShape";
import { Vector } from "./Particle/Vector";
import { Vector3d } from "./Particle/Vector3d";

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    attractDistance?: number;
    close: boolean;
    destroyed;
    fill: boolean;
    linksDistance?: number;
    linksWidth?: number;
    moveDrift?: number;
    moveSpeed: number;
    misplaced;
    orbitRadius?: number;
    orbitRotation?: number;
    randomIndexData?: number;
    sizeAnimationSpeed?: number;
    spawning;
    splitCount;
    unbreakable;
    zIndexFactor;

    readonly pathDelay;
    readonly sides;
    readonly strokeWidth;
    readonly options;
    readonly direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    readonly life: IParticleLife;
    readonly loops: IParticleLoops;
    readonly spin?: IParticleSpin;
    readonly stroke: Stroke;
    readonly position: Vector3d;
    readonly offset: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly color?: IParticleHslAnimation;
    readonly maxDistance: Partial<IDistance>;
    readonly opacity: IParticleValueAnimation<number>;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly strokeColor?: IParticleHslAnimation;
    readonly orbitColor?: IHsl;
    readonly velocity: Vector;
    readonly shape: string;
    readonly initialPosition: Vector3d;
    readonly initialVelocity: Vector;
    readonly shapeData?: IShapeValues;
    readonly bubble: IBubbleParticleData;

    constructor(
        readonly id: number,
        readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        readonly group?: string
    ) {
        this.fill = true;
        this.close = true;
        this.splitCount = 0;
        this.unbreakable = false;
        this.destroyed = false;
        this.misplaced = false;
        this.loops = {
            opacity: 0,
            size: 0,
        };
        this.maxDistance = {};

        const options = container.actualOptions;
        const particlesOptions = new Particles();

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
        this.bubble = {
            inRange: false,
        };
        this.options = particlesOptions;

        const zIndexValue = getRangeValue(this.options.zIndex.value);

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
        this.pathDelay = getRangeValue(this.options.move.path.delay.value) * 1000;

        container.retina.initParticle(this);

        const color = this.options.color;

        this.direction = this.options.move.direction;
        this.moveSpeed = getRangeValue(this.options.move.speed);

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();

        this.size = this.loadSize();
        this.rotate = this.loadRotate();
        this.opacity = this.loadOpacity();

        /* orbit */
        const orbitOptions = particlesOptions.orbit;

        if (orbitOptions.enable) {
            this.orbitRotation = getRangeValue(orbitOptions.rotation.value);

            this.orbitColor = colorToHsl(orbitOptions.color);
        }

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

        if (this.options.move.spin.enable) {
            const spinPos = this.options.move.spin.position ?? { x: 50, y: 50 };

            const spinCenter = {
                x: (spinPos.x / 100) * this.container.canvas.size.width,
                y: (spinPos.y / 100) * this.container.canvas.size.height,
            };

            const pos = this.getPosition();
            const distance = getDistance(pos, spinCenter);

            this.spin = {
                center: spinCenter,
                direction: this.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise,
                angle: this.velocity.angle,
                radius: distance,
                acceleration: this.options.move.spin.acceleration,
            };
        }

        this.shadowColor = colorToRgb(this.options.shadow.color);

        this.fixPosition();

        for (const [, plugin] of container.plugins) {
            if (plugin.particleCreated) {
                plugin.particleCreated(this);
            }
        }
    }

    draw(delta: IDelta): void {
        const container = this.container;

        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }

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
        return this.bubble.color ?? getHslFromAnimation(this.color);
    }

    getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? getHslFromAnimation(this.strokeColor) ?? this.getFillColor();
    }

    /**
     * This destroys the particle just before it's been removed from the canvas and the container
     */
    destroy(override?: boolean): void {
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

    private calcPosition(container: Container, position: ICoordinates | undefined, zIndex: number): Vector3d {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
                return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
            }
        }

        const cSize = container.canvas.size;

        return Vector3d.create(
            position?.x ?? cSize.width * Math.random(),
            position?.y ?? cSize.height * Math.random(),
            zIndex
        );
    }

    fixPosition(tryCount = 0): void {
        this.fixPositionInCanvas(this.position);

        if (this.checkOverlap(this.position, tryCount)) {
            this.position.setTo(this.calcPosition(this.container, undefined, this.position.z));

            this.fixPosition(tryCount + 1);
        }
    }

    fixPositionInCanvas(pos: ICoordinates3d): void {
        /* check position  - into the canvas */
        const container = this.container;
        const outMode = this.options.move.outModes;
        const hOut = [outMode.right, outMode.left];
        const vOut = [outMode.bottom, outMode.top];

        pos.x += this.getOutCanvasFix(
            [OutMode.bounce, OutMode.bounceHorizontal],
            hOut,
            container.canvas.size.width,
            pos.x
        );
        pos.y += this.getOutCanvasFix(
            [OutMode.bounce, OutMode.bounceVertical],
            vOut,
            container.canvas.size.height,
            pos.y
        );
    }

    private getOutCanvasFix(
        outModes: (OutMode | keyof typeof OutMode | OutModeAlt)[],
        modes: (OutMode | keyof typeof OutMode | OutModeAlt | undefined)[],
        size: number,
        coordinate: number
    ): number {
        for (const outMode of outModes) {
            if (!isInArray(outMode, modes)) {
                continue;
            }

            if (coordinate > size - this.size.value * 2) {
                return this.size.value;
            } else if (coordinate < this.size.value * 2) {
                return -this.size.value;
            }
        }

        return 0;
    }

    private checkOverlap(pos: ICoordinates3d, tryCount = 0): boolean {
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
        const res = getParticleBaseVelocity(this.direction),
            moveOptions = this.options.move,
            angle = deg2rad(moveOptions.angle.value),
            offset = deg2rad(moveOptions.angle.offset);

        if ((moveOptions.straight && moveOptions.random) || !moveOptions.straight) {
            const range = setRangeValue(offset - angle / 2, offset + angle / 2);

            // res.length += Math.sqrt(range.left ** 2 + range.right ** 2);
            res.angle += randomInRange(range);
        }

        return res;
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

    private loadShapeData(shapeOptions: IShape, reduceDuplicates: boolean): IShapeValues | undefined {
        const shapeData = shapeOptions.options[this.shape];

        if (shapeData) {
            return deepExtend(
                {},
                shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData
            ) as IShapeValues;
        }
    }

    private loadSize(): IParticleValueAnimation<number> {
        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const sizeOptions = this.options.size;
        const sizeValue = getRangeValue(sizeOptions.value) * container.retina.pixelRatio;
        const sizeAnimation = sizeOptions.animation;
        const size: IParticleValueAnimation<number> = {
            value: sizeValue,
        };

        if (sizeAnimation.enable) {
            size.status = AnimationStatus.increasing;

            switch (sizeAnimation.startValue) {
                case StartValueType.min:
                    size.value = getRangeMin(this.options.size.value) * pxRatio;
                    size.status = AnimationStatus.increasing;

                    break;

                case StartValueType.max:
                    size.value = getRangeMax(this.options.size.value) * pxRatio;
                    size.status = AnimationStatus.decreasing;

                    break;

                case StartValueType.random:
                default:
                    size.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;
            }

            size.velocity =
                ((this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
                container.retina.reduceFactor;

            if (!sizeAnimation.sync) {
                size.velocity *= Math.random();
            }
        }

        return size;
    }

    private loadRotate(): IParticleValueAnimation<number> {
        const container = this.container;
        const rotateOptions = this.options.rotate;

        const rotate: IParticleValueAnimation<number> = {
            value: deg2rad(getRangeValue(rotateOptions.value)),
        };

        let rotateDirection = rotateOptions.direction;

        if (rotateDirection === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }

        switch (rotateDirection) {
            case RotateDirection.counterClockwise:
            case "counterClockwise":
                rotate.status = AnimationStatus.decreasing;
                break;
            case RotateDirection.clockwise:
                rotate.status = AnimationStatus.increasing;
                break;
        }

        const rotateAnimation = this.options.rotate.animation;

        if (rotateAnimation.enable) {
            rotate.velocity = (rotateAnimation.speed / 360) * container.retina.reduceFactor;

            if (!rotateAnimation.sync) {
                rotate.velocity *= Math.random();
            }
        }

        return rotate;
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

    private loadOpacity(): IParticleValueAnimation<number> {
        const container = this.container,
            opacityOptions = this.options.opacity,
            opacity: IParticleValueAnimation<number> = {
                value: getRangeValue(opacityOptions.value),
            },
            opacityAnimation = opacityOptions.animation;

        // Don't let opacity go below 0 or above 1
        opacity.value = clamp(opacity.value, 0, 1);

        if (opacityAnimation.enable) {
            opacity.status = AnimationStatus.increasing;

            switch (opacityAnimation.startValue) {
                case StartValueType.min:
                    opacity.value = getRangeMin(this.options.opacity.value);
                    opacity.status = AnimationStatus.increasing;

                    break;

                case StartValueType.max:
                    opacity.value = getRangeMax(this.options.opacity.value);
                    opacity.status = AnimationStatus.decreasing;

                    break;

                case StartValueType.random:
                default:
                    opacity.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;

                    break;
            }

            opacity.velocity = (opacityAnimation.speed / 100) * container.retina.reduceFactor;

            if (!opacityAnimation.sync) {
                opacity.velocity *= Math.random();
            }
        }

        return opacity;
    }
}
