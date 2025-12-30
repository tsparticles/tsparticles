import {
    type Container,
    type Engine,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
    getRangeValue,
    percentDenominator,
} from "@tsparticles/engine";
import type { DestroyParticle, DestroyParticlesOptions, IDestroyParticlesOptions } from "./Types.js";
import { Destroy } from "./Options/Classes/Destroy.js";
import { DestroyMode } from "./Enums/DestroyMode.js";
import { split } from "./Utils.js";

export class DestroyUpdater implements IParticleUpdater {
    private readonly container;
    private readonly engine;

    constructor(engine: Engine, container: Container) {
        this.container = container;
        this.engine = engine;
    }

    init(particle: DestroyParticle): void {
        const container = this.container,
            particlesOptions = particle.options,
            destroyOptions = particlesOptions.destroy;

        if (!destroyOptions) {
            return;
        }

        particle.splitCount = 0;

        const destroyBoundsOptions = destroyOptions.bounds;

        particle.destroyBounds ??= {};

        const { bottom, left, right, top } = destroyBoundsOptions,
            { destroyBounds } = particle,
            canvasSize = container.canvas.size;

        if (bottom) {
            destroyBounds.bottom = (getRangeValue(bottom) * canvasSize.height) / percentDenominator;
        }

        if (left) {
            destroyBounds.left = (getRangeValue(left) * canvasSize.width) / percentDenominator;
        }

        if (right) {
            destroyBounds.right = (getRangeValue(right) * canvasSize.width) / percentDenominator;
        }

        if (top) {
            destroyBounds.top = (getRangeValue(top) * canvasSize.height) / percentDenominator;
        }
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed;
    }

    loadOptions(
        options: DestroyParticlesOptions,
        ...sources: (RecursivePartial<IDestroyParticlesOptions> | undefined)[]
    ): void {
        options.destroy ??= new Destroy();

        for (const source of sources) {
            options.destroy.load(source?.destroy);
        }
    }

    particleDestroyed(particle: DestroyParticle, override?: boolean): void {
        if (override) {
            return;
        }

        const destroyOptions = particle.options.destroy;

        if (destroyOptions?.mode === DestroyMode.split) {
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
