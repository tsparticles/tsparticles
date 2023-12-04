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
                start = Math.PI / 2;
                end = (Math.PI * 3) / 2;
                break;
            case OrbitType.front:
                start = (Math.PI * 3) / 2;
                end = Math.PI / 2;
                break;
            default:
                start = 0;
                end = 2 * Math.PI;
        }

        container.canvas.draw((ctx) => {
            drawEllipse(
                ctx,
                particle,
                particle.orbitColor ?? particle.getFillColor(),
                particle.retina.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
                particle.orbitOpacity ?? 1,
                particle.orbitWidth ?? 1,
                (particle.orbitRotation ?? 0) * container.retina.pixelRatio,
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
        particle.orbitAnimationSpeed = orbitOptions.animation.enable ? getRangeValue(orbitOptions.animation.speed) : 0;
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
            particle.orbitRotation = 0;
        }

        particle.orbitRotation += (particle.orbitAnimationSpeed ?? 0 / (Math.PI * 2)) * delta.factor;
    }
}
