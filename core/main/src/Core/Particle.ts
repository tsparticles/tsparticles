import type { Container } from "./Container";
import type { IVelocity } from "./Interfaces/IVelocity";
import type { IParticleSizeAnimation } from "./Interfaces/IParticleSizeAnimation";
import type { IParticleOpacityAnimation } from "./Interfaces/IParticleOpacityAnimation";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticleImage } from "./Interfaces/IParticleImage";
import { Updater } from "./Particle/Updater";
import type { IRgb } from "./Interfaces/IRgb";
import type { IStroke } from "../Options/Interfaces/Particles/IStroke";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    MoveDirection,
    MoveDirectionAlt,
    OpacityAnimationStatus,
    OutMode,
    RotateDirection,
    RotateDirectionAlt,
    ShapeType,
    SizeAnimationStatus,
    StartValueType,
} from "../Enums";
import { ImageDrawer } from "../ShapeDrawers/ImageDrawer";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { RecursivePartial } from "../Types";
import type { IHsl } from "./Interfaces/IHsl";
import { ColorUtils, NumberUtils, Plugins, Utils } from "../Utils";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import { Infecter } from "./Particle/Infecter";
import type { IDelta } from "./Interfaces/IDelta";
import { Mover } from "./Particle/Mover";

/**
 * The single particle object
 * @category Core
 */
export class Particle implements IParticle {
    public angle;
    public pathAngle;
    public destroyed;
    public lifeDelay;
    public lifeDelayTime;
    public lifeDuration;
    public lifeTime;
    public livesRemaining;
    public spawning;
    public lastNoiseTime;

    public readonly noiseDelay;
    public readonly updater;
    public readonly infecter;
    public readonly mover;
    public readonly strokeWidth;
    public readonly particlesOptions;

    public rotateDirection: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    public randomIndexData?: number;
    public linksDistance?: number;
    public linksWidth?: number;
    public moveSpeed?: number;
    public sizeValue?: number;
    public sizeAnimationSpeed?: number;

    public readonly close: boolean;
    public readonly direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public readonly fill: boolean;
    public readonly stroke: IStroke;
    public readonly size: IParticleSizeAnimation;
    public readonly position: ICoordinates;
    public readonly offset: ICoordinates;
    public readonly color: IHsl | undefined;
    public readonly strokeColor: IHsl | undefined;
    public readonly shadowColor: IRgb | undefined;
    public readonly opacity: IParticleOpacityAnimation;
    public readonly velocity: IVelocity;
    public readonly shape: ShapeType | string;
    public readonly image?: IParticleImage;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;
    public readonly bubble: IBubbleParticleData;
    public readonly colorVelocity: number;

    private readonly strokeColorVelocity?: number;

    constructor(
        public readonly id: number,
        private readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>
    ) {
        this.fill = true;
        this.close = true;
        this.lastNoiseTime = 0;
        this.destroyed = false;

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
        this.particlesOptions = particlesOptions;
        this.noiseDelay = NumberUtils.getValue(this.particlesOptions.move.noise.delay) * 1000;

        container.retina.initParticle(this);

        const color = this.particlesOptions.color;

        /* size */
        const sizeOptions = this.particlesOptions.size;
        const sizeValue = NumberUtils.getValue(sizeOptions) * container.retina.pixelRatio;

        const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;

        this.size = {
            value: sizeValue,
        };

        this.direction = this.particlesOptions.move.direction;
        this.bubble = {
            inRange: false,
        };

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };

        const rotateOptions = this.particlesOptions.rotate;

        const degAngle = rotateOptions.random ? Math.random() * 360 : rotateOptions.value;

        this.angle = (degAngle * Math.PI) / 180;
        this.pathAngle = Math.atan2(this.initialVelocity.vertical, this.initialVelocity.horizontal);

        this.rotateDirection = rotateOptions.direction;

        if (this.rotateDirection === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            this.rotateDirection = index > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
        }

        const sizeAnimation = this.particlesOptions.size.animation;

        if (sizeAnimation.enable) {
            if (!randomSize) {
                switch (sizeAnimation.startValue) {
                    case StartValueType.min:
                        this.size.value = sizeAnimation.minimumValue * pxRatio;
                        this.size.status = SizeAnimationStatus.increasing;

                        break;

                    case StartValueType.random:
                        this.size.value = NumberUtils.randomInRange(
                            sizeAnimation.minimumValue * pxRatio,
                            this.size.value
                        );
                        this.size.status = SizeAnimationStatus.increasing;

                        break;

                    case StartValueType.max:
                    default:
                        this.size.status = SizeAnimationStatus.decreasing;

                        break;
                }
            }
            this.size.velocity = (this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100;

            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }

        /* color */
        this.color = ColorUtils.colorToHsl(color, this.id, reduceDuplicates);

        const colorAnimation = this.particlesOptions.color.animation;

        if (colorAnimation.enable) {
            this.colorVelocity = colorAnimation.speed / 100;

            if (!colorAnimation.sync) {
                this.colorVelocity = this.colorVelocity * Math.random();
            }
        } else {
            this.colorVelocity = 0;
        }

        if (colorAnimation.enable && !colorAnimation.sync && this.color) {
            this.color.h = Math.random() * 360;
        }

        /* position */
        this.position = this.calcPosition(this.container, position);

        /* parallax */
        this.offset = {
            x: 0,
            y: 0,
        };

        /* check position - avoid overlap */
        if (this.particlesOptions.collisions.enable && !this.checkOverlap(position)) {
            throw new Error();
        }

        /* opacity */
        const opacityOptions = this.particlesOptions.opacity;
        const randomOpacity = opacityOptions.random;
        const opacityValue = opacityOptions.value;

        this.opacity = {
            value: randomOpacity.enable
                ? NumberUtils.randomInRange(randomOpacity.minimumValue, opacityValue)
                : opacityValue,
        };

        const opacityAnimation = opacityOptions.animation;

        if (opacityAnimation.enable) {
            this.opacity.status = OpacityAnimationStatus.increasing;
            this.opacity.velocity = opacityAnimation.speed / 100;

            if (!opacityAnimation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

        let drawer = container.drawers.get(this.shape);

        if (!drawer) {
            drawer = Plugins.getShapeDrawer(this.shape);

            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }

        /* if shape is image */
        const imageShape = this.loadImageShape(container, drawer);

        if (imageShape) {
            this.image = imageShape.image;
            this.fill = imageShape.fill;
            this.close = imageShape.close;
        }

        this.stroke =
            this.particlesOptions.stroke instanceof Array
                ? Utils.itemFromArray(this.particlesOptions.stroke, this.id, reduceDuplicates)
                : this.particlesOptions.stroke;

        this.strokeWidth = this.stroke.width * container.retina.pixelRatio;

        /* strokeColor */
        this.strokeColor = ColorUtils.colorToHsl(this.stroke.color);

        if (typeof this.stroke.color !== "string") {
            const strokeColorAnimation = this.stroke.color?.animation;

            if (strokeColorAnimation && this.strokeColor) {
                if (strokeColorAnimation.enable) {
                    this.strokeColorVelocity = colorAnimation.speed / 100;

                    if (!strokeColorAnimation.sync) {
                        this.strokeColorVelocity = this.strokeColorVelocity * Math.random();
                    }
                } else {
                    this.strokeColorVelocity = 0;
                }

                if (strokeColorAnimation.enable && !strokeColorAnimation.sync && this.color) {
                    this.strokeColor.h = Math.random() * 360;
                }
            }
        }

        const lifeOptions = particlesOptions.life;

        this.lifeDelay = NumberUtils.getValue(lifeOptions.delay) * 1000;
        this.lifeDelayTime = 0;
        this.lifeDuration = NumberUtils.getValue(lifeOptions.duration) * 1000;
        this.lifeTime = 0;
        this.livesRemaining = particlesOptions.life.count;
        this.spawning = this.lifeDelay > 0;

        if (this.lifeDuration <= 0) {
            this.lifeDuration = -1;
        }

        if (this.livesRemaining <= 0) {
            this.livesRemaining = -1;
        }

        this.shadowColor = ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
        this.updater = new Updater(container, this);
        this.infecter = new Infecter(container);
        this.mover = new Mover(container, this);
    }

    public move(delta: IDelta): void {
        /* move the particle */
        this.mover.move(delta);
    }

    public update(delta: IDelta): void {
        this.updater.update(delta);
    }

    public draw(delta: IDelta): void {
        this.container.canvas.drawParticle(this, delta);
    }

    public isOverlapping(): boolean {
        const container = this.container;

        let collisionFound = false;

        const pos1 = this.getPosition();

        for (const p2 of container.particles.array) {
            if (p2 === this) {
                continue;
            }

            const pos2 = p2.getPosition();
            const dist = NumberUtils.getDistance(pos1, pos2);

            if (dist <= this.size.value + p2.size.value) {
                collisionFound = true;
                break;
            }
        }

        return collisionFound;
    }

    public getPosition(): ICoordinates {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }

    public getFillColor(): IHsl | undefined {
        return this.bubble.color ?? this.color;
    }

    public getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? this.strokeColor ?? this.color;
    }

    public destroy(): void {
        this.destroyed = true;
        this.bubble.inRange = false;
        this.container.particles.removeLinks(this);
    }

    private checkOverlap(position?: ICoordinates, iterations = 0): boolean {
        const container = this.container;

        if (!container.particles.count) {
            return true;
        }

        if (iterations >= container.particles.count) {
            // too many particles
            return false;
        }

        const overlapping = this.isOverlapping();

        if (overlapping) {
            this.position.x = position ? position.x : Math.random() * container.canvas.size.width;
            this.position.y = position ? position.y : Math.random() * container.canvas.size.height;

            return this.checkOverlap(undefined, iterations + 1);
        }

        return true;
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
                return Utils.deepExtend({}, pluginPos) as ICoordinates;
            }
        }

        const pos = {
            x: position?.x ?? Math.random() * container.canvas.size.width,
            y: position?.y ?? Math.random() * container.canvas.size.height,
        };

        /* check position  - into the canvas */
        const outMode = this.particlesOptions.move.outMode;

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

        return pos;
    }

    private calculateVelocity(): IVelocity {
        const baseVelocity = NumberUtils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.particlesOptions.move;

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
                data: image,
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
                    if (this.image) {
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
