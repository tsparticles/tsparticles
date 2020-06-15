import type { Container } from "./Container";
import type { IVelocity } from "./Interfaces/IVelocity";
import type { IParticleSizeAnimation } from "./Interfaces/IParticleSizeAnimation";
import type { IParticleOpacityAnimation } from "./Interfaces/IParticleOpacityAnimation";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticleImage } from "./Interfaces/IParticleImage";
import { Updater } from "./Particle/Updater";
import type { IRgb } from "./Interfaces/IRgb";
import type { IStroke } from "../Options/Interfaces/Particles/IStroke";
import type { IOpacityRandom } from "../Options/Interfaces/Particles/Opacity/IOpacityRandom";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./Interfaces/IBubbleParticleData";
import type { IParticle } from "./Interfaces/IParticle";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { Particles } from "../Options/Classes/Particles/Particles";
import { Shape } from "../Options/Classes/Particles/Shape/Shape";
import {
    MoveDirection,
    OpacityAnimationStatus,
    OutMode,
    RotateDirection,
    ShapeType,
    SizeAnimationStatus,
    StartValueType,
} from "../Enums";
import { ImageDrawer } from "../ShapeDrawers/ImageDrawer";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import { RecursivePartial } from "../Types/RecursivePartial";
import type { ILink } from "./Interfaces/ILink";
import type { IHsl } from "./Interfaces/IHsl";
import { ColorUtils, Plugins, Utils } from "../Utils";

/**
 * The single particle object
 */
export class Particle implements IParticle {
    public angle: number;
    public destroyed: boolean;
    public rotateDirection: RotateDirection;
    public randomIndexData?: number;
    public links: ILink[];
    public readonly close: boolean;
    public readonly direction: MoveDirection;
    public readonly fill: boolean;
    public readonly stroke: IStroke;
    public readonly size: IParticleSizeAnimation;
    public infectionStage?: number;
    public infectionTime?: number;
    public infectionDelay?: number;
    public infectionDelayStage?: number;
    public readonly position: ICoordinates;
    public readonly offset: ICoordinates;
    public readonly color: IHsl | undefined;
    public readonly strokeColor: IRgb | undefined;
    public readonly shadowColor: IRgb | undefined;
    public readonly opacity: IParticleOpacityAnimation;
    public readonly velocity: IVelocity;
    public readonly shape: ShapeType | string;
    public readonly image?: IParticleImage;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;
    public readonly bubble: IBubbleParticleData;
    public readonly noiseDelay: number;
    public readonly colorVelocity: number;
    public lastNoiseTime: number;
    public linksDistance?: number;
    public linksWidth?: number;
    public moveSpeed?: number;
    public sizeValue?: number;
    public randomMinimumSize?: number;
    public sizeAnimationSpeed?: number;

    public readonly updater: Updater;

    /* --------- tsParticles functions - particles ----------- */
    public readonly particlesOptions: IParticles;

    private infectionTimeout?: number;

    constructor(
        private readonly container: Container,
        position?: ICoordinates,
        overrideOptions?: RecursivePartial<IParticles>
    ) {
        this.fill = true;
        this.close = true;
        this.links = [];
        this.lastNoiseTime = 0;
        this.destroyed = false;

        const options = container.options;
        const particlesOptions = new Particles();

        particlesOptions.load(options.particles);

        if (overrideOptions?.shape !== undefined) {
            const shapeType = overrideOptions.shape.type ?? particlesOptions.shape.type;

            this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType) : shapeType;

            const shapeOptions = new Shape();

            shapeOptions.load(overrideOptions.shape);

            if (this.shape !== undefined) {
                const shapeData = shapeOptions.options[this.shape];

                if (shapeData !== undefined) {
                    this.shapeData = Utils.deepExtend(
                        {},
                        shapeData instanceof Array ? Utils.itemFromArray(shapeData) : shapeData
                    );

                    this.fill = this.shapeData?.fill ?? this.fill;
                    this.close = this.shapeData?.close ?? this.close;
                }
            }
        } else {
            const shapeType = particlesOptions.shape.type;

            this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType) : shapeType;

            const shapeData = particlesOptions.shape.options[this.shape];

            if (shapeData) {
                this.shapeData = Utils.deepExtend(
                    {},
                    shapeData instanceof Array ? Utils.itemFromArray(shapeData) : shapeData
                );

                this.fill = this.shapeData?.fill ?? this.fill;
                this.close = this.shapeData?.close ?? this.close;
            }
        }

        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }

        if (this.shapeData?.particles !== undefined) {
            particlesOptions.load(this.shapeData?.particles);
        }

        this.particlesOptions = particlesOptions;

        const noiseDelay = this.particlesOptions.move.noise.delay;

        this.noiseDelay =
            (noiseDelay.random.enable
                ? Utils.randomInRange(noiseDelay.random.minimumValue, noiseDelay.value)
                : noiseDelay.value) * 1000;

        container.retina.initParticle(this);

        const color = this.particlesOptions.color;

        /* size */
        const sizeValue = this.sizeValue ?? container.retina.sizeValue;

        const randomSize =
            typeof this.particlesOptions.size.random === "boolean"
                ? this.particlesOptions.size.random
                : this.particlesOptions.size.random.enable;

        this.size = {
            value:
                randomSize && this.randomMinimumSize !== undefined
                    ? Utils.randomInRange(this.randomMinimumSize, sizeValue)
                    : sizeValue,
        };

        this.direction = this.particlesOptions.move.direction;
        this.bubble = {
            inRange: false,
        };
        this.angle = this.particlesOptions.rotate.random ? Math.random() * 360 : this.particlesOptions.rotate.value;

        if (this.particlesOptions.rotate.direction === RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            if (index > 0) {
                this.rotateDirection = RotateDirection.counterClockwise;
            } else {
                this.rotateDirection = RotateDirection.clockwise;
            }
        } else {
            this.rotateDirection = this.particlesOptions.rotate.direction;
        }

        if (this.particlesOptions.size.animation.enable) {
            switch (this.particlesOptions.size.animation.startValue) {
                case StartValueType.min:
                    if (!randomSize) {
                        const pxRatio = container.retina.pixelRatio;

                        this.size.value = this.particlesOptions.size.animation.minimumValue * pxRatio;
                    }

                    break;
            }

            this.size.status = SizeAnimationStatus.increasing;
            this.size.velocity = (this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100;

            if (!this.particlesOptions.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }

        if (this.particlesOptions.color.animation.enable) {
            this.colorVelocity = this.particlesOptions.color.animation.speed / 100;

            if (!this.particlesOptions.color.animation.sync) {
                this.colorVelocity = this.colorVelocity * Math.random();
            }
        } else {
            this.colorVelocity = 0;
        }

        if (this.particlesOptions.rotate.animation.enable) {
            if (!this.particlesOptions.rotate.animation.sync) {
                this.angle = Math.random() * 360;
            }
        }

        /* position */
        this.position = this.calcPosition(this.container, position);

        /* parallax */
        this.offset = {
            x: 0,
            y: 0,
        };

        /* check position - avoid overlap */
        if (this.particlesOptions.collisions.enable) {
            this.checkOverlap(position);
        }

        /* color */
        this.color = ColorUtils.colorToHsl(color);

        /* opacity */
        const randomOpacity = this.particlesOptions.opacity.random as IOpacityRandom;
        const opacityValue = this.particlesOptions.opacity.value;

        this.opacity = {
            value: randomOpacity.enable ? Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue,
        };

        if (this.particlesOptions.opacity.animation.enable) {
            this.opacity.status = OpacityAnimationStatus.increasing;
            this.opacity.velocity = this.particlesOptions.opacity.animation.speed / 100;

            if (!this.particlesOptions.opacity.animation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

        /* animation - velocity for speed */
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };

        let drawer = container.drawers.get(this.shape);

        if (!drawer) {
            drawer = Plugins.getShapeDrawer(this.shape);

            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }

        /* if shape is image */
        if (this.shape === ShapeType.image || this.shape === ShapeType.images) {
            const shape = this.particlesOptions.shape;
            const imageDrawer = drawer as ImageDrawer;
            const imagesOptions = shape.options[this.shape];
            const images = imageDrawer.getImages(container).images;
            const index = Utils.arrayRandomIndex(images);
            const image = images[index];
            const optionsImage = (imagesOptions instanceof Array
                ? imagesOptions.filter((t) => (t as IImageShape).src === image.source)[0]
                : imagesOptions) as IImageShape;

            const color = this.getColor();

            if (image?.svgData !== undefined && optionsImage.replaceColor && color) {
                const svgColoredData = Utils.replaceColorSvg(image, color, this.opacity.value);

                /* prepare to create img with colored svg */
                const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
                const domUrl = window.URL || window.webkitURL || window;
                const url = domUrl.createObjectURL(svg);

                /* create particle img obj */
                const img = new Image();

                this.image = {
                    data: image,
                    loaded: false,
                    ratio: optionsImage.width / optionsImage.height,
                    replaceColor: optionsImage.replaceColor ?? optionsImage.replace_color,
                    source: optionsImage.src,
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

                    Utils.loadImage(optionsImage.src).then((img2) => {
                        if (this.image) {
                            image.element = img2.element;
                            this.image.loaded = true;
                        }
                    });
                });

                img.src = url;
            } else {
                this.image = {
                    data: image,
                    loaded: true,
                    ratio: optionsImage.width / optionsImage.height,
                    replaceColor: optionsImage.replaceColor ?? optionsImage.replace_color,
                    source: optionsImage.src,
                };
            }

            if (!this.image.ratio) {
                this.image.ratio = 1;
            }

            this.fill = optionsImage.fill ?? this.fill;
            this.close = optionsImage.close ?? this.close;
        }

        this.stroke =
            this.particlesOptions.stroke instanceof Array
                ? Utils.itemFromArray(this.particlesOptions.stroke)
                : this.particlesOptions.stroke;

        this.strokeColor = ColorUtils.colorToRgb(this.stroke.color);
        this.shadowColor = ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
        this.updater = new Updater(this.container, this);
    }

    public update(delta: number): void {
        this.links = [];

        this.updater.update(delta);
    }

    public draw(delta: number): void {
        if (this.image?.loaded === false) {
            return;
        }

        this.container.canvas.drawParticle(this, delta);
    }

    public isOverlapping(): { collisionFound: boolean; iterations: number } {
        const container = this.container;

        let collisionFound = false;
        let iterations = 0;

        const pos1 = this.getPosition();

        for (const p2 of container.particles.array.filter((t) => t != this)) {
            iterations++;
            const pos2 = p2.getPosition();
            const dist = Utils.getDistance(pos1, pos2);

            if (dist <= this.size.value + p2.size.value) {
                collisionFound = true;
                break;
            }
        }

        return {
            collisionFound: collisionFound,
            iterations: iterations,
        };
    }

    public checkOverlap(position?: ICoordinates): void {
        const container = this.container;
        const overlapResult = this.isOverlapping();

        if (overlapResult.iterations >= container.particles.count) {
            // too many particles, removing from the current
            container.particles.remove(this);
        } else if (overlapResult.collisionFound) {
            this.position.x = position ? position.x : Math.random() * container.canvas.size.width;
            this.position.y = position ? position.y : Math.random() * container.canvas.size.height;

            this.checkOverlap();
        }
    }

    public startInfection(stage: number): void {
        const container = this.container;
        const options = container.options;
        const stages = options.infection.stages;
        const stagesCount = stages.length;

        if (stage > stagesCount || stage < 0) {
            return;
        }

        this.infectionDelay = 0;
        this.infectionDelayStage = stage;
    }

    public updateInfectionStage(stage: number): void {
        const container = this.container;
        const options = container.options;
        const stagesCount = options.infection.stages.length;

        if (stage > stagesCount || stage < 0 || (this.infectionStage !== undefined && this.infectionStage > stage)) {
            return;
        }

        if (this.infectionTimeout !== undefined) {
            window.clearTimeout(this.infectionTimeout);
        }

        this.infectionStage = stage;
        this.infectionTime = 0;
    }

    public updateInfection(delta: number): void {
        const container = this.container;
        const options = container.options;
        const infection = options.infection;
        const stages = options.infection.stages;
        const stagesCount = stages.length;

        if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
            const stage = this.infectionDelayStage;

            if (stage > stagesCount || stage < 0) {
                return;
            }

            if (this.infectionDelay > infection.delay * 1000) {
                this.infectionStage = stage;
                this.infectionTime = 0;

                delete this.infectionDelay;
                delete this.infectionDelayStage;
            } else {
                this.infectionDelay += delta;
            }
        } else {
            delete this.infectionDelay;
            delete this.infectionDelayStage;
        }

        if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
            const infectionStage = stages[this.infectionStage];

            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (this.infectionTime > infectionStage.duration * 1000) {
                    this.nextInfectionStage();
                } else {
                    this.infectionTime += delta;
                }
            } else {
                this.infectionTime += delta;
            }
        } else {
            delete this.infectionStage;
            delete this.infectionTime;
        }
    }

    public getPosition(): ICoordinates {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }

    public getColor(): IHsl | undefined {
        return this.bubble.color ?? this.color;
    }

    public destroy(): void {
        this.destroyed = true;
    }

    private nextInfectionStage(): void {
        const container = this.container;
        const options = container.options;
        const stagesCount = options.infection.stages.length;

        if (stagesCount <= 0 || this.infectionStage === undefined) {
            return;
        }

        this.infectionTime = 0;

        if (stagesCount <= ++this.infectionStage) {
            if (options.infection.cure) {
                delete this.infectionStage;
                delete this.infectionTime;
                return;
            } else {
                this.infectionStage = 0;
                this.infectionTime = 0;
            }
        }
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        for (const [, plugin] of container.plugins) {
            const pluginPos =
                plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

            if (pluginPos !== undefined) {
                return Utils.deepExtend({}, pluginPos);
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
        const baseVelocity = Utils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.particlesOptions.move;
        const rad = (Math.PI / 180) * moveOptions.angle;
        const rad45 = Math.PI / 4;
        const range = {
            left: Math.sin(rad45 + rad / 2) - Math.sin(rad45 - rad / 2),
            right: Math.cos(rad45 + rad / 2) - Math.cos(rad45 - rad / 2),
        };

        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;

            if (moveOptions.random) {
                res.horizontal += Utils.randomInRange(range.left, range.right) / 2;
                res.vertical += Utils.randomInRange(range.left, range.right) / 2;
            }
        } else {
            res.horizontal = baseVelocity.x + Utils.randomInRange(range.left, range.right) / 2;
            res.vertical = baseVelocity.y + Utils.randomInRange(range.left, range.right) / 2;
        }

        // const theta = 2.0 * Math.PI * Math.random();

        // res.x = Math.cos(theta);
        // res.y = Math.sin(theta);

        return res;
    }
}
