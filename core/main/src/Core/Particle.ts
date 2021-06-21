import type { Container } from "./Container";
import type { IParticleValueAnimation } from "./Interfaces/IParticleValueAnimation";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticleImage } from "./Interfaces/IParticleImage";
import { Updater } from "./Particle/Updater";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import type { IShapeValues } from "./Interfaces/IShapeValues";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AnimationStatus,
    DestroyMode,
    OutMode,
    RotateDirection,
    ShapeType,
    StartValueType,
    TiltDirection,
} from "../Enums";
import { ImageDrawer } from "../ShapeDrawers/ImageDrawer";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { RecursivePartial } from "../Types";
import { ColorUtils, NumberUtils, Plugins, Utils } from "../Utils";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import { Infecter } from "./Particle/Infecter";
import type { IDelta } from "./Interfaces/IDelta";
import { Mover } from "./Particle/Mover";
import type { ILink } from "./Interfaces/ILink";
import type { IParticleHslAnimation } from "./Interfaces/IParticleHslAnimation";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation";
import type { Stroke } from "../Options/Classes/Particles/Stroke";
import type { IParticleLoops } from "./Interfaces/IParticleLoops";
import { Vector } from "./Particle/Vector";

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    destroyed;
    lastPathTime;
    lifeDelay;
    lifeDelayTime;
    lifeDuration;
    lifeTime;
    livesRemaining;
    misplaced;
    spawning;
    splitCount;
    unbreakable;
    wobbleAngle;
    wobbleSpeed;

    readonly pathDelay;
    readonly updater;
    readonly infecter;
    readonly mover;
    readonly sides;
    readonly strokeWidth;
    readonly options;
    readonly loops: IParticleLoops;

    attractDistance?: number;
    links: ILink[];
    randomIndexData?: number;
    linksDistance?: number;
    linksWidth?: number;
    maxDistance?: number;
    moveDrift?: number;
    moveSpeed?: number;
    sizeAnimationSpeed?: number;

    readonly close: boolean;
    readonly direction: number;
    readonly fill: boolean;
    readonly stroke: Stroke;
    readonly position: Vector;
    readonly offset: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly color?: IParticleHslAnimation;
    readonly opacity: IParticleValueAnimation<number>;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly tilt: IParticleValueAnimation<number>;
    readonly strokeColor?: IParticleHslAnimation;
    readonly velocity: Vector;
    readonly shape: ShapeType | string;
    readonly image?: IParticleImage;
    readonly initialPosition: Vector;
    readonly initialVelocity: Vector;
    readonly shapeData?: IShapeValues;
    readonly bubble: IBubbleParticleData;

    constructor(
        readonly id: number,
        private readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>
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

        const pxRatio = container.retina.pixelRatio;
        const options = container.actualOptions;
        const particlesOptions = new ParticlesOptions();

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
        this.pathDelay = NumberUtils.getValue(this.options.move.path.delay) * 1000;

        const wobbleOpt = this.options.wobble;
        if (wobbleOpt.enable) {
            this.wobbleAngle = Math.random() * Math.PI * 2;
            this.wobbleSpeed = NumberUtils.getRangeValue(wobbleOpt.speed) / 360;
        } else {
            this.wobbleAngle = 0;
            this.wobbleSpeed = 0;
        }

        container.retina.initParticle(this);

        const color = this.options.color;

        /* size */
        const sizeOptions = this.options.size;
        const sizeValue = NumberUtils.getValue(sizeOptions) * container.retina.pixelRatio;

        const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;

        this.size = {
            value: sizeValue,
        };

        this.direction = NumberUtils.getParticleDirectionAngle(this.options.move.direction);
        this.bubble = {
            inRange: false,
        };

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();

        const rotateOptions = this.options.rotate;

        this.rotate = {
            value: (NumberUtils.getRangeValue(rotateOptions.value) * Math.PI) / 180,
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
            value: (NumberUtils.getRangeValue(tiltOptions.value) * Math.PI) / 180,
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
                            NumberUtils.setRangeValue(sizeAnimation.minimumValue * pxRatio, this.size.value)
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

        /* color */
        const hslColor = ColorUtils.colorToHsl(color, this.id, reduceDuplicates);

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

        /* position */
        this.position = this.calcPosition(this.container, position);
        this.initialPosition = this.position.copy();

        /* parallax */
        this.offset = Vector.create(0, 0);

        /* opacity */
        const opacityOptions = this.options.opacity;
        const randomOpacity =
            typeof opacityOptions.random === "boolean" ? opacityOptions.random : opacityOptions.random.enable;

        this.opacity = {
            value: NumberUtils.getValue(opacityOptions),
        };

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
                            NumberUtils.setRangeValue(opacityAnimation.minimumValue, this.opacity.value)
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

        const sideCountFunc = drawer?.getSidesCount;

        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }

        /* if shape is image */
        const imageShape = this.loadImageShape(container, drawer);

        if (imageShape) {
            this.image = imageShape.image;
            this.fill = imageShape.fill;
            this.close = imageShape.close;
        }

        this.stroke =
            this.options.stroke instanceof Array
                ? Utils.itemFromArray(this.options.stroke, this.id, reduceDuplicates)
                : this.options.stroke;

        this.strokeWidth = this.stroke.width * container.retina.pixelRatio;

        /* strokeColor */
        const strokeHslColor = ColorUtils.colorToHsl(this.stroke.color) ?? this.getFillColor();

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

        this.shadowColor = ColorUtils.colorToRgb(this.options.shadow.color);
        this.updater = new Updater(container, this);
        this.infecter = new Infecter(container);
        this.mover = new Mover(container, this);

        if (drawer && drawer.particleInit) {
            drawer.particleInit(container, this);
        }
    }

    move(delta: IDelta): void {
        /* move the particle */
        this.mover.move(delta);
    }

    update(delta: IDelta): void {
        this.updater.update(delta);
    }

    draw(delta: IDelta): void {
        this.container.canvas.drawParticle(this, delta);
    }

    getPosition(): ICoordinates {
        return this.position.add(this.offset);
    }

    getRadius(): number {
        return this.bubble.radius || this.size.value;
    }

    getMass(): number {
        const radius = this.getRadius();

        return (radius ** 2 * Math.PI) / 2;
    }

    getFillColor(): IHsl | undefined {
        return this.bubble.color ?? ColorUtils.getHslFromAnimation(this.color);
    }

    getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? ColorUtils.getHslFromAnimation(this.strokeColor) ?? this.getFillColor();
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

        const rate = NumberUtils.getRangeValue(splitOptions.rate.value);

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

    private calcPosition(container: Container, position: ICoordinates | undefined, tryCount = 0): Vector {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
                return Vector.create(pluginPos.x, pluginPos.y);
            }
        }

        const canvasSize = container.canvas.size;
        const pos = Vector.create(
            position?.x ?? Math.random() * canvasSize.width,
            position?.y ?? Math.random() * canvasSize.height
        );

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

        if (this.checkOverlap(pos, tryCount)) {
            return this.calcPosition(container, undefined, tryCount + 1);
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
                if (NumberUtils.getDistance(pos, particle.position) < this.size.value + particle.size.value) {
                    overlaps = true;
                    break;
                }
            }

            return overlaps;
        }

        return false;
    }

    private calculateVelocity(): Vector {
        const baseVelocity = NumberUtils.getParticleBaseVelocity(this.direction);
        const res = baseVelocity.copy();
        const moveOptions = this.options.move;
        const rad = (Math.PI / 180) * moveOptions.angle.value;
        const radOffset = (Math.PI / 180) * moveOptions.angle.offset;

        const range = {
            //left: Math.sin(radOffset + rad / 2) - Math.sin(radOffset - rad / 2),
            //right: Math.cos(radOffset + rad / 2) - Math.cos(radOffset - rad / 2),
            left: radOffset - rad / 2,
            right: radOffset + rad / 2,
        };

        if (!moveOptions.straight) {
            //res.x += NumberUtils.randomInRange(NumberUtils.setRangeValue(range.left, range.right)) / 2;
            //res.y += NumberUtils.randomInRange(NumberUtils.setRangeValue(range.left, range.right)) / 2;
            res.angle += NumberUtils.randomInRange(NumberUtils.setRangeValue(range.left, range.right));
        }

        if (moveOptions.random) {
            res.length *= Math.random();
        }

        return res;
    }

    private loadImageShape(
        container: Container,
        drawer?: IShapeDrawer
    ):
        | {
              image: IParticleImage | undefined;
              fill: boolean;
              close: boolean;
          }
        | undefined {
        if (!(this.shape === ShapeType.image || this.shape === ShapeType.images)) {
            return;
        }

        const imageDrawer = drawer as ImageDrawer;
        const images = imageDrawer.getImages(container).images;
        const imageData = this.shapeData as IImageShape;
        const image = images.find((t) => t.source === imageData.src) ?? images[0];
        const color = this.getFillColor();
        let imageRes: IParticleImage;

        if (!image) {
            return;
        }

        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = ColorUtils.replaceColorSvg(image, color, this.opacity.value);

            /* prepare to create img with colored svg */
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);

            /* create particle img obj */
            const img = new Image();

            imageRes = {
                data: {
                    ...image,
                    svgData: svgColoredData,
                },
                loaded: false,
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src,
            };

            img.addEventListener("load", () => {
                if (this.image) {
                    this.image.loaded = true;
                    image.element = img;
                }

                domUrl.revokeObjectURL(url);
            });

            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);

                // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
                Utils.loadImage(imageData.src).then((img2) => {
                    if (this.image && img2) {
                        image.element = img2.element;
                        this.image.loaded = true;
                    }
                });
            });

            img.src = url;
        } else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = imageData.fill ?? this.fill;
        const close = imageData.close ?? this.close;

        return {
            image: imageRes,
            fill,
            close,
        };
    }
}
