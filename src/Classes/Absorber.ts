import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { IRgb } from "../Interfaces/IRgb";
import { IAbsorber } from "../Interfaces/Options/Absorbers/IAbsorber";
import { ColorUtils } from "./Utils/ColorUtils";
import { Utils } from "./Utils/Utils";

export class Absorber {
    public position: ICoordinates;
    public size: number;
    public limit?: number;
    public color: IRgb;
    public mass: number;

    private readonly container: Container;
    private readonly initialPosition?: ICoordinates;
    private readonly options: IAbsorber;

    constructor(container: Container, options: IAbsorber, position?: ICoordinates) {
        this.container = container;
        this.initialPosition = position;
        this.options = options;

        let size = options.size.value * container.retina.pixelRatio;
        const random = typeof options.size.random === "boolean" ? options.size.random : options.size.random.enable;
        const minSize = typeof options.size.random === "boolean" ? 1 : options.size.random.minimumValue;

        if (random) {
            size = Utils.randomInRange(minSize, size);
        }

        this.size = size * container.retina.pixelRatio;
        this.mass = size * 5;

        this.limit = options.size.limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition ?? this.calcPosition();
    }

    public attract(particle: Particle): boolean {
        const container = this.container;
        const dx = this.position.x - particle.position.x;
        const dy = this.position.y - particle.position.y;
        const distance = Math.sqrt(Math.abs(dx * dx + dy * dy));
        const angle = Math.atan2(dx, dy) * (180 / Math.PI);
        const acceleration = this.mass / Math.pow(distance, 2);

        if (distance < this.size + particle.size.value) {
            let remove = false;

            const sizeFactor = particle.size.value * 0.033;

            if (this.size > particle.size.value && distance < this.size - particle.size.value) {
                container.particles.remove(particle);
                remove = true;
            } else {
                particle.size.value -= sizeFactor;
                particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
                particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;

                console.log(particle.velocity);
            }

            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }

            this.mass += sizeFactor;

            return !remove;
        } else {
            particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
            particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;

            return true;
        }
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position = initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size) ?
            initialPosition :
            this.calcPosition();
    }

    public draw(): void {
        const container = this.container;

        container.canvas.drawAbsorber(this);
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.options.position ?? {
            x: Math.random() * 100,
            y: Math.random() * 100,
        };

        return {
            x: percentPosition.x / 100 * container.canvas.size.width,
            y: percentPosition.y / 100 * container.canvas.size.height,
        };
    }
}