import type { Container } from "./Container";
import type { IVelocity } from "../Interfaces/IVelocity";
import type { ISize } from "../Interfaces/ISize";
import type { IOpacity } from "../Interfaces/IOpacity";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IParticleImage } from "../Interfaces/IParticleImage";
import { ShapeType } from "../Enums/ShapeType";
import { Updater } from "./Particle/Updater";
import { Utils } from "./Utils/Utils";
import { PolygonMaskType } from "../Enums/PolygonMaskType";
import type { IRgb } from "../Interfaces/IRgb";
import { RotateDirection } from "../Enums/RotateDirection";
import type { IStroke } from "../Interfaces/Options/Particles/IStroke";
import { ColorUtils } from "./Utils/ColorUtils";
import type { IOpacityRandom } from "../Interfaces/Options/Particles/Opacity/IOpacityRandom";
import type { IShapeValues } from "../Interfaces/Options/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "../Interfaces/IBubbleParticleData";
import type { IParticle } from "../Interfaces/IParticle";
import { Emitter } from "./Emitter";
import { MoveDirection } from "../Enums/MoveDirection";
import type { IParticles } from "../Interfaces/Options/Particles/IParticles";
import { Particles } from "./Options/Particles/Particles";
import { SizeAnimationStatus } from "../Enums/SizeAnimationStatus";
import { OpacityAnimationStatus } from "../Enums/OpacityAnimationStatus";
import { Shape } from "./Options/Particles/Shape/Shape";

/**
 * The single particle object
 */
export class Particle implements IParticle {
    public angle: number;
    public rotateDirection: RotateDirection;
    public randomIndexData?: number;
    public links: IParticle[];
    public readonly close: boolean;
    public readonly direction: MoveDirection;
    public readonly fill: boolean;
    public readonly stroke: IStroke;
    public readonly size: ISize;
    public readonly initialPosition?: ICoordinates;
    public readonly position: ICoordinates;
    public readonly offset: ICoordinates;
    public readonly color: IRgb | undefined;
    public readonly strokeColor: IRgb | undefined;
    public readonly shadowColor: IRgb | undefined;
    public readonly opacity: IOpacity;
    public readonly velocity: IVelocity;
    public readonly shape?: ShapeType | string;
    public readonly image?: IParticleImage;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;
    public readonly bubble: IBubbleParticleData;
    public lineLinkedDistance?: number;
    public lineLinkedWidth?: number;
    public moveSpeed?: number;
    public sizeValue?: number;
    public randomMinimumSize?: number;
    public sizeAnimationSpeed?: number;

    public readonly updater: Updater;
    public readonly container: Container;
    public readonly emitter?: Emitter;

    /* --------- tsParticles functions - particles ----------- */
    public readonly particlesOptions: IParticles;

    constructor(container: Container, position?: ICoordinates, emitter?: Emitter) {
        this.container = container;
        this.emitter = emitter;
        this.fill = true;
        this.close = true;
        this.links = [];

        const options = container.options;
        const particlesOptions = new Particles();

        particlesOptions.load(options.particles);

        if (emitter?.emitterOptions?.particles?.shape !== undefined) {
            const shapeType = emitter.emitterOptions.particles.shape.type;

            this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType) : shapeType;

            const shapeOptions = new Shape();

            shapeOptions.load(emitter.emitterOptions.particles.shape);

            if (this.shape !== undefined) {
                const shapeData = shapeOptions.options[this.shape];

                if (shapeData !== undefined) {
                    this.shapeData = Utils.deepExtend({}, shapeData instanceof Array ?
                        Utils.itemFromArray(shapeData) :
                        shapeData);

                    this.fill = this.shapeData?.fill ?? this.fill;
                    this.close = this.shapeData?.close ?? this.close;
                }
            }
        } else {
            const shapeType = particlesOptions.shape.type;

            this.shape = shapeType instanceof Array ? Utils.itemFromArray(shapeType) : shapeType;

            const shapeData = particlesOptions.shape.options[this.shape];

            if (shapeData) {
                this.shapeData = Utils.deepExtend({}, shapeData instanceof Array ?
                    Utils.itemFromArray(shapeData) :
                    shapeData);

                this.fill = this.shapeData?.fill ?? this.fill;
                this.close = this.shapeData?.close ?? this.close;
            }
        }

        if (emitter?.emitterOptions?.particles !== undefined) {
            particlesOptions.load(emitter.emitterOptions.particles);
        }

        particlesOptions.load(this.shapeData?.particles);

        this.particlesOptions = particlesOptions;

        container.retina.initParticle(this);

        const color = this.particlesOptions.color;

        /* size */
        const sizeValue = (this.sizeValue ?? container.retina.sizeValue);

        const randomSize = typeof this.particlesOptions.size.random === "boolean" ?
            this.particlesOptions.size.random :
            this.particlesOptions.size.random.enable;

        this.size = {
            value: randomSize && this.randomMinimumSize !== undefined ?
                Utils.randomInRange(this.randomMinimumSize, sizeValue) * this.container.retina.pixelRatio :
                sizeValue,
        };

        this.direction = emitter ? emitter.emitterOptions.direction : this.particlesOptions.move.direction;
        this.bubble = {};
        this.angle = this.particlesOptions.rotate.random ? Math.random() * 360 : this.particlesOptions.rotate.value;

        if (this.particlesOptions.rotate.direction == RotateDirection.random) {
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
            this.size.status = SizeAnimationStatus.increasing;
            this.size.velocity = (this.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100;

            if (!this.particlesOptions.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }

        if (this.particlesOptions.rotate.animation.enable) {
            if (!this.particlesOptions.rotate.animation.sync) {
                this.angle = Math.random() * 360;
            }
        }

        /* position */
        this.position = this.calcPosition(this.container, position);

        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
            this.initialPosition = {
                x: this.position.x,
                y: this.position.y,
            };
        }

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
        if (color instanceof Array) {
            this.color = ColorUtils.colorToRgb(Utils.itemFromArray(color));
        } else {
            this.color = ColorUtils.colorToRgb(color);
        }

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

        /* if shape is image */
        if (this.shape === ShapeType.image || this.shape === ShapeType.images) {
            const shape = this.particlesOptions.shape;
            const index = Utils.arrayRandomIndex(container.images);
            const image = container.images[index];
            const optionsImage = shape.image instanceof Array ? shape.image[index] : shape.image;

            this.image = {
                data: image,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: optionsImage.replaceColor,
                src: optionsImage.src,
            };

            if (!this.image.ratio) {
                this.image.ratio = 1;
            }

            this.fill = optionsImage.fill ?? this.fill;
            this.close = optionsImage.close ?? this.close;
        }

        this.stroke = this.particlesOptions.stroke instanceof Array ?
            Utils.itemFromArray(this.particlesOptions.stroke) :
            this.particlesOptions.stroke;

        this.strokeColor = typeof this.stroke.color === "string" ?
            ColorUtils.stringToRgb(this.stroke.color) :
            ColorUtils.colorToRgb(this.stroke.color);

        this.shadowColor = typeof this.particlesOptions.shadow.color === "string" ?
            ColorUtils.stringToRgb(this.particlesOptions.shadow.color) :
            ColorUtils.colorToRgb(this.particlesOptions.shadow.color);

        this.updater = new Updater(this.container, this);
    }

    public update(index: number, delta: number): void {
        this.links = [];

        this.updater.update(delta);
    }

    public draw(): void {
        this.container.canvas.drawParticle(this);
    }

    public isOverlapping(): { collisionFound: boolean, iterations: number } {
        const container = this.container;
        const p = this;
        let collisionFound = false;
        let iterations = 0;

        for (const p2 of container.particles.array.filter((t) => t != p)) {
            iterations++;
            const pos1 = {
                x: p.position.x + p.offset.x,
                y: p.position.y + p.offset.y
            };
            const pos2 = {
                x: p2.position.x + p2.offset.x,
                y: p2.position.y + p2.offset.y
            };

            const dist = Utils.getDistanceBetweenCoordinates(pos1, pos2);

            if (dist <= p.size.value + p2.size.value) {
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
        const p = this;
        const overlapResult = p.isOverlapping();

        if (overlapResult.iterations >= container.particles.count) {
            // too many particles, removing from the current
            container.particles.remove(this);
        } else if (overlapResult.collisionFound) {
            p.position.x = position ? position.x : Math.random() * container.canvas.size.width;
            p.position.y = position ? position.y : Math.random() * container.canvas.size.height;

            p.checkOverlap();
        }
    }

    public destroy(): void {
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        const pos = { x: 0, y: 0 };
        const options = container.options;

        if (options.polygon.enable && (container.polygon.raw?.length ?? 0) > 0) {
            if (position) {
                pos.x = position.x;
                pos.y = position.y;
            } else {
                const randomPoint = container.polygon.randomPointInPolygon();

                pos.x = randomPoint.x;
                pos.y = randomPoint.y;
            }
        } else {
            pos.x = position ? position.x : Math.random() * container.canvas.size.width;
            pos.y = position ? position.y : Math.random() * container.canvas.size.height;

            /* check position  - into the canvas */
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            } else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }

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

        if (this.particlesOptions.move.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;

            if (this.particlesOptions.move.random) {
                res.horizontal *= Math.random();
                res.vertical *= Math.random();
            }
        } else {
            res.horizontal = baseVelocity.x + Math.random() - 0.5;
            res.vertical = baseVelocity.y + Math.random() - 0.5;
        }

        // const theta = 2.0 * Math.PI * Math.random();

        // res.x = Math.cos(theta);
        // res.y = Math.sin(theta);

        return res;
    }
}
