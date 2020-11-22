import type { Container } from "./Container";
import type { IVelocity } from "./Interfaces/IVelocity";
import type { IParticleValueAnimation } from "./Interfaces/IParticleValueAnimation";
import type { ICoordinates, ICoordinates3d } from "./Interfaces/ICoordinates";
import type { IParticleImage } from "./Interfaces/IParticleImage";
import type { IHsl, IRgb } from "./Interfaces/Colors";
import type { IStroke } from "../Options/Interfaces/Particles/IStroke";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    AnimationStatus,
    MoveDirection,
    MoveDirectionAlt,
    OutMode,
    RotateDirection,
    ShapeType,
    StartValueType,
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
import type { IParticleLoops } from "./Interfaces/IParticleLoops";
import { DestroyMode } from "../Enums/Modes/DestroyMode";

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
    public unbreaking;

    public readonly noiseDelay;
    public readonly infecter;
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
    public orbitRotation: number;

    public readonly close: boolean;
    public readonly direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    public readonly fill: boolean;
    public readonly loops: IParticleLoops;
    public readonly stroke: IStroke;
    public readonly position: ICoordinates3d;
    public readonly offset: ICoordinates;
    public readonly shadowColor: IRgb | undefined;
    public readonly color: IParticleValueAnimation<IHsl | undefined>;
    public readonly opacity: IParticleValueAnimation<number>;
    public readonly rotate: IParticleValueAnimation<number>;
    public readonly size: IParticleValueAnimation<number>;
    public readonly strokeColor: IParticleValueAnimation<IHsl | undefined>;
    public readonly velocity: IVelocity;
    public readonly shape: ShapeType | string;
    public readonly image?: IParticleImage;
    public readonly initialPosition: ICoordinates;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;
    public readonly bubble: IBubbleParticleData;
    public readonly spinCenter?: ICoordinates;

    constructor(
        public readonly id: number,
        private readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>,
        public readonly group?: string
    ) {
        this.links = [];
        this.fill = true;
        this.close = true;
        this.lastNoiseTime = 0;
        this.splitCount = 0;
        this.unbreaking = false;
        this.destroyed = false;
        this.misplaced = false;
        this.loops = {
            opacity: 0,
            size: 0,
        };

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
        const orbitRotationOptions = particlesOptions.orbit.rotation.random;
        if (orbitRotationOptions.enable) {
            this.orbitRotation = orbitRotationOptions.minimumValue
                ? Math.floor(Math.random() * 360) + orbitRotationOptions.minimumValue
                : Math.floor(Math.random() * 360);
        } else {
            this.orbitRotation = this.options.orbit.rotation.value;
        }

        /* color */
        this.color = {
            value: ColorUtils.colorToHsl(color, this.id, reduceDuplicates),
        };

        const colorAnimation = this.options.color.animation;

        if (colorAnimation.enable) {
            this.color.velocity = (colorAnimation.speed / 100) * container.retina.reduceFactor;

            if (!colorAnimation.sync) {
                this.color.velocity *= Math.random();
            }
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
        this.strokeColor = {
            value: ColorUtils.colorToHsl(this.stroke.color) ?? this.color.value,
        };

        if (typeof this.stroke.color !== "string") {
            const strokeColorAnimation = this.stroke.color?.animation;

            if (strokeColorAnimation && this.strokeColor) {
                if (strokeColorAnimation.enable) {
                    this.strokeColor.velocity = (strokeColorAnimation.speed / 100) * container.retina.reduceFactor;

                    if (!strokeColorAnimation.sync) {
                        this.strokeColor.velocity = this.strokeColor.velocity * Math.random();
                    }
                } else {
                    this.strokeColor.velocity = 0;
                }

                if (strokeColorAnimation.enable && !strokeColorAnimation.sync && this.strokeColor.value) {
                    this.strokeColor.value.h = Math.random() * 360;
                }
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

        this.shadowColor = ColorUtils.colorToRgb(this.options.shadow.color);
        this.infecter = new Infecter(container);
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
        return this.bubble.color ?? this.color.value;
    }

    public getStrokeColor(): IHsl | undefined {
        return this.bubble.color ?? this.strokeColor.value ?? this.color.value;
    }

    /**
     * This destroys the particle just before it's been removed from the canvas and the container
     */
    public destroy(override?: boolean): void {
        if (this.unbreaking) {
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

    private calcPosition(container: Container, position: ICoordinates | undefined, zIndex: number): ICoordinates3d {
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
                        image.element = img2?.element;

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
