"use strict";

import { Utils } from "../utils/utils";
import {
    IParticleImage,
    IColor,
    ICoordinates,
    IRgb,
    IHsl,
    IOptions,
    IOpacity,
    ISize,
    IVelocity
} from "../utils/interfaces";
import { Container } from "./container";
import { ShapeType, MoveDirection } from "../utils/enums";
import { Updater } from "../utils/particle/updater";
import { Bubbler } from "../utils/particle/bubbler";
import { Repulser } from "../utils/particle/repulser";
import { Drawer } from "../utils/particle/drawer";

export class Particle {
    public radius: number;
    public size: ISize;
    public position: ICoordinates;
    public offset: ICoordinates;
    public color: IColor;
    public opacity: IOpacity;
    public velocity: IVelocity;
    public initialVelocity: IVelocity;
    public shape?: ShapeType;
    public img?: IParticleImage;
    public opacity_bubble?: number;
    public text?: string;

    private readonly container: Container;
    private readonly updater: Updater;
    private readonly bubbler: Bubbler;
    private readonly repulser: Repulser;
    private readonly drawer: Drawer;

    /* --------- tsParticles functions - particles ----------- */
    constructor(container: Container, position?: ICoordinates) {
        this.container = container;
        const options = container.options;
        const color = options.particles.color;

        /* size */
        this.size = {};
        this.radius = (options.particles.size.random ? Math.random() : 1) * options.particles.size.value;

        if (options.particles.size.anim.enable) {
            this.size.status = false;
            this.size.velocity = options.particles.size.anim.speed / 100;

            if (!options.particles.size.anim.sync) {
                this.size.velocity = this.size.velocity * Math.random();
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
        if (options.particles.move.bounce) {
            this.checkOverlap(position);
        }

        /* color */
        this.color = this.getColor(options, color);

        /* opacity */
        this.opacity = {
            value: (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value,
        };

        if (options.particles.opacity.anim.enable) {
            this.opacity.status = false;
            this.opacity.velocity = options.particles.opacity.anim.speed / 100;

            if (!options.particles.opacity.anim.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

        /* animation - velocity for speed */
        this.velocity = this.calcVelocity(options);

        this.initialVelocity = {
            horizontal: this.velocity.horizontal,
            vertical: this.velocity.vertical,
        };

        /* if shape is image */
        const shapeType = options.particles.shape.type;

        if (shapeType instanceof Array) {
            const selectedShape = shapeType[Math.floor(Math.random() * shapeType.length)];
            this.shape = selectedShape;
        } else {
            this.shape = shapeType;
        }

        if (this.shape === ShapeType.image) {
            const sh = options.particles.shape;
            this.img = {
                ratio: sh.image.width / sh.image.height,
                replace_color: sh.image.replace_color,
                src: sh.image.src,
            };

            if (!this.img.ratio) {
                this.img.ratio = 1;
            }
            // if (container.img.type === "svg" && container.svg.source !== undefined) {
            //     this.createSvgImg();

            //     if (container.particles.pushing) {
            //         this.img.loaded = false;
            //     }
            // }
        }

        if (this.shape === ShapeType.char || this.shape === ShapeType.character) {
            const value = options.particles.shape.character.value;

            if (typeof value === "string") {
                this.text = value;
            } else {

                this.text = value[Math.floor(Math.random() * value.length)]
            }
        }

        this.updater = new Updater(this.container, this);
        this.bubbler = new Bubbler(this.container, this);
        this.repulser = new Repulser(this.container, this);
        this.drawer = new Drawer(this.container, this, this.bubbler);
    }

    public draw(): void {
        this.drawer.draw();
    }

    public checkOverlap(position?: ICoordinates): void {
        const container = this.container;
        const p = this;

        for (const p2 of container.particles.array) {
            const dx = p.position.x - p2.position.x;
            const dy = p.position.y - p2.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= p.radius + p2.radius) {
                p.position.x = position ? position.x : Math.random() * container.canvas.w;
                p.position.y = position ? position.y : Math.random() * container.canvas.h;

                p.checkOverlap();
            }
        }
    }

    // createSvgImg() {
    //     const container = this.Container;
    //     const p = this;

    //     /* set color to svg element */
    //     let svgXml = container.svg.source;

    //     if (!svgXml) return;

    //     let url: string;
    //     if (this.img && this.img.replace_color) {
    //         let rgbHex = /#([0-9A-F]{3,6})/gi;
    //         let coloredSvgXml = svgXml.replace(rgbHex, (substring: string) => {
    //             let color_value;

    //             if (p.color.rgb) {
    //                 color_value = `rgb(${p.color.rgb.r},${p.color.rgb.g},${p.color.rgb.b})`;
    //             } else if (p.color.hsl) {
    //                 color_value = `hsl(${p.color.hsl.h},${p.color.hsl.s}%,${p.color.hsl.l}%)`;
    //             }

    //             return color_value || substring;
    //         });
    //         url = "data:image/svg+xml;utf8," + coloredSvgXml;
    //     } else {
    //         url = "data:image/svg+xml;utf8," + svgXml;
    //     }
    //     /* prepare to create img with colored svg */
    //     // let svg = new Blob([coloredSvgXml], { type: "image/svg+xml;charset=utf-8" });
    //     // let url = URL.createObjectURL(svg);
    //     /* create particle img obj */
    //     let img = new Image();
    //     img.addEventListener("load", () => {
    //         if (p.img) {
    //             p.img.obj = img;
    //             p.img.loaded = true;
    //         }

    //         // URL.revokeObjectURL(url);

    //         if (!container.svg.count)
    //             container.svg.count = 0;

    //         container.svg.count++;
    //     });
    //     img.src = url;
    // }

    public grab(): void {
        const container = this.container;
        const options = container.options;

        if (options.interactivity.events.onhover.enable && container.interactivity.status === "mousemove") {
            const dx_mouse = this.position.x - (container.interactivity.mouse.pos_x || 0);
            const dy_mouse = this.position.y - (container.interactivity.mouse.pos_y || 0);
            const dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
            /*
               draw a line between the cursor and the particle
               if the distance between them is under the config distance
            */
            if (dist_mouse <= options.interactivity.modes.grab.distance) {
                const lineOpacity = options.interactivity.modes.grab.line_linked.opacity;
                const grabDistance = options.interactivity.modes.grab.distance;
                const opacity_line = lineOpacity - (dist_mouse / (1 / lineOpacity)) / grabDistance;

                if (opacity_line > 0) {
                    /* style */
                    const optColor = options.particles.line_linked.color;
                    const lineColor = container.particles.line_linked_color || Utils.hexToRgb(optColor);

                    container.particles.line_linked_color = lineColor;

                    const color_line = container.particles.line_linked_color || { r: 127, g: 127, b: 127 };

                    if (container.canvas.ctx) {
                        const strokeStyle = `rgba(${color_line.r},${color_line.g},${color_line.b},${opacity_line})`;
                        container.canvas.ctx.strokeStyle = strokeStyle;
                        container.canvas.ctx.lineWidth = options.particles.line_linked.width;
                        // container.canvas.ctx.lineCap = "round"; /* performance issue */
                        /* path */
                        container.canvas.ctx.beginPath();
                        container.canvas.ctx.moveTo(this.position.x + this.offset.x, this.position.y + this.offset.y);

                        const mousePos = {
                            x: (container.interactivity.mouse.pos_x || 0),
                            y: (container.interactivity.mouse.pos_y || 0)
                        };

                        container.canvas.ctx.lineTo(mousePos.x, mousePos.y);
                        container.canvas.ctx.stroke();
                        container.canvas.ctx.closePath();
                    }
                }
            }
        }
    }

    public bubble(): void {
        this.bubbler.bubble();
    }

    public repulse(): void {
        this.repulser.repulse();
    }

    /* ---------- tsParticles functions - particles interaction ------------ */
    public link(p2: Particle): void {
        this.updater.link(p2);
    }

    public attract(p2: Particle): void {
        this.updater.attract(p2);
    }

    public bounce(p2: Particle): void {
        this.updater.bounce(p2);
    }

    public move(delta: number): void {
        this.updater.move(delta);
    }

    public moveParallax(): void {
        this.updater.moveParallax();
    }

    public updateOpacity(): void {
        this.updater.updateOpacity();
    }

    public updateSize(): void {
        this.updater.updateSize();
    }

    public fixOutOfCanvasPosition(): void {
        this.updater.fixOutOfCanvasPosition();
    }

    public updateOutMode(): void {
        this.updater.updateOutMode();
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        const pos = {
            x: position && position.x ? position.x : Math.random() * container.canvas.w,
            y: position && position.y ? position.y : Math.random() * container.canvas.h,
        };

        /* check position  - into the canvas */
        if (pos.x > container.canvas.w - this.radius * 2) {
            pos.x -= this.radius;
        } else if (pos.x < this.radius * 2) {
            pos.x += this.radius;
        }

        if (pos.y > container.canvas.h - this.radius * 2) {
            pos.y -= this.radius;
        } else if (pos.y < this.radius * 2) {
            pos.y += this.radius;
        }

        return pos;
    }

    private calcVelocity(options: IOptions): IVelocity {
        const velbase = this.getVelBase(options);
        const res = {
            horizontal: 0,
            vertical: 0,
        };

        if (options.particles.move.straight) {
            res.horizontal = velbase.x;
            res.vertical = velbase.y;

            if (options.particles.move.random) {
                res.horizontal *= Math.random();
                res.vertical *= Math.random();
            }
        }
        else {
            res.horizontal = velbase.x + Math.random() - 0.5;
            res.vertical = velbase.y + Math.random() - 0.5;
        }

        // const theta = 2.0 * Math.PI * Math.random();

        // res.x = Math.cos(theta);
        // res.y = Math.sin(theta);

        return res;
    }

    private getVelBase(options: IOptions): ICoordinates {
        let velbase: ICoordinates;

        switch (options.particles.move.direction) {
            case MoveDirection.top:
                velbase = { x: 0, y: -1 };
                break;
            case MoveDirection.topRight:
                velbase = { x: 0.5, y: -0.5 };
                break;
            case MoveDirection.right:
                velbase = { x: 1, y: -0 };
                break;
            case MoveDirection.bottomRight:
                velbase = { x: 0.5, y: 0.5 };
                break;
            case MoveDirection.bottom:
                velbase = { x: 0, y: 1 };
                break;
            case MoveDirection.bottomLeft:
                velbase = { x: -0.5, y: 1 };
                break;
            case MoveDirection.left:
                velbase = { x: -1, y: 0 };
                break;
            case MoveDirection.topLeft:
                velbase = { x: -0.5, y: -0.5 };
                break;
            default:
                velbase = { x: 0, y: 0 };
                break;
        }

        return velbase;
    }

    private getColor(options: IOptions, color: { value: string[] | IColor | string }): IColor {
        const res: IColor = {};

        if (typeof (color.value) === "object") {
            if (color.value instanceof Array) {
                const arr = options.particles.color.value as string[];
                const color_selected = color.value[Math.floor(Math.random() * arr.length)];

                res.rgb = Utils.hexToRgb(color_selected);
            } else {

                const rgbColor = color.value as IRgb;

                if (rgbColor && rgbColor.r !== undefined && rgbColor.g !== undefined && rgbColor.b !== undefined) {
                    this.color.rgb = {
                        b: rgbColor.b,
                        g: rgbColor.g,
                        r: rgbColor.r,
                    };
                }

                const hslColor = color.value as IHsl;

                if (hslColor && hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
                    res.hsl = {
                        h: hslColor.h,
                        l: hslColor.l,
                        s: hslColor.s,
                    };
                }
            }
        } else if (typeof (color.value) === "string") {
            if (color.value === "random") {
                res.rgb = {
                    b: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    r: Math.floor(Math.random() * 256),
                };
            } else {
                res.rgb = Utils.hexToRgb(color.value);
            }
        }

        return res;
    }
}
