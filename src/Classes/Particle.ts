"use strict";

import {Bubbler} from "./Particle/Bubbler";
import {Container} from "./Container";
import {Drawer} from "./Particle/Drawer";
import {Grabber} from "./Particle/Grabber";
import {IVelocity} from "../Interfaces/IVelocity";
import {ISize} from "../Interfaces/ISize";
import {IOpacity} from "../Interfaces/IOpacity";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {IParticleImage} from "../Interfaces/IParticleImage";
import {Repulser} from "./Particle/Repulser";
import {ShapeType} from "../Enums/ShapeType";
import {Updater} from "./Particle/Updater";
import {Utils} from "./Utils/Utils";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Connecter} from "./Particle/Connecter";
import {IRgb} from "../Interfaces/IRgb";
import {IOptions} from "../Interfaces/Options/IOptions";
import {InteractionManager} from "./Particle/InteractionManager";
import {HoverMode} from "../Enums/Modes/HoverMode";
import {ClickMode} from "../Enums/Modes/ClickMode";

/**
 * The single particle object
 */
export class Particle {
    public radius: number;
    public size: ISize;
    public initialPosition?: ICoordinates;
    public position: ICoordinates;
    public offset: ICoordinates;
    public color: IRgb | null;
    public opacity: IOpacity;
    public velocity: IVelocity;
    public shape?: ShapeType;
    public image?: IParticleImage;
    public readonly initialVelocity: IVelocity;

    private readonly _updater: Updater;
    private readonly _bubbler: Bubbler;
    private readonly _repulser: Repulser;
    private readonly _connecter: Connecter;
    private readonly _drawer: Drawer;
    private readonly _grabber: Grabber;
    private readonly _interactionManager: InteractionManager;
    private readonly _container: Container;

    /* --------- tsParticles functions - particles ----------- */
    constructor(container: Container, position?: ICoordinates) {
        this._container = container;
        const options = container.options;
        const color = options.particles.color;

        if (options.polygon.type === PolygonMaskType.inline) {
            this.initialPosition = position;
        }

        /* size */
        this.size = {};
        this.radius = (options.particles.size.random ? Math.random() : 1) * container.retina.sizeValue;

        if (options.particles.size.animation.enable) {
            this.size.status = false;
            this.size.velocity = container.retina.sizeAnimationSpeed / 100;

            if (!options.particles.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }

        /* position */
        this.position = this.calcPosition(this._container, position);

        /* parallax */
        this.offset = {
            x: 0,
            y: 0,
        };

        /* check position - avoid overlap */
        if (options.particles.move.bounce) {
            this.checkOverlap(position);
        }

        /* color */
        this.color = Utils.getParticleColor(options, color);

        /* opacity */
        this.opacity = {
            value: (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value,
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

        /* if shape is image */
        const shapeType = options.particles.shape.type;

        if (shapeType instanceof Array) {
            this.shape = shapeType[Math.floor(Math.random() * shapeType.length)];
        } else {
            this.shape = shapeType;
        }

        if (this.shape === ShapeType.image) {
            const shape = options.particles.shape;
            const index = Math.floor(Math.random() * container.images.length);
            const image = container.images[index];
            const optionsImage = shape.image instanceof Array ? shape.image[index] : shape.image;
            this.image = {
                data: image,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: optionsImage.replace_color,
                src: optionsImage.src,
            };

            if (!this.image.ratio) {
                this.image.ratio = 1;
            }
        }

        this._updater = new Updater(this._container, this);
        this._bubbler = new Bubbler(this._container, this);
        this._repulser = new Repulser(this._container, this);
        this._drawer = new Drawer(this._container, this, this._bubbler);
        this._grabber = new Grabber(this._container, this);
        this._connecter = new Connecter(this._container, this);
        this._interactionManager = new InteractionManager(this._container, this);
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

    public update(index: number, delta: number): void {
        const container = this._container;
        const options = container.options;

        this._updater.update(delta);

        const hoverMode = options.interactivity.events.onHover.mode;
        const clickMode = options.interactivity.events.onClick.mode;

        /* events */
        if (Utils.isInArray(HoverMode.grab, hoverMode)) {
            this._grabber.grab();
        }

        //  New interactivity `connect` which would just connect the particles on hover

        if (Utils.isInArray(HoverMode.connect, options.interactivity.events.onHover.mode)) {
            for (let j = index + 1; j < container.particles.array.length; j++) {
                const p2 = container.particles.array[j];
                this._connecter.connect(p2);
            }
        }

        if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode)) {
            this._bubbler.bubble();
        }

        if (Utils.isInArray(HoverMode.repulse, hoverMode) || Utils.isInArray(ClickMode.repulse, clickMode)) {
            this._repulser.repulse();
        }
    }

    public interact(p2: Particle): void {
        this._interactionManager.interact(p2);
    }

    public draw(): void {
        this._drawer.draw();
    }

    public checkOverlap(position?: ICoordinates): void {
        const container = this._container;
        const p = this;

        for (const p2 of container.particles.array) {
            const dist = Utils.getDistanceBetweenCoordinates(p.position, p2.position);

            if (dist <= p.radius + p2.radius) {
                p.position.x = position ? position.x : Math.random() * container.canvas.dimension.width;
                p.position.y = position ? position.y : Math.random() * container.canvas.dimension.height;

                p.checkOverlap();
            }
        }
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        const pos = {x: 0, y: 0};

        if (container.polygon.raw && container.polygon.raw.length > 0) {
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
        }

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

        return pos;
    }
}
