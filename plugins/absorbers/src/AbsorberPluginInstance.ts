import {
    type Container,
    type Engine,
    type ICoordinates,
    type IRgb,
    type Particle,
    type RecursivePartial,
    RotateDirection,
    Vector,
    calcPositionOrRandomFromSize,
    calcPositionOrRandomFromSizeRanged,
    doublePI,
    getDistance,
    getDistances,
    getRandom,
    getRangeValue,
    getStyleFromRgb,
    isPointInside,
    originPoint,
    percentDenominator,
    rangeColorToRgb,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { IAbsorberSizeLimit } from "./Options/Interfaces/IAbsorberSizeLimit.js";

const squareExp = 2,
    absorbFactor = 0.033,
    minOrbitLength = 0,
    minRadius = 0,
    minMass = 0,
    minAngle = 0,
    maxAngle = doublePI,
    minVelocity = 0;

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
 */
export class AbsorberPluginInstance {
    /**
     * The absorber color
     */
    color: IRgb;

    /**
     * The absorber size limit
     */
    limit: IAbsorberSizeLimit;

    /**
     * The absorber mass, this increases the attraction force
     */
    mass;

    /**
     * The absorber name, useful when retrieving it manually
     */
    readonly name?: string;

    /**
     * The absorber opacity
     */
    opacity;

    /**
     * The absorber position
     */
    position: Vector;

    /**
     * The absorber size, great size doesn't mean great mass, it depends also on the density
     */
    size;

    private readonly _container;
    private readonly _engine;

    /**
     * Sets if the absorber can be moved with mouse drag&drop
     * @internal
     */
    private dragging;

    /**
     * Gets the absorber initial position
     * @internal
     */
    private readonly initialPosition?: Vector;

    /**
     * Gets the absorber options
     * @internal
     */
    private readonly options;

    /**
     * The absorber constructor, initializes the absorber based on the given options and position
     * @param container - the Container engine using the absorber plugin, containing the particles that will interact with this Absorber
     * @param engine - the Engine instance that will be used for calculating the Absorber interactions
     * @param options - the Absorber source options
     * @param position - the Absorber optional position, if not given, it will be searched in options, and if not available also there, a random one will be used
     */
    constructor(container: Container, engine: Engine, options: RecursivePartial<IAbsorber>, position?: ICoordinates) {
        this._container = container;
        this._engine = engine;

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

        this.color = rangeColorToRgb(this._engine, this.options.color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition?.copy() ?? this._calcPosition();
    }

    /**
     * Absorber attraction interaction, attract the particle to the absorber
     * @param particle - the particle to attract to the absorber
     */
    attract(particle: OrbitingParticle): void {
        const container = this._container,
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

        v.length = (this.mass / Math.pow(distance, squareExp)) * container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * absorbFactor * container.retina.pixelRatio;

            if (
                (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < minOrbitLength)
            ) {
                if (options.destroy) {
                    particle.destroy();
                } else {
                    particle.needsNewPosition = true;

                    this._updateParticlePosition(particle, v);
                }
            } else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }

                this._updateParticlePosition(particle, v);
            }

            if (this.limit.radius <= minRadius || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }

            if (this.limit.mass <= minMass || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        } else {
            this._updateParticlePosition(particle, v);
        }
    }

    /**
     * The draw method, for drawing the absorber in the canvas
     * @param context - the canvas 2d context used for drawing
     */
    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(originPoint.x, originPoint.y, this.size, minAngle, maxAngle, false);
        context.closePath();
        context.fillStyle = getStyleFromRgb(this.color, this._container.hdr, this.opacity);
        context.fill();
    }

    /**
     * The resize method, for fixing the Absorber position
     */
    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this._container.canvas.size, Vector.origin)
                ? initialPosition
                : this._calcPosition();
    }

    /**
     * This method calculate the absorber position, using the provided options and position
     * @internal
     * @returns the calculated position for the absorber
     */
    private readonly _calcPosition: () => Vector = () => {
        const exactPosition = calcPositionOrRandomFromSizeRanged({
            size: this._container.canvas.size,
            position: this.options.position,
        });

        return Vector.create(exactPosition.x, exactPosition.y);
    };

    /**
     * Updates the particle position, if the particle needs a new position
     * @param particle - the particle to update
     * @param v - the vector used for calculating the distance between the Absorber and the particle
     * @internal
     */
    private readonly _updateParticlePosition: (particle: OrbitingParticle, v: Vector) => void = (particle, v) => {
        if (particle.destroyed) {
            return;
        }

        const container = this._container,
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
                particle.absorberOrbit = Vector.origin;
                particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = getRandom() * maxAngle;
            }

            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height),
                    offset = 1,
                    randomOffset = 0.1,
                    randomFactor = 0.2;

                particle.absorberOrbit.length = minSize * (offset + (getRandom() * randomFactor - randomOffset));
            }

            particle.absorberOrbitDirection ??=
                particle.velocity.x >= minVelocity ? RotateDirection.clockwise : RotateDirection.counterClockwise;

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
                (((particle.retina.moveSpeed ?? minVelocity) * container.retina.pixelRatio) / percentDenominator) *
                container.retina.reduceFactor;
        } else {
            const addV = Vector.origin;

            addV.length = v.length;
            addV.angle = v.angle;

            particle.velocity.addTo(addV);
        }
    };
}
