import type { Container, ICoordinates, IRgb, Particle, RecursivePartial } from "tsparticles-engine";
import {
    RotateDirection,
    Vector,
    calcPositionOrRandomFromSize,
    calcPositionOrRandomFromSizeRanged,
    colorToRgb,
    getDistance,
    getDistances,
    getRangeValue,
    getStyleFromRgb,
    isPointInside,
} from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { Absorbers } from "./Absorbers";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit";

/**
 * Particle extension type for Absorber orbit options
 */
type OrbitingParticle = Particle & {
    /**
     * Vector representing the orbit of the particle around the absorber
     */
    absorberOrbit?: Vector;

    /**
     * Particle orbit direction around the absorber
     */
    absorberOrbitDirection?: RotateDirection;

    /**
     * Checks if the particle needs a new position after going inside the absorber
     */
    needsNewPosition?: boolean;
};

/**
 * @category Absorbers Plugin
 */
export class AbsorberInstance {
    /**
     * The absorber mass, this increases the attraction force
     */
    mass;

    /**
     * The absorber opacity
     */
    opacity;

    /**
     * The absorber size, great size doesn't mean great mass, it depends also on the density
     */
    size;

    /**
     * The absorber color
     */
    color: IRgb;

    /**
     * The absorber size limit
     */
    limit: IAbsorberSizeLimit;

    /**
     * The absorber name, useful when retrieving it manually
     */
    readonly name?: string;

    /**
     * The absorber position
     */
    position: Vector;

    /**
     * Sets if the absorber can be moved with mouse drag&drop
     * @private
     */
    private dragging;

    /**
     * Gets the absorber initial position
     * @private
     */
    private readonly initialPosition?: Vector;

    /**
     * Gets the absorber options
     * @private
     */
    private readonly options;

    /**
     * The absorber constructor, initializes the absorber based on the given options and position
     * @param absorbers the Absorbers collection manager that will contain this absorber
     * @param container the Container engine using the absorber plugin, containing the particles that will interact with this Absorber
     * @param options the Absorber source options
     * @param position the Absorber optional position, if not given, it will be searched in options, and if not available also there, a random one will be used
     */
    constructor(
        private readonly absorbers: Absorbers,
        private readonly container: Container,
        options: RecursivePartial<IAbsorber>,
        position?: ICoordinates
    ) {
        this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;

        if (options instanceof Absorber) {
            this.options = options;
        } else {
            this.options = new Absorber();
            this.options.load(options);
        }

        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * this.options.size.density * container.retina.reduceFactor;

        const limit = this.options.size.limit;

        this.limit = {
            radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
            mass: limit.mass,
        };

        this.color = colorToRgb(this.options.color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition?.copy() ?? this.calcPosition();
    }

    /**
     * Absorber attraction interaction, attract the particle to the absorber
     * @param particle the particle to attract to the absorber
     */
    attract(particle: OrbitingParticle): void {
        const container = this.container,
            options = this.options;

        if (options.draggable) {
            const mouse = container.interactivity.mouse;

            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = getDistance(this.position, mouse.downPosition);

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

        const pos = particle.getPosition(),
            { dx, dy, distance } = getDistances(this.position, pos),
            v = Vector.create(dx, dy);

        v.length = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;

            if (
                (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0)
            ) {
                if (options.destroy) {
                    particle.destroy();
                } else {
                    particle.needsNewPosition = true;

                    this.updateParticlePosition(particle, v);
                }
            } else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }

                this.updateParticlePosition(particle, v);
            }

            if (this.limit.radius <= 0 || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }

            if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        } else {
            this.updateParticlePosition(particle, v);
        }
    }

    /**
     * The resize method, for fixing the Absorber position
     */
    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin)
                ? initialPosition
                : this.calcPosition();
    }

    /**
     * The draw method, for drawing the absorber in the canvas
     * @param context the canvas 2d context used for drawing
     */
    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    /**
     * This method calculate the absorber position, using the provided options and position
     * @private
     */
    private calcPosition(): Vector {
        const exactPosition = calcPositionOrRandomFromSizeRanged({
            size: this.container.canvas.size,
            position: this.options.position,
        });

        return Vector.create(exactPosition.x, exactPosition.y);
    }

    /**
     * Updates the particle position, if the particle needs a new position
     * @param particle the particle to update
     * @param v the vector used for calculating the distance between the Absorber and the particle
     * @private
     */
    private updateParticlePosition(particle: OrbitingParticle, v: Vector): void {
        if (particle.destroyed) {
            return;
        }

        const container = this.container,
            canvasSize = container.canvas.size;

        if (particle.needsNewPosition) {
            const newPosition = calcPositionOrRandomFromSize({ size: canvasSize });

            particle.position.setTo(newPosition);
            particle.velocity.setTo(particle.initialVelocity);
            particle.absorberOrbit = undefined;
            particle.needsNewPosition = false;
        }

        if (this.options.orbits) {
            if (particle.absorberOrbit === undefined) {
                particle.absorberOrbit = Vector.create(0, 0);
                particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
            }

            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);

                particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
            }

            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
            }

            const orbitRadius = particle.absorberOrbit.length,
                orbitAngle = particle.absorberOrbit.angle,
                orbitDirection = particle.absorberOrbitDirection;

            particle.velocity.setTo(Vector.origin);

            const updateFunc = {
                x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
                y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos,
            };

            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);

            particle.absorberOrbit.length -= v.length;
            particle.absorberOrbit.angle +=
                (((particle.retina.moveSpeed ?? 0) * container.retina.pixelRatio) / 100) *
                container.retina.reduceFactor;
        } else {
            const addV = Vector.origin;

            addV.length = v.length;
            addV.angle = v.angle;

            particle.velocity.addTo(addV);
        }
    }
}
