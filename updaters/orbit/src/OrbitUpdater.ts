import {
    type IDelta,
    type IParticleUpdater,
    type RecursivePartial,
    getRangeValue,
    rangeColorToHsl,
} from "@tsparticles/engine";
import type { IOrbitParticlesOptions, OrbitContainer, OrbitParticle, OrbitParticlesOptions } from "./Types.js";
import { Orbit } from "./Options/Classes/Orbit.js";
import { OrbitType } from "./Enums.js";
import { drawEllipse } from "./Utils.js";

const double = 2,
    half = 0.5,
    doublePI = Math.PI * double,
    defaultOrbitSpeed = 0,
    halfPI = Math.PI * half,
    piAndAHalf = Math.PI + halfPI,
    startAngle = 0,
    defaultOpacity = 1,
    defaultWidth = 1,
    defaultRotation = 0;

export class OrbitUpdater implements IParticleUpdater {
    constructor(private readonly container: OrbitContainer) {}

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
        const container = this.container;

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
        const container = this.container,
            particlesOptions = particle.options,
            orbitOptions = particlesOptions.orbit;

        if (!orbitOptions?.enable) {
            return;
        }

        particle.orbitRotation = getRangeValue(orbitOptions.rotation.value);
        particle.orbitColor = rangeColorToHsl(orbitOptions.color);
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
        if (!options.orbit) {
            options.orbit = new Orbit();
        }

        for (const source of sources) {
            options.orbit.load(source?.orbit);
        }
    }

    update(particle: OrbitParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.orbitRotation === undefined) {
            particle.orbitRotation = defaultRotation;
        }

        particle.orbitRotation += (particle.orbitAnimationSpeed ?? defaultOrbitSpeed / doublePI) * delta.factor;
    }
}
