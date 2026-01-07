import {
    type Engine,
    type IDelta,
    type IParticleUpdater,
    type RecursivePartial,
    defaultOpacity,
    doublePI,
    getRangeValue,
    half,
    rangeColorToHsl,
} from "@tsparticles/engine";
import type { IOrbitParticlesOptions, OrbitContainer, OrbitParticle, OrbitParticlesOptions } from "./Types.js";
import { Orbit } from "./Options/Classes/Orbit.js";
import { OrbitType } from "./Enums.js";
import { drawEllipse } from "./Utils.js";

const defaultOrbitSpeed = 0,
    halfPI = Math.PI * half,
    piAndAHalf = Math.PI + halfPI,
    startAngle = 0,
    defaultWidth = 1,
    defaultRotation = 0;

export class OrbitUpdater implements IParticleUpdater {
    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container: OrbitContainer) {
        this._engine = engine;
        this._container = container;
    }

    afterDraw(particle: OrbitParticle): void {
        const orbitOptions = particle.options.orbit;

        if (orbitOptions?.enable) {
            this.drawOrbit(particle, OrbitType.front);
        }
    }

    beforeDraw(particle: OrbitParticle): void {
        const orbitOptions = particle.options.orbit;

        if (orbitOptions?.enable) {
            this.drawOrbit(particle, OrbitType.back);
        }
    }

    drawOrbit(particle: OrbitParticle, type: OrbitType): void {
        const container = this._container;

        let start: number, end: number;

        switch (type) {
            case OrbitType.back:
                start = halfPI;
                end = piAndAHalf;
                break;
            case OrbitType.front:
                start = piAndAHalf;
                end = halfPI;
                break;
            default:
                start = startAngle;
                end = doublePI;
        }

        container.canvas.draw(ctx => {
            drawEllipse(
                ctx,
                particle,
                particle.orbitColor ?? particle.getFillColor(),
                particle.retina.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
                particle.orbitOpacity ?? defaultOpacity,
                particle.orbitWidth ?? defaultWidth,
                (particle.orbitRotation ?? defaultRotation) * container.retina.pixelRatio,
                start,
                end,
            );
        });
    }

    init(particle: OrbitParticle): void {
        /* orbit */
        const container = this._container,
            particlesOptions = particle.options,
            orbitOptions = particlesOptions.orbit;

        if (!orbitOptions?.enable) {
            return;
        }

        particle.orbitRotation = getRangeValue(orbitOptions.rotation.value);
        particle.orbitColor = rangeColorToHsl(this._engine, orbitOptions.color);
        particle.retina.orbitRadius =
            orbitOptions.radius !== undefined
                ? getRangeValue(orbitOptions.radius) * container.retina.pixelRatio
                : undefined;
        container.retina.orbitRadius = particle.retina.orbitRadius;
        particle.orbitAnimationSpeed = orbitOptions.animation.enable
            ? getRangeValue(orbitOptions.animation.speed)
            : defaultOrbitSpeed;
        particle.orbitWidth = getRangeValue(orbitOptions.width);
        particle.orbitOpacity = getRangeValue(orbitOptions.opacity);
    }

    isEnabled(particle: OrbitParticle): boolean {
        const orbitAnimations = particle.options.orbit?.animation;

        return !particle.destroyed && !particle.spawning && !!orbitAnimations?.enable;
    }

    loadOptions(
        options: OrbitParticlesOptions,
        ...sources: (RecursivePartial<IOrbitParticlesOptions> | undefined)[]
    ): void {
        options.orbit ??= new Orbit();

        for (const source of sources) {
            options.orbit.load(source?.orbit);
        }
    }

    update(particle: OrbitParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        particle.orbitRotation ??= defaultRotation;
        particle.orbitRotation += (particle.orbitAnimationSpeed ?? defaultOrbitSpeed / doublePI) * delta.factor;
    }
}
