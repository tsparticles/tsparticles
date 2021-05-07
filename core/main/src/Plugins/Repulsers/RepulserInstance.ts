import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRgb } from "../../Core/Interfaces/Colors";
import type { IRepulser } from "./Options/Interfaces/IRepulser";
import { ColorUtils, NumberUtils, Utils } from "../../Utils";
import type { Repulsers } from "./Repulsers";
import { Vector } from "../../Core/Particle/Vector";

/**
 * @category Repulsers Plugin
 */
export class RepulserInstance {
    opacity;
    size;

    color: IRgb;
    readonly name?: string;
    position: Vector;

    private dragging;

    private readonly initialPosition?: Vector;
    private readonly options: IRepulser;

    constructor(
        private readonly repulsers: Repulsers,
        private readonly container: Container,
        options: IRepulser,
        position?: ICoordinates
    ) {
        this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;
        this.options = options;
        this.dragging = false;

        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = NumberUtils.getValue(options.size) * container.retina.pixelRatio;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition?.copy() ?? this.calcPosition();

        console.log(this.position.length, this.position.angle);
    }

    repulse(particle: Particle): void {
        const options = this.options;

        if (options.draggable) {
            const mouse = this.container.interactivity.mouse;

            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = NumberUtils.getDistance(this.position, mouse.downPosition);

                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            } else {
                this.dragging = false;
            }

            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }

        const pos = particle.getPosition();
        const { dx, dy, distance } = NumberUtils.getDistances(this.position, pos);
        const v = Vector.create(dx, dy);

        v.length = (1 / Math.pow(distance, 2)) * this.container.retina.reduceFactor;
        v.multTo(-1);

        this.updateParticlePosition(particle, v);
    }

    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = ColorUtils.getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): Vector {
        const container = this.container;
        const percentPosition = this.options.position;

        return Vector.create(
            ((percentPosition?.x ?? Math.random() * 100) / 100) * container.canvas.size.width,
            ((percentPosition?.y ?? Math.random() * 100) / 100) * container.canvas.size.height
        );
    }

    private updateParticlePosition(particle: Particle, v: Vector): void {
        particle.velocity.addTo(v);
    }
}
