import {
    ExternalInteractorBase,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    getDistance,
    getLinkColor,
    getLinkRandomColor,
    isInArray,
    mouseMoveEvent,
} from "@tsparticles/engine";
import type { GrabContainer, GrabMode, IGrabMode, LinkParticle } from "./Types.js";
import { Grab } from "./Options/Classes/Grab.js";
import { drawGrab } from "./Utils.js";

const grabMode = "grab",
    minDistance = 0,
    minOpacity = 0;

/**
 * Particle grab manager
 */
export class Grabber extends ExternalInteractorBase<GrabContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: GrabContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            grab = container.actualOptions.interactivity.modes.grab;

        if (!grab) {
            return;
        }

        container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
    }

    interact(): void {
        const container = this.container,
            options = container.actualOptions,
            interactivity = options.interactivity;

        if (
            !interactivity.modes.grab ||
            !interactivity.events.onHover.enable ||
            container.interactivity.status !== mouseMoveEvent
        ) {
            return;
        }

        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const distance = container.retina.grabModeDistance;

        if (!distance || distance < minDistance) {
            return;
        }

        const query = container.particles.quadTree.queryCircle(mousePos, distance, p =>
            this.isEnabled(p),
        ) as LinkParticle[];

        for (const particle of query) {
            /**
             * draw a line between the cursor and the particle
             * if the distance between them is under the config distance
             */
            const pos = particle.getPosition(),
                pointDistance = getDistance(pos, mousePos);

            if (pointDistance > distance) {
                continue;
            }

            const grabLineOptions = interactivity.modes.grab.links,
                lineOpacity = grabLineOptions.opacity,
                opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;

            if (opacityLine <= minOpacity) {
                continue;
            }

            const optColor = grabLineOptions.color ?? particle.options.links?.color;

            if (!container.particles.grabLineColor && optColor) {
                const linksOptions = interactivity.modes.grab.links;

                container.particles.grabLineColor = getLinkRandomColor(
                    optColor,
                    linksOptions.blink,
                    linksOptions.consent,
                );
            }

            const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

            if (!colorLine) {
                continue;
            }

            drawGrab(container, particle, colorLine, opacityLine, mousePos);
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        return events.onHover.enable && !!mouse.position && isInArray(grabMode, events.onHover.mode);
    }

    loadModeOptions(options: Modes & GrabMode, ...sources: RecursivePartial<(IModes & IGrabMode) | undefined>[]): void {
        if (!options.grab) {
            options.grab = new Grab();
        }

        for (const source of sources) {
            options.grab.load(source?.grab);
        }
    }

    reset(): void {
        // do nothing
    }
}
