import type { ConnectContainer, ConnectMode, IConnectMode } from "./Types.js";
import {
    ExternalInteractorBase,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    isInArray,
} from "@tsparticles/engine";
import { Connect } from "./Options/Classes/Connect.js";
import { drawConnection } from "./Utils.js";

const connectMode = "connect",
    minDistance = 0;

/**
 * Particle connection manager
 */
export class Connector extends ExternalInteractorBase<ConnectContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: ConnectContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            connect = container.actualOptions.interactivity.modes.connect;

        if (!connect) {
            return;
        }

        container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
        container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
    }

    /**
     * Connecting particles on hover interactivity
     */
    interact(): void {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
            const mousePos = container.interactivity.mouse.position,
                { connectModeDistance, connectModeRadius } = container.retina;

            if (
                !connectModeDistance ||
                connectModeDistance < minDistance ||
                !connectModeRadius ||
                connectModeRadius < minDistance ||
                !mousePos
            ) {
                return;
            }

            const distance = Math.abs(connectModeRadius),
                query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));

            query.forEach((p1, i) => {
                const pos1 = p1.getPosition(),
                    indexOffset = 1;

                for (const p2 of query.slice(i + indexOffset)) {
                    const pos2 = p2.getPosition(),
                        distMax = Math.abs(connectModeDistance),
                        xDiff = Math.abs(pos1.x - pos2.x),
                        yDiff = Math.abs(pos1.y - pos2.y);

                    if (xDiff < distMax && yDiff < distMax) {
                        drawConnection(container, p1, p2);
                    }
                }
            });
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(connectMode, events.onHover.mode);
    }

    loadModeOptions(
        options: Modes & ConnectMode,
        ...sources: RecursivePartial<(IModes & IConnectMode) | undefined>[]
    ): void {
        if (!options.connect) {
            options.connect = new Connect();
        }

        for (const source of sources) {
            options.connect.load(source?.connect);
        }
    }

    reset(): void {
        // do nothing
    }
}
