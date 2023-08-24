import {
    type Container,
    type Engine,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
    getRangeValue,
} from "@tsparticles/engine";
import type { DestroyParticle, DestroyParticlesOptions, IDestroyParticlesOptions } from "./Types";
import { Destroy } from "./Options/Classes/Destroy";
import { DestroyMode } from "./Enums/DestroyMode";
import { split } from "./Utils";

export class DestroyUpdater implements IParticleUpdater {
    constructor(
        private readonly engine: Engine,
        private readonly container: Container,
    ) {}

    init(particle: DestroyParticle): void {
        const container = this.container,
            particlesOptions = particle.options,
            destroyOptions = particlesOptions.destroy;

        if (!destroyOptions) {
            return;
        }

        particle.splitCount = 0;

        const destroyBoundsOptions = destroyOptions.bounds;

        if (!particle.destroyBounds) {
            particle.destroyBounds = {};
        }

        const { bottom, left, right, top } = destroyBoundsOptions,
            { destroyBounds } = particle,
            canvasSize = container.canvas.size;

        if (bottom) {
            destroyBounds.bottom = (getRangeValue(bottom) * canvasSize.height) / 100;
        }

        if (left) {
            destroyBounds.left = (getRangeValue(left) * canvasSize.width) / 100;
        }

        if (right) {
            destroyBounds.right = (getRangeValue(right) * canvasSize.width) / 100;
        }

        if (top) {
            destroyBounds.top = (getRangeValue(top) * canvasSize.height) / 100;
        }
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed;
    }

    loadOptions(
        options: DestroyParticlesOptions,
        ...sources: (RecursivePartial<IDestroyParticlesOptions> | undefined)[]
    ): void {
        if (!options.destroy) {
            options.destroy = new Destroy();
        }

        for (const source of sources) {
            options.destroy.load(source?.destroy);
        }
    }

    particleDestroyed(particle: DestroyParticle, override?: boolean): void {
        if (override) {
            return;
        }

        const destroyOptions = particle.options.destroy;

        if (destroyOptions && destroyOptions.mode === DestroyMode.split) {
            split(this.engine, this.container, particle);
        }
    }

    update(particle: DestroyParticle): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        const position = particle.getPosition(),
            bounds = particle.destroyBounds;

        if (!bounds) {
            return;
        }

        if (
            (bounds.bottom !== undefined && position.y >= bounds.bottom) ||
            (bounds.left !== undefined && position.x <= bounds.left) ||
            (bounds.right !== undefined && position.x >= bounds.right) ||
            (bounds.top !== undefined && position.y <= bounds.top)
        ) {
            particle.destroy();
        }
    }
}
