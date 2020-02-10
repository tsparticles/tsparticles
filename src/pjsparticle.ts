import { pJSUtils } from './pjsutils';
import { pJSParticleImage, pJSColor, pJSCoordinates, pJSRgb, pJSHsl } from './pjsinterfaces';
import { pJSContainer } from './pjscontainer';
import { pJSShapeType, pJSMoveDirection } from './pjsenums';

'use strict';

export class pJSParticle {
    pJSContainer: pJSContainer;
    radius: number;
    size_status?: boolean;
    vs?: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    color: pJSColor;
    opacity: number;
    opacity_status?: boolean;
    vo?: number;
    vx: number;
    vy: number;
    vx_i: number;
    vy_i: number;
    shape?: pJSShapeType;
    img?: pJSParticleImage;
    radius_bubble?: number;
    opacity_bubble?: number;

    /* --------- pJS functions - particles ----------- */
    constructor(pJSContainer: pJSContainer, color: { value: string[] | pJSColor | string }, opacity: number, position?: pJSCoordinates) {
        this.pJSContainer = pJSContainer;
        let options = pJSContainer.options;

        /* size */
        this.radius = (options.particles.size.random ? Math.random() : 1) * options.particles.size.value;
        if (options.particles.size.anim.enable) {
            this.size_status = false;
            this.vs = options.particles.size.anim.speed / 100;
            if (!options.particles.size.anim.sync) {
                this.vs = this.vs * Math.random();
            }
        }
        /* position */
        this.x = position ? position.x : Math.random() * pJSContainer.canvas.w;
        this.y = position ? position.y : Math.random() * pJSContainer.canvas.h;
        /* check position  - into the canvas */
        if (this.x > pJSContainer.canvas.w - this.radius * 2)
            this.x = this.x - this.radius;
        else if (this.x < this.radius * 2)
            this.x = this.x + this.radius;
        if (this.y > pJSContainer.canvas.h - this.radius * 2)
            this.y = this.y - this.radius;
        else if (this.y < this.radius * 2)
            this.y = this.y + this.radius;
        /* parallax */
        this.offsetX = 0;
        this.offsetY = 0;

        /* check position - avoid overlap */
        if (options.particles.move.bounce) {
            this.checkOverlap(position);
        }

        /* color */
        this.color = {};
        if (typeof (color.value) == 'object') {
            if (color.value instanceof Array) {
                let arr = options.particles.color.value as string[];
                let color_selected = color.value[Math.floor(Math.random() * arr.length)];

                this.color.rgb = pJSUtils.hexToRgb(color_selected);
            }
            else {

                let rgbColor = color.value as pJSRgb;

                if (rgbColor && rgbColor.r != undefined && rgbColor.g != undefined && rgbColor.b != undefined) {
                    this.color.rgb = {
                        r: rgbColor.r,
                        g: rgbColor.g,
                        b: rgbColor.b
                    };
                }

                let hslColor = color.value as pJSHsl;

                if (hslColor.h != undefined && hslColor.s != undefined && hslColor.l != undefined) {
                    this.color.hsl = {
                        h: hslColor.h,
                        s: hslColor.s,
                        l: hslColor.l
                    };
                }
            }
        } else if (typeof (color.value) == 'string') {
            if (color.value == 'random') {
                this.color.rgb = {
                    r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                    g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                    b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
                };
            } else {
                this.color = {};
                this.color.rgb = pJSUtils.hexToRgb(color.value);
            }
        }

        /* opacity */
        this.opacity = (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value;
        if (options.particles.opacity.anim.enable) {
            this.opacity_status = false;
            this.vo = options.particles.opacity.anim.speed / 100;
            if (!options.particles.opacity.anim.sync) {
                this.vo = this.vo * Math.random();
            }
        }

        /* animation - velocity for speed */
        let velbase: pJSCoordinates;

        switch (options.particles.move.direction) {
            case pJSMoveDirection.top:
                velbase = { x: 0, y: -1 };
                break;
            case pJSMoveDirection.topRight:
                velbase = { x: 0.5, y: -0.5 };
                break;
            case pJSMoveDirection.right:
                velbase = { x: 1, y: -0 };
                break;
            case pJSMoveDirection.bottomRight:
                velbase = { x: 0.5, y: 0.5 };
                break;
            case pJSMoveDirection.bottom:
                velbase = { x: 0, y: 1 };
                break;
            case pJSMoveDirection.bottomLeft:
                velbase = { x: -0.5, y: 1 };
                break;
            case pJSMoveDirection.left:
                velbase = { x: -1, y: 0 };
                break;
            case pJSMoveDirection.topLeft:
                velbase = { x: -0.5, y: -0.5 };
                break;
            default:
                velbase = { x: 0, y: 0 };
                break;
        }

        if (options.particles.move.straight) {
            this.vx = velbase.x;
            this.vy = velbase.y;
            if (options.particles.move.random) {
                this.vx = this.vx * (Math.random());
                this.vy = this.vy * (Math.random());
            }
        }
        else {
            this.vx = velbase.x + Math.random() - 0.5;
            this.vy = velbase.y + Math.random() - 0.5;
        }

        // let theta = 2.0 * Math.PI * Math.random();

        // this.vx = Math.cos(theta);
        // this.vy = Math.sin(theta);

        this.vx_i = this.vx;
        this.vy_i = this.vy;
        /* if shape is image */
        let shape_type = options.particles.shape.type;

        if (shape_type instanceof Array) {
            let shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
            this.shape = shape_selected;
        }
        else {
            this.shape = shape_type;
        }

        if (this.shape == pJSShapeType.image) {
            let sh = options.particles.shape;
            this.img = {
                src: sh.image.src,
                ratio: sh.image.width / sh.image.height
            };
            if (!this.img.ratio)
                this.img.ratio = 1;
            if (pJSContainer.img.type == 'svg' && pJSContainer.svg.source != undefined) {
                this.createSvgImg();

                if (pJSContainer.pushing) {
                    this.img.loaded = false;
                }
            }
        }
    }

    draw() {
        let p = this;
        let pJS = this.pJSContainer;
        let options = pJS.options;
        let radius: number;
        let opacity;
        let color_value;

        if (p.radius_bubble != undefined) {
            radius = p.radius_bubble;
        } else {
            radius = p.radius;
        }

        if (p.opacity_bubble != undefined) {
            opacity = p.opacity_bubble;
        } else {
            opacity = p.opacity;
        }

        if (p.color.rgb) {
            color_value = `rgba(${p.color.rgb.r},${p.color.rgb.g},${p.color.rgb.b},${opacity})`;
        } else if (p.color.hsl) {
            color_value = `hsla(${p.color.hsl.h},${p.color.hsl.s}%,${p.color.hsl.l}%,${opacity})`;
        }

        if (!pJS.canvas.ctx || !color_value) return;

        pJS.canvas.ctx.fillStyle = color_value;
        pJS.canvas.ctx.beginPath();

        let p_x = p.x + p.offsetX;
        let p_y = p.y + p.offsetY;

        const ctx = pJS.canvas.ctx;

        switch (p.shape) {
            case pJSShapeType.circle:
                ctx.arc(p_x, p_y, radius, 0, Math.PI * 2, false);
                break;
            case pJSShapeType.edge:
            case pJSShapeType.square:
                ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
                break;
            case pJSShapeType.triangle:
                p.drawShape(ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
                break;
            case pJSShapeType.polygon:
                {
                    const startX = p.x - radius / (options.particles.shape.polygon.nb_sides / 3.5);
                    const startY = p.y - radius / (2.66 / 3.5);
                    const sideLength = radius * 2.66 / (options.particles.shape.polygon.nb_sides / 3);
                    const sideCountNumerator = options.particles.shape.polygon.nb_sides;
                    const sideCountDenominator = 1;

                    p.drawShape(ctx, startX, startY, sideLength, sideCountNumerator, sideCountDenominator);
                }
                break;
            case pJSShapeType.star:
                {
                    const startX = p.x - radius * 2 / (options.particles.shape.polygon.nb_sides / 4);
                    const startY = p.y - radius / (2 * 2.66 / 3.5);
                    const sideLength = radius * 2 * 2.66 / (options.particles.shape.polygon.nb_sides / 3);
                    const sideCountNumerator = options.particles.shape.polygon.nb_sides;
                    const sideCountDenominator = 2;

                    p.drawShape(ctx, startX, startY, sideLength, sideCountNumerator, sideCountDenominator);
                }
                break;

            case pJSShapeType.heart:
                let x = p.x - radius / 2;
                let y = p.y - radius / 2;

                ctx.moveTo(x, y + radius / 4);
                ctx.quadraticCurveTo(x, y, x + radius / 4, y);
                ctx.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
                ctx.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
                ctx.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
                ctx.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
                ctx.lineTo(x + radius / 2, y + radius);
                ctx.lineTo(x + radius / 4, y + radius * 3 / 4);
                ctx.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);

                break;

            case pJSShapeType.char:
            case pJSShapeType.character:
                ctx.font = `${options.particles.shape.character.style} ${options.particles.shape.character.weigth} ${Math.round(radius) * 2}px ${options.particles.shape.character.font}`;
                // if (stroke) {
                ctx.strokeText(options.particles.shape.character.value, this.x - radius / 2, this.y + radius / 2);
                // } else {
                //     ctx.fillText(options.settings.particles.shape.character.value, this.x - radius / 2, this.y + radius / 2);
                // }
                break;

            case pJSShapeType.image:
                let img_obj: HTMLImageElement | undefined;

                if (pJS.img.type == 'svg' && p.img) {
                    img_obj = p.img.obj;
                } else {
                    img_obj = pJS.img.obj;
                }

                if (img_obj) {
                    this.subDraw(ctx, img_obj, radius);
                }

                break;
        }

        pJS.canvas.ctx.closePath();

        if (options.particles.shape.stroke.width > 0) {
            pJS.canvas.ctx.strokeStyle = options.particles.shape.stroke.color;
            pJS.canvas.ctx.lineWidth = options.particles.shape.stroke.width;
            pJS.canvas.ctx.stroke();
        }

        pJS.canvas.ctx.fill();
    }

    subDraw(ctx: CanvasRenderingContext2D, img_obj: HTMLImageElement, radius: number) {
        let p = this;
        let ratio = 1;

        if (p.img) {
            ratio = p.img.ratio;
        }

        ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / ratio);
    }

    drawShape(ctx: CanvasRenderingContext2D, startX: number, startY: number, sideLength: number, sideCountNumerator: number, sideCountDenominator: number) {

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        let sideCount = sideCountNumerator * sideCountDenominator;
        let decimalSides = sideCountNumerator / sideCountDenominator;
        let interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        let interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        ctx.save();
        ctx.beginPath();
        ctx.translate(startX, startY);
        ctx.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            ctx.lineTo(sideLength, 0);
            ctx.translate(sideLength, 0);
            ctx.rotate(interiorAngle);
        }

        //c.stroke();
        ctx.fill();
        ctx.restore();
    }

    checkOverlap(position?: pJSCoordinates) {
        const pJS = this.pJSContainer;
        const p = this;

        for (const p2 of pJS.particles.array) {
            let dx = p.x - p2.x;
            let dy = p.y - p2.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= p.radius + p2.radius) {
                p.x = position ? position.x : Math.random() * pJS.canvas.w;
                p.y = position ? position.y : Math.random() * pJS.canvas.h;

                p.checkOverlap();
            }
        }
    }

    createSvgImg() {
        const pJS = this.pJSContainer;
        const p = this;

        /* set color to svg element */
        let svgXml = pJS.svg.source;

        if (!svgXml) return;

        let rgbHex = /#([0-9A-F]{3,6})/gi;
        let coloredSvgXml = svgXml.replace(rgbHex, (substring: string) => {
            let color_value;

            if (p.color.rgb) {
                color_value = `rgba(${p.color.rgb.r},${p.color.rgb.g},${p.color.rgb.b},${p.opacity})`;
            } else if (p.color.hsl) {
                color_value = `hsla(${p.color.hsl.h},${p.color.hsl.s}%,${p.color.hsl.l}%,${p.opacity})`;
            }

            return color_value || substring;
        });
        /* prepare to create img with colored svg */
        let svg = new Blob([coloredSvgXml], { type: 'image/svg+xml;charset=utf-8' }), url = URL.createObjectURL(svg);
        /* create particle img obj */
        let img = new Image();
        img.addEventListener('load', () => {
            if (p.img) {
                p.img.obj = img;
                p.img.loaded = true;
            }

            URL.revokeObjectURL(url);

            if (!pJS.svg.count)
                pJS.svg.count = 0;

            pJS.svg.count++;
        });
        img.src = url;
    }
}