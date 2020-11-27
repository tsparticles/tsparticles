import type { Container } from "./Container";
import type { IVelocity } from "./Interfaces/IVelocity";
import type { IParticleValueAnimation } from "./Interfaces/IParticleValueAnimation";
import type { ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AnimationStatus,
    DestroyMode,
    MoveDirection,
    MoveDirectionAlt,
    OutMode,
    RotateDirection,
    ShapeType,
    StartValueType,
} from "../Enums";
import type { RecursivePartial } from "../Types";
import { colorToHsl, colorToRgb, getHslFromAnimation, NumberUtils, Plugins, Utils } from "../Utils";
import type { IDelta } from "./Interfaces/IDelta";
import { Mover } from "./Particle/Mover";
import type { ILink } from "./Interfaces/ILink";
import type { IParticleLoops } from "./Interfaces/IParticleLoops";
import type { IParticleInfection } from "./Interfaces/IParticleInfection";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation";
import type { Stroke } from "../Options/Classes/Particles/Stroke";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation";

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    public pathAngle;
    public destroyed;
    public lifeDelay;
    public lifeDelayTime;
    public lifeDuration;
    public lifeTime;
    public livesRemaining;
    public misplaced;
    public spawning;
    public lastNoiseTime;
    public zIndexFactor;
    public splitCount;
    public unbreakable;

    public readonly noiseDelay;
    public readonly mover;
    public readonly sides;
    public readonly strokeWidth;
    public readonly options;

    public links: ILink[];
    public randomIndexData?: number;
    public linksDistance?: number;
    public attractDistance?: number;
    public linksWidth?: number;
    public maxDistance?: RecursivePartial<IVelocity>;
    public moveSpeed?: number;
    public sizeValue?: number;
    public sizeAnimationSpeed?: number;
    public spinRadius?: number;
    public spinAngle?: number;
    public spinDirection?: RotateDirection;
    public spinAcceleration?: number;
    public orbitRadius?: number;
    public orbitRotation?: number;
    public close: boolean;
    public fill: boolean;

    public readonly direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public readonly infection: IParticleInfection;
    public readonly loops: IParticleLoops;
    public readonly stroke: Stroke;
    public readonly position: ICoordinates3d;
    public readonly offset: ICoordinates;
    public readonly shadowColor: IRgb | undefined;
    public readonly color?: IParticleHslAnimation;
    public readonly opacity: IParticleValueAnimation<number>;
    public readonly rotate: IParticleValueAnimation<number>;
    public readonly size: IParticleValueAnimation<number>;
    public readonly strokeColor?: IParticleHslAnimation;
    public readonly orbitColor?: IHsl;
    public readonly velocity: IVelocity;
    public readonly shape: ShapeType | string;
    public readonly initialPosition: ICoordinates;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;
    public readonly bubble: IBubbleParticleData;
    public readonly spinCenter?: ICoordinates;

    constructor(
        public readonly id: number,
        public readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        public readonly group?: string
    ) {
        this.links = [];
        this.fill = true;
        this.close = true;
        this.lastNoiseTime = 0;
        this.splitCount = 0;
        this.unbreakable = false;
        this.destroyed = false;
        this.misplaced = false;
        this.loops = {
            opacity: 0,
            size: 0,
        };
        this.infection = {};

        const pxRatio = container.retina.pixelRatio;
        const options = container.options;
        const particlesOptions = new Particles();

        particlesOptions.load(options.particles);

        const shapeType = particlesOptions.shape.type;
        const reduceDuplicates = particlesOptions.reduceDuplicates;

        this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;

        if (overrideOptions?.shape) {
            if (overrideOptions.shape.type) {
                const overrideShapeType = overrideOptions.shape.type;

                this.shape =
                    overrideShapeType instanceof Array
                        ? Utils.itemFromArray(overrideShapeType, this.id, reduceDuplicates)
                        : overrideShapeType;
            }

            const shapeOptions = new Shape();

            shapeOptions.load(overrideOptions.shape);

            if (this.shape) {
                const shapeData = shapeOptions.options[this.shape];

                if (shapeData) {
                    this.shapeData = Utils.deepExtend(
                        {},
                        shapeData instanceof Array
                            ? Utils.itemFromArray(shapeData, this.id, reduceDuplicates)
                            : shapeData
                    ) as IShapeValues;
                }
            }
        } else {
            const shapeData = particlesOptions.shape.options[this.shape];

            if (shapeData) {
                this.shapeData = Utils.deepExtend(
                    {},
                    shapeData instanceof Array ? Utils.itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData
                ) as IShapeValues;
            }
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

        const zIndexValue = NumberUtils.getValue(this.options.zIndex);

        /* size */
        const sizeOptions = this.options.size;
        const sizeValue = NumberUtils.getValue(sizeOptions) * container.retina.pixelRatio;

        const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;

        this.size = {
            value: sizeValue,
        };

        /* position */
        this.position = this.calcPosition(
            this.container,
            position,
            NumberUtils.clamp(zIndexValue, 0, container.zLayers)
        );
        this.initialPosition = {
            x: this.position.x,
            y: this.position.y,
        };

        /* parallax */
        this.offset = {
            x: 0,
            y: 0,
        };

        // Scale z-index factor to be between 0 and 2
        this.zIndexFactor = this.position.z / container.zLayers;
        this.noiseDelay = NumberUtils.getValue(this.options.move.noise.delay) * 1000;

        container.retina.initParticle(this);

        const color = this.options.color;

        this.direction = this.options.move.direction;
        this.bubble = {
            inRange: false,
        };

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };

        this.pathAngle = Math.atan2(this.initialVelocity.vertical, this.initialVelocity.horizontal);

        const rotateOptions = this.options.rotate;

        this.rotate = {
            value: ((rotateOptions.random.enable ? Math.random() * 360 : rotateOptions.value) * Math.PI) / 180,
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

        const sizeAnimation = this.options.size.animation;

        if (sizeAnimation.enable) {
            this.size.status = AnimationStatus.increasing;

            if (!randomSize) {
                switch (sizeAnimation.startValue) {
                    case StartValueType.min:
                        this.size.value = sizeAnimation.minimumValue * pxRatio;

                        break;

                    case StartValueType.random:
                        this.size.value = NumberUtils.randomInRange(
                            sizeAnimation.minimumValue * pxRatio,
                            this.size.value
                        );

                        break;

                    case StartValueType.max:
                    default:
                        this.size.status = AnimationStatus.decreasing;

                        break;
                }
            }

            this.size.velocity =
                ((this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100) *
                container.retina.reduceFactor;

            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }

        /* orbit */
        const orbitOptions = particlesOptions.orbit;

        if (orbitOptions.enable) {
            const orbitRotationOptions = orbitOptions.rotation.random;
            if (orbitRotationOptions.enable) {
                this.orbitRotation = Math.floor(
                    orbitRotationOptions.minimumValue
                        ? NumberUtils.randomInRange(orbitRotationOptions.minimumValue, 360)
                        : Math.random() * 360
                );
            } else {
                this.orbitRotation = orbitOptions.rotation.value;
            }

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

        /* opacity */
        const opacityOptions = this.options.opacity;
        const randomOpacity =
            typeof opacityOptions.random === "boolean" ? opacityOptions.random : opacityOptions.random.enable;

        this.opacity = {
            value: NumberUtils.getValue(opacityOptions),
        };

        // Don't let opacity go below 0 or above 1
        this.opacity.value = NumberUtils.clamp(this.opacity.value, 0, 1);

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            this.opacity.status = AnimationStatus.increasing;

            if (!randomOpacity) {
                switch (opacityAnimation.startValue) {
                    case StartValueType.min:
                        this.opacity.value = opacityAnimation.minimumValue;

                        break;

                    case StartValueType.random:
                        this.opacity.value = NumberUtils.randomInRange(
                            opacityAnimation.minimumValue,
                            this.opacity.value
                        );

                        break;

                    case StartValueType.max:
                    default:
                        this.opacity.status = AnimationStatus.decreasing;

                        break;
                }
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
                ? Utils.itemFromArray(this.options.stroke, this.id, reduceDuplicates)
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

        const lifeOptions = particlesOptions.life;

        this.lifeDelay = container.retina.reduceFactor
            ? ((NumberUtils.getValue(lifeOptions.delay) * (lifeOptions.delay.sync ? 1 : Math.random())) /
                  container.retina.reduceFactor) *
              1000
            : 0;
        this.lifeDelayTime = 0;
        this.lifeDuration = container.retina.reduceFactor
            ? ((NumberUtils.getValue(lifeOptions.duration) * (lifeOptions.duration.sync ? 1 : Math.random())) /
                  container.retina.reduceFactor) *
              1000
            : 0;
        this.lifeTime = 0;
        this.livesRemaining = particlesOptions.life.count;
        this.spawning = this.lifeDelay > 0;

        if (this.lifeDuration <= 0) {
            this.lifeDuration = -1;
        }

        if (this.livesRemaining <= 0) {
            this.livesRemaining = -1;
        }

        if (this.options.move.spin.enable) {
            const spinCenter = this.options.move.spin.position ?? { x: 50, y: 50 };

            this.spinCenter = {
                x: (spinCenter.x / 100) * this.container.canvas.size.width,
                y: (spinCenter.y / 100) * this.container.canvas.size.height,
            };

            const pos = this.getPosition();
            const distance = NumberUtils.getDistance(pos, this.spinCenter);

            this.spinDirection =
                this.velocity.horizontal >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
            this.spinAngle = Math.atan2(this.velocity.vertical, this.velocity.horizontal);
            this.spinRadius = distance;
        }

        this.shadowColor = colorToRgb(this.options.shadow.color);
        this.mover = new Mover(container, this);
    }

    public move(delta: IDelta): void {
        /* move the particle */
        this.mover.move(delta);
    }

    public draw(delta: IDelta): void {
        this.container.canvas.drawParticle(this, delta);
    }

    public getPosition(): ICoordinates3d {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }

    public getRadius(): number {
        return this.bubble.radius || this.size.value;
    }

    public getFillColor(): IHsl | undefined {
        return this.bubble.color ?? getHslFromAnimation(this.color);
    }

    public getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? getHslFromAnimation(this.strokeColor) ?? this.getFillColor();
    }

    /**
     * This destroys the particle just before it's been removed from the canvas and the container
     */
    public destroy(override?: boolean): void {
        if (this.unbreakable) {
            return;
        }

        this.destroyed = true;
        this.bubble.inRange = false;
        this.links = [];

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
    public reset(): void {
        this.loops.opacity = 0;
        this.loops.size = 0;
    }

    private setColorAnimation(colorAnimation: IColorAnimation, colorValue: IParticleValueAnimation<number>): void {
        if (colorAnimation.enable) {
            colorValue.velocity = (colorAnimation.speed / 100) * this.container.retina.reduceFactor;

            if (colorAnimation.sync) {
                return;
            }

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
    ): ICoordinates3d {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
                return {
                    x: pluginPos.x,
                    y: pluginPos.y,
                    z: zIndex,
                };
            }
        }

        const cSize = container.canvas.size;

        const pos = {
            x: position?.x ?? cSize.width * Math.random(),
            y: position?.y ?? cSize.height * Math.random(),
            z: zIndex,
        };

        /* check position  - into the canvas */
        const outMode = this.options.move.outMode;

        if (Utils.isInArray(outMode, OutMode.bounce) || Utils.isInArray(outMode, OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            } else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }

        if (Utils.isInArray(outMode, OutMode.bounce) || Utils.isInArray(outMode, OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            } else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }

        const overlapOptions = this.options.collisions.overlap;

        if (!overlapOptions.enable) {
            const retries = overlapOptions.retries;

            if (retries >= 0 && tryCount > retries) {
                throw new Error("Particle is overlapping and can't be placed");
            }

            let overlaps = false;

            for (const particle of this.container.particles.array) {
                if (NumberUtils.getDistance(pos, particle.position) < this.size.value + particle.size.value) {
                    overlaps = true;
                    break;
                }
            }

            if (overlaps) {
                return this.calcPosition(
                    container,
                    {
                        x: cSize.width * Math.random(),
                        y: cSize.height * Math.random(),
                    },
                    zIndex,
                    tryCount + 1
                );
            }
        }

        return pos;
    }

    private calculateVelocity(): IVelocity {
        const baseVelocity = NumberUtils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.options.move;

        let rad: number;
        let radOffset = Math.PI / 4;

        if (typeof moveOptions.angle === "number") {
            rad = (Math.PI / 180) * moveOptions.angle;
        } else {
            rad = (Math.PI / 180) * moveOptions.angle.value;
            radOffset = (Math.PI / 180) * moveOptions.angle.offset;
        }

        const range = {
            left: Math.sin(radOffset + rad / 2) - Math.sin(radOffset - rad / 2),
            right: Math.cos(radOffset + rad / 2) - Math.cos(radOffset - rad / 2),
        };

        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;

            if (moveOptions.random) {
                res.horizontal += NumberUtils.randomInRange(range.left, range.right) / 2;
                res.vertical += NumberUtils.randomInRange(range.left, range.right) / 2;
            }
        } else {
            res.horizontal = baseVelocity.x + NumberUtils.randomInRange(range.left, range.right) / 2;
            res.vertical = baseVelocity.y + NumberUtils.randomInRange(range.left, range.right) / 2;
        }

        // const theta = 2.0 * Math.PI * Math.random();

        // res.x = Math.cos(theta);
        // res.y = Math.sin(theta);

        return res;
    }

    private split(): void {
        const splitOptions = this.options.destroy.split;

        if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
            return;
        }

        const rate = NumberUtils.getValue(splitOptions.rate);

        for (let i = 0; i < rate; i++) {
            this.container.particles.addSplitParticle(this);
        }
    }
}
