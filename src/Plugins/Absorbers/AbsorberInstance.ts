import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRgb } from "../../Core/Interfaces/IRgb";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { ColorUtils, Utils } from "../../Utils";
import type { Absorbers } from "./Absorbers";

export class AbsorberInstance {
    public color: IRgb;
    public limit?: number;
    public mass: number;
    public opacity: number;
    public position: ICoordinates;
    public size: number;

    private readonly absorbers: Absorbers;
    private readonly container: Container;
    private readonly initialPosition?: ICoordinates;
    private readonly options: IAbsorber;

    constructor(absorbers: Absorbers, options: IAbsorber, position?: ICoordinates) {
        this.absorbers = absorbers;
        this.container = absorbers.container;
        this.initialPosition = position;
        this.options = options;

        const container = this.container;

        let size = options.size.value * container.retina.pixelRatio;
        const random = typeof options.size.random === "boolean" ? options.size.random : options.size.random.enable;
        const minSize = typeof options.size.random === "boolean" ? 1 : options.size.random.minimumValue;

        if (random) {
            size = Utils.randomInRange(minSize, size);
        }

        this.opacity = this.options.opacity;
        this.size = size * container.retina.pixelRatio;
        this.mass = this.size * options.size.density;

        const limit = options.size.limit;

        this.limit = limit !== undefined ? limit * container.retina.pixelRatio : limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition ?? this.calcPosition();
    }

    public attract(particle: Particle, _delta: number): void {
        const pos = particle.getPosition();
        const { dx, dy, distance } = Utils.getDistances(this.position, pos);
        const angle = Math.atan2(dx, dy) * (180 / Math.PI);
        const acceleration = this.mass / Math.pow(distance, 2);

        if (distance < this.size + particle.size.value) {
            const sizeFactor = particle.size.value * 0.033;

            if (this.size > particle.size.value && distance < this.size - particle.size.value) {
                particle.destroyed = true;
            } else {
                particle.size.value -= sizeFactor;
                particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
                particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;
            }

            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }

            this.mass += sizeFactor * this.options.size.density;
        } else {
            particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
            particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;
        }
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = ColorUtils.getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.options.position ?? {
            x: Math.random() * 100,
            y: Math.random() * 100,
        };

        return {
            x: (percentPosition.x / 100) * container.canvas.size.width,
            y: (percentPosition.y / 100) * container.canvas.size.height,
        };
    }
}
