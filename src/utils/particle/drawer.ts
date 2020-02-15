import { Particle } from "../../classes/particle";
import { Container } from "../../classes/container";
import { ShapeType } from "../enums";
import { Bubbler } from "./bubbler";

export class Drawer {
    private readonly particle: Particle;
    private readonly container: Container;
    private readonly bubbler: Bubbler;

    constructor(container: Container, particle: Particle, bubbler: Bubbler) {
        this.container = container;
        this.particle = particle;
        this.bubbler = bubbler;
    }

    public draw(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        let radius: number;
        let opacity;
        let color_value;

        if (this.bubbler.radius !== undefined) {
            radius = this.bubbler.radius;
        } else {
            radius = particle.radius;
        }

        if (particle.opacity_bubble !== undefined) {
            opacity = particle.opacity_bubble;
        } else {
            opacity = particle.opacity.value;
        }

        if (particle.color.rgb) {
            color_value = `rgba(${particle.color.rgb.r},${particle.color.rgb.g},${particle.color.rgb.b},${opacity})`;
        } else if (particle.color.hsl) {
            color_value = `hsla(${particle.color.hsl.h},${particle.color.hsl.s}%,${particle.color.hsl.l}%,${opacity})`;
        }

        if (!container.canvas.ctx || !color_value) {
            return;
        }

        container.canvas.ctx.fillStyle = color_value;
        container.canvas.ctx.beginPath();

        this.drawShape(radius);

        container.canvas.ctx.closePath();

        if (options.particles.shape.stroke.width > 0) {
            container.canvas.ctx.strokeStyle = options.particles.shape.stroke.color;
            container.canvas.ctx.lineWidth = options.particles.shape.stroke.width;
            container.canvas.ctx.stroke();
        }

        container.canvas.ctx.fill();
    }

    private drawShape(radius: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const ctx = container.canvas.ctx;

        if (!ctx) {
            return;
        }

        const pos = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };

        switch (particle.shape) {
            case ShapeType.line:
                ctx.moveTo(particle.position.x, particle.position.y)
                ctx.lineTo(particle.position.x, particle.position.y + radius)
                ctx.strokeStyle = options.particles.shape.stroke.color;
                ctx.lineWidth = options.particles.shape.stroke.width;
                ctx.stroke();
                break;

            case ShapeType.circle:
                ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, false);
                break;
            case ShapeType.edge:
            case ShapeType.square:
                ctx.rect(particle.position.x - radius, particle.position.y - radius, radius * 2, radius * 2);
                break;
            case ShapeType.triangle:
                const startX = particle.position.x - radius;
                const startY = particle.position.y + radius / 1.66;
                const sideLength = radius * 2;

                Drawer.subDrawShape(ctx, startX, startY, sideLength, 3, 2);
                break;
            case ShapeType.polygon:
                {
                    const startX = particle.position.x - radius / (options.particles.shape.polygon.nb_sides / 3.5);
                    const startY = particle.position.y - radius / (2.66 / 3.5);
                    const sideLength = radius * 2.66 / (options.particles.shape.polygon.nb_sides / 3);
                    const sideCountNumerator = options.particles.shape.polygon.nb_sides;
                    const sideCountDenominator = 1;

                    Drawer.subDrawShape(ctx, startX, startY, sideLength, sideCountNumerator, sideCountDenominator);
                }
                break;
            case ShapeType.star:
                {
                    const startX = particle.position.x - radius * 2 / (options.particles.shape.polygon.nb_sides / 4);
                    const startY = particle.position.y - radius / (2 * 2.66 / 3.5);
                    const sideLength = radius * 2 * 2.66 / (options.particles.shape.polygon.nb_sides / 3);
                    const sideCountNumerator = options.particles.shape.polygon.nb_sides;
                    const sideCountDenominator = 2;

                    Drawer.subDrawShape(ctx, startX, startY, sideLength, sideCountNumerator, sideCountDenominator);
                }
                break;

            case ShapeType.heart:
                const x = particle.position.x - radius / 2;
                const y = particle.position.y - radius / 2;

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

            case ShapeType.char:
            case ShapeType.character:
                const style = options.particles.shape.character.style;
                const weight = options.particles.shape.character.weight;
                const size = Math.round(radius) * 2;
                const font = options.particles.shape.character.font;

                ctx.font = `${style} ${weight} ${size}px ${font}`;

                if (particle.text) {
                    const x = particle.position.x - radius / 2;
                    const y = particle.position.y + radius / 2;

                    if (options.particles.shape.character.fill) {
                        ctx.fillText(particle.text, x, y);
                    } else {
                        ctx.strokeText(particle.text, x, y);
                    }
                }
                break;

            case ShapeType.image:
                let img_obj: HTMLImageElement | undefined;

                // if (container.img.type === "svg" && this.img) {
                //     img_obj = this.img.obj;
                // } else {
                img_obj = container.img.obj;
                // }

                if (img_obj) {
                    this.subDraw(ctx, img_obj, radius);
                }

                break;
        }
    }

    private subDraw(ctx: CanvasRenderingContext2D, img_obj: HTMLImageElement, radius: number): void {
        const particle = this.particle;

        let ratio = 1;

        if (particle.img) {
            ratio = particle.img.ratio;
        }

        const pos = {
            x: particle.position.x - radius,
            y: particle.position.y - radius,
        };

        ctx.drawImage(img_obj, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    }

    private static subDrawShape(ctx: CanvasRenderingContext2D,
        startX: number,
        startY: number,
        sideLength: number,
        sideCountNumerator: number,
        sideCountDenominator: number): void {
        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = sideCountNumerator * sideCountDenominator;
        const decimalSides = sideCountNumerator / sideCountDenominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        ctx.save();
        ctx.beginPath();
        ctx.translate(startX, startY);
        ctx.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            ctx.lineTo(sideLength, 0);
            ctx.translate(sideLength, 0);
            ctx.rotate(interiorAngle);
        }

        // c.stroke();
        ctx.fill();
        ctx.restore();
    }
}
