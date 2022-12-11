import {
    ExternalInteractorBase,
    HoverMode,
    drawLine,
    getDistance,
    getLinkColor,
    getLinkRandomColor,
    getStyleFromRgb,
    isInArray,
    mouseMoveEvent,
} from "tsparticles-engine";
import type { GrabContainer, GrabMode, IGrabMode } from "./Types";
import type { ICoordinates, IModes, IRgb, Modes, OptionsColor, Particle, RecursivePartial } from "tsparticles-engine";
import { Grab } from "./Options/Classes/Grab";

type LinkParticle = Particle & {
    options: {
        links?: {
            color?: OptionsColor;
        };
    };
    retina: {
        linksWidth?: number;
    };
};

/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 */
export function drawGrabLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    colorLine: IRgb,
    opacity: number
): void {
    drawLine(context, begin, end);

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
}

function drawGrab(
    container: GrabContainer,
    particle: LinkParticle,
    lineColor: IRgb,
    opacity: number,
    mousePos: ICoordinates
): void {
    container.canvas.draw((ctx) => {
        const beginPos = particle.getPosition();

        drawGrabLine(ctx, particle.retina.linksWidth ?? 0, beginPos, mousePos, lineColor, opacity);
    });
}

/**
 * Particle grab manager
 * @category Interactions
 */
export class Grabber extends ExternalInteractorBase<GrabContainer> {
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

    async interact(): Promise<void> {
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

        if (!distance || distance < 0) {
            return;
        }

        const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) =>
            this.isEnabled(p)
        ) as LinkParticle[];

        for (const particle of query) {
            /*
               draw a line between the cursor and the particle
               if the distance between them is under the config distance
            */
            const pos = particle.getPosition(),
                pointDistance = getDistance(pos, mousePos);

            if (pointDistance > distance) {
                continue;
            }

            const grabLineOptions = interactivity.modes.grab.links,
                lineOpacity = grabLineOptions.opacity,
                opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;

            if (opacityLine <= 0) {
                continue;
            }

            const optColor = grabLineOptions.color ?? particle.options.links?.color;

            if (!container.particles.grabLineColor && optColor) {
                const linksOptions = interactivity.modes.grab.links;

                container.particles.grabLineColor = getLinkRandomColor(
                    optColor,
                    linksOptions.blink,
                    linksOptions.consent
                );
            }

            const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

            if (!colorLine) {
                return;
            }

            drawGrab(container, particle, colorLine, opacityLine, mousePos);
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        return events.onHover.enable && !!mouse.position && isInArray(HoverMode.grab, events.onHover.mode);
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
