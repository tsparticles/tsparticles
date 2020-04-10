import {Bubbler} from "./Particle/Bubbler";
import type {Container} from "./Container";
import {Drawer} from "./Particle/Drawer";
import {Grabber} from "./Particle/Grabber";
import type {IVelocity} from "../Interfaces/IVelocity";
import type {ISize} from "../Interfaces/ISize";
import type {IOpacity} from "../Interfaces/IOpacity";
import type {ICoordinates} from "../Interfaces/ICoordinates";
import type {IParticleImage} from "../Interfaces/IParticleImage";
import {Repulser} from "./Particle/Repulser";
import {ShapeType} from "../Enums/ShapeType";
import {Updater} from "./Particle/Updater";
import {Utils} from "./Utils/Utils";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Connecter} from "./Particle/Connecter";
import type {IRgb} from "../Interfaces/IRgb";
import type {IOptions} from "../Interfaces/Options/IOptions";
import {InteractionManager} from "./Particle/InteractionManager";
import {HoverMode} from "../Enums/Modes/HoverMode";
import {ClickMode} from "../Enums/Modes/ClickMode";
import {RotateDirection} from "../Enums/RotateDirection";
import type {ICharacterShape} from "../Interfaces/Options/Particles/Shape/ICharacterShape";
import type {IPolygonShape} from "../Interfaces/Options/Particles/Shape/IPolygonShape";
import type {IStroke} from "../Interfaces/Options/Particles/IStroke";
import {ColorUtils} from "./Utils/ColorUtils";
import type {IRandomSize} from "../Interfaces/Options/Particles/IRandomSize";
import type {IRandomOpacity} from "../Interfaces/Options/Particles/IRandomOpacity";
import {IParticle} from "../Interfaces/IParticle";
import {IShapeValues} from "../Interfaces/Options/Particles/Shape/IShapeValues";

/**
 * The single particle object
 */
export class Particle implements IParticle {
    public angle: number;
    public rotateDirection: RotateDirection;
    public radius: number;
    public readonly fill: boolean;
    public readonly close: boolean;
    public readonly stroke: IStroke;
    public readonly polygon?: IPolygonShape;
    public readonly text?: string;
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
    public readonly character?: ICharacterShape;
    public readonly initialVelocity: IVelocity;
    public readonly shapeData?: IShapeValues;

    public readonly updater: Updater;
    public readonly bubbler: Bubbler;
    public readonly repulser: Repulser;
    public readonly connecter: Connecter;
    public readonly drawer: Drawer;
    public readonly grabber: Grabber;
    public readonly interactionManager: InteractionManager;
    public readonly container: Container;

    /* --------- tsParticles functions - particles ----------- */
    constructor(container: Container, position?: ICoordinates) {
        this.container = container;
        const options = container.options;
        const color = options.particles.color;

        /* size */
        this.size = {};
        this.angle = options.particles.rotate.random ? Math.random() * 360 : options.particles.rotate.value;

        if (options.particles.rotate.direction == RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            if (index > 0) {
                this.rotateDirection = RotateDirection.counterClockwise;
            } else {
                this.rotateDirection = RotateDirection.clockwise;
            }
        } else {
            this.rotateDirection = options.particles.rotate.direction;
        }

        const randomSize = options.particles.size.random as IRandomSize;
        const sizeValue = container.retina.sizeValue;

        this.radius = randomSize.enable ? Utils.randomInRange(randomSize.minimumValue, sizeValue) : sizeValue;

        if (options.particles.size.animation.enable) {
            this.size.status = false;
            this.size.velocity = container.retina.sizeAnimationSpeed / 100;

            if (!options.particles.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }

        if (options.particles.rotate.animation.enable) {
            if (!options.particles.rotate.animation.sync) {
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
        if (options.particles.move.collisions) {
            this.checkOverlap(position);
        }

        /* color */
        if (color instanceof Array) {
            this.color = ColorUtils.colorToRgb(Utils.itemFromArray(color));
        } else {
            this.color = ColorUtils.colorToRgb(color);
        }

        /* opacity */
        const randomOpacity = options.particles.opacity.random as IRandomOpacity;
        const opacityValue = options.particles.opacity.value;

        this.opacity = {
            value: randomOpacity.enable ? Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue,
        };

        if (options.particles.opacity.animation.enable) {
            this.opacity.status = false;
            this.opacity.velocity = options.particles.opacity.animation.speed / 100;

            if (!options.particles.opacity.animation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

        /* animation - velocity for speed */
        this.initialVelocity = Particle.calculateVelocity(options);
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };

        this.fill = true;
        this.close = true;

        /* if shape is image */
        const shapeType = options.particles.shape.type;

        if (shapeType instanceof Array) {
            this.shape = Utils.itemFromArray(shapeType);
        } else {
            this.shape = shapeType;
        }

        if (this.shape === ShapeType.image) {
            const shape = options.particles.shape;
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

        if (this.shape === ShapeType.polygon) {
            if (options.particles.shape.polygon instanceof Array) {
                this.polygon = Utils.itemFromArray(options.particles.shape.polygon);
            } else {
                this.polygon = options.particles.shape.polygon;
            }

            this.fill = this.polygon.fill ?? this.fill;
            this.close = this.polygon.close ?? this.close;
        }

        if (options.particles.stroke instanceof Array) {
            this.stroke = Utils.itemFromArray(options.particles.stroke);
        } else {
            this.stroke = options.particles.stroke;
        }

        this.strokeColor = typeof this.stroke.color === "string" ?
            ColorUtils.stringToRgb(this.stroke.color) :
            ColorUtils.colorToRgb(this.stroke.color);

        this.shadowColor = typeof options.particles.shadow.color === "string" ?
            ColorUtils.stringToRgb(options.particles.shadow.color) :
            ColorUtils.colorToRgb(options.particles.shadow.color);

        if (this.shape === ShapeType.char || this.shape === ShapeType.character) {
            if (options.particles.shape.character instanceof Array) {
                this.character = Utils.itemFromArray(options.particles.shape.character);
            } else {
                this.character = options.particles.shape.character;
            }

            const value = this.character.value;

            this.text = value instanceof Array ? Utils.itemFromArray(value) : value;

            this.fill = this.character.fill ?? this.fill;
            this.close = this.character.close ?? this.close;
        }

        const shapeData = options.particles.shape.custom[this.shape];

        if (shapeData) {
            this.shapeData = shapeData instanceof Array ? Utils.itemFromArray(shapeData) : shapeData;

            this.fill = this.shapeData.fill ?? this.fill;
            this.close = this.shapeData.close ?? this.close;
        }

        this.updater = new Updater(this.container, this);
        this.bubbler = new Bubbler(this.container, this);
        this.repulser = new Repulser(this.container, this);
        this.drawer = new Drawer(this.container, this);
        this.grabber = new Grabber(this.container, this);
        this.connecter = new Connecter(this.container, this);
        this.interactionManager = new InteractionManager(this.container, this);
    }

    private static calculateVelocity(options: IOptions): IVelocity {
        const baseVelocity = Utils.getParticleBaseVelocity(options);
        const res = {
            horizontal: 0,
            vertical: 0,
        };

        if (options.particles.move.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;

            if (options.particles.move.random) {
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

    public resetVelocity(): void {
        const container = this.container;
        const options = container.options;
        const velocity = Particle.calculateVelocity(options);

        this.velocity.horizontal = velocity.horizontal;
        this.velocity.vertical = velocity.vertical;
    }

    public update(index: number, delta: number): void {
        const container = this.container;
        const options = container.options;

        this.updater.update(delta);

        const hoverMode = options.interactivity.events.onHover.mode;
        const clickMode = options.interactivity.events.onClick.mode;

        /* events */
        if (Utils.isInArray(HoverMode.grab, hoverMode)) {
            this.grabber.grab();
        }

        //  New interactivity `connect` which would just connect the particles on hover

        if (Utils.isInArray(HoverMode.connect, options.interactivity.events.onHover.mode)) {
            for (let j = index + 1; j < container.particles.count; j++) {
                const p2 = container.particles.array[j];
                this.connecter.connect(p2);
            }
        }

        if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.bubbler.bubble();
        }

        if (Utils.isInArray(HoverMode.repulse, hoverMode) || Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.repulser.repulse();
        }
    }

    public interact(p2: Particle): void {
        this.interactionManager.interact(p2);
    }

    public draw(): void {
        this.drawer.draw();
    }

    public isOverlapping(): { collisionFound: boolean, iterations: number } {
        const container = this.container;
        const p = this;
        let collisionFound = false;
        let iterations = 0;

        for (const p2 of container.particles.array.filter((t) => t != p)) {
            iterations++;
            const dist = Utils.getDistanceBetweenCoordinates(p.position, p2.position);

            if (dist <= p.radius + p2.radius) {
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
            p.position.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            p.position.y = position ? position.y : Math.random() * container.canvas.dimension.height;

            p.checkOverlap();
        }
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        const pos = {x: 0, y: 0};
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
            pos.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            pos.y = position ? position.y : Math.random() * container.canvas.dimension.height;

            /* check position  - into the canvas */
            if (pos.x > container.canvas.dimension.width - this.radius * 2) {
                pos.x -= this.radius;
            } else if (pos.x < this.radius * 2) {
                pos.x += this.radius;
            }

            if (pos.y > container.canvas.dimension.height - this.radius * 2) {
                pos.y -= this.radius;
            } else if (pos.y < this.radius * 2) {
                pos.y += this.radius;
            }
        }

        return pos;
    }
}
