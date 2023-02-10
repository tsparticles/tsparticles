import type {
    Container,
    Engine,
    IBounds,
    IParticleUpdater,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import {
    SizeMode,
    getRangeValue,
    getValue,
    itemFromSingleOrMultiple,
    loadParticlesOptions,
    randomInRange,
    setRangeValue,
} from "tsparticles-engine";
import { Destroy } from "./Options/Classes/Destroy";
import { DestroyMode } from "./Enums/DestroyMode";
import type { IDestroy } from "./Options/Interfaces/IDestroy";

type IDestroyParticlesOptions = IParticlesOptions & {
    destroy?: IDestroy;
};

type DestroyParticlesOptions = ParticlesOptions & {
    destroy?: Destroy;
};

type DestroyParticle = Particle & {
    destroyBounds?: Partial<IBounds>;
    options: DestroyParticlesOptions;
    /**
     * Sets the count of particles created when destroyed with split mode
     */
    splitCount?: number;
};

export class DestroyUpdater implements IParticleUpdater {
    constructor(private readonly engine: Engine, private readonly container: Container) {}

    init(particle: DestroyParticle): void {
        const container = this.container,
            particlesOptions = particle.options,
            destroyOptions = particlesOptions.destroy;

        if (!destroyOptions) {
            return;
        }

        particle.splitCount = 0;

        const destroyBounds = destroyOptions.bounds;

        if (!particle.destroyBounds) {
            particle.destroyBounds = {};
        }

        if (destroyBounds.bottom) {
            particle.destroyBounds.bottom = (getRangeValue(destroyBounds.bottom) * container.canvas.size.height) / 100;
        }

        if (destroyBounds.left) {
            particle.destroyBounds.left = (getRangeValue(destroyBounds.left) * container.canvas.size.width) / 100;
        }

        if (destroyBounds.right) {
            particle.destroyBounds.right = (getRangeValue(destroyBounds.right) * container.canvas.size.width) / 100;
        }

        if (destroyBounds.top) {
            particle.destroyBounds.top = (getRangeValue(destroyBounds.top) * container.canvas.size.height) / 100;
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
            this.split(particle);
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

    private addSplitParticle(
        parent: DestroyParticle,
        splitParticlesOptions?: RecursivePartial<IParticlesOptions>
    ): Particle | undefined {
        const destroyOptions = parent.options.destroy;

        if (!destroyOptions) {
            return;
        }

        const splitOptions = destroyOptions.split,
            options = loadParticlesOptions(this.engine, this.container, parent.options),
            factor = getValue(splitOptions.factor),
            parentColor = parent.getFillColor();

        if (splitOptions.color) {
            options.color.load(splitOptions.color);
        } else if (splitOptions.colorOffset && parentColor) {
            options.color.load({
                value: {
                    hsl: {
                        h: parentColor.h + getRangeValue(splitOptions.colorOffset.h ?? 0),
                        s: parentColor.s + getRangeValue(splitOptions.colorOffset.s ?? 0),
                        l: parentColor.l + getRangeValue(splitOptions.colorOffset.l ?? 0),
                    },
                },
            });
        } else {
            options.color.load({
                value: {
                    hsl: parent.getFillColor(),
                },
            });
        }

        options.move.load({
            center: {
                x: parent.position.x,
                y: parent.position.y,
                mode: SizeMode.precise,
                //radius: parent.size.value,
            },
        });

        if (typeof options.size.value === "number") {
            options.size.value /= factor;
        } else {
            options.size.value.min /= factor;
            options.size.value.max /= factor;
        }

        options.load(splitParticlesOptions);

        const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0,
            position = {
                x: parent.position.x + randomInRange(offset),
                y: parent.position.y + randomInRange(offset),
            };

        return this.container.particles.addParticle(position, options, parent.group, (particle: DestroyParticle) => {
            if (particle.size.value < 0.5) {
                return false;
            }

            particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
            particle.splitCount = (parent.splitCount ?? 0) + 1;
            particle.unbreakable = true;

            setTimeout(() => {
                particle.unbreakable = false;
            }, 500);

            return true;
        });
    }

    private split(particle: DestroyParticle): void {
        const destroyOptions = particle.options.destroy;

        if (!destroyOptions) {
            return;
        }

        const splitOptions = destroyOptions.split;

        if (
            splitOptions.count >= 0 &&
            (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)
        ) {
            return;
        }

        const rate = getValue(splitOptions.rate),
            particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);

        for (let i = 0; i < rate; i++) {
            this.addSplitParticle(particle, particlesSplitOptions);
        }
    }
}
