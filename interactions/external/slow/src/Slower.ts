import { ExternalInteractorBase, HoverMode, getDistance, isInArray } from "tsparticles-engine";
import type { IDelta, IModes, Modes, Particle, RecursivePartial } from "tsparticles-engine";
import type { ISlowMode, SlowContainer, SlowMode } from "./Types";
import { Slow } from "./Options/Classes/Slow";

/**
 * Particle slow manager
 * @category Interactions
 */
export class Slower extends ExternalInteractorBase<SlowContainer> {
    constructor(container: SlowContainer) {
        super(container);
    }

    clear(particle: Particle, delta: IDelta, force?: boolean): void {
        if (particle.slow.inRange && !force) {
            return;
        }

        particle.slow.factor = 1;
    }

    init(): void {
        const container = this.container,
            slow = container.actualOptions.interactivity.modes.slow;

        if (!slow) {
            return;
        }

        container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
    }

    async interact(): Promise<void> {
        // nothing to do
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        return events.onHover.enable && !!mouse.position && isInArray(HoverMode.slow, events.onHover.mode);
    }

    loadModeOptions(options: Modes & SlowMode, ...sources: RecursivePartial<(IModes & ISlowMode) | undefined>[]): void {
        if (!options.slow) {
            options.slow = new Slow();
        }

        for (const source of sources) {
            options.slow.load(source?.slow);
        }
    }

    reset(particle: Particle): void {
        particle.slow.inRange = false;

        const container = this.container,
            options = container.actualOptions,
            mousePos = container.interactivity.mouse.position,
            radius = container.retina.slowModeRadius,
            slow = options.interactivity.modes.slow;

        if (!slow || !radius || radius < 0 || !mousePos) {
            return;
        }

        const particlePos = particle.getPosition(),
            dist = getDistance(mousePos, particlePos),
            proximityFactor = dist / radius,
            slowFactor = slow.factor;

        if (dist <= radius) {
            particle.slow.inRange = true;
            particle.slow.factor = proximityFactor / slowFactor;
        }
    }
}
