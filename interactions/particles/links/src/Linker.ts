import { Circle, ParticlesInteractorBase, getDistance, getLinkRandomColor } from "tsparticles-engine";
import type { ICoordinates, IDimension, IRgb, RecursivePartial } from "tsparticles-engine";
import { CircleWarp } from "./CircleWarp";
import type { IParticlesLinkOptions } from "./Options/Interfaces/IParticlesLinkOptions";
import type { LinkContainer } from "./LinkContainer";
import type { LinkParticle } from "./LinkParticle";
import { Links } from "./Options/Classes/Links";
import type { ParticlesLinkOptions } from "./Options/Classes/ParticlesLinkOptions";

function getLinkDistance(
    pos1: ICoordinates,
    pos2: ICoordinates,
    optDistance: number,
    canvasSize: IDimension,
    warp: boolean
): number {
    let distance = getDistance(pos1, pos2);

    if (!warp || distance <= optDistance) {
        return distance;
    }

    const pos2NE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y,
    };

    distance = getDistance(pos1, pos2NE);

    if (distance <= optDistance) {
        return distance;
    }

    const pos2SE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y - canvasSize.height,
    };

    distance = getDistance(pos1, pos2SE);

    if (distance <= optDistance) {
        return distance;
    }

    const pos2SW = {
        x: pos2.x,
        y: pos2.y - canvasSize.height,
    };

    distance = getDistance(pos1, pos2SW);

    return distance;
}

export class Linker extends ParticlesInteractorBase {
    linkContainer: LinkContainer;

    constructor(container: LinkContainer) {
        super(container);

        this.linkContainer = container;
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        this.linkContainer.particles.linksColor = undefined;
        this.linkContainer.particles.linksColors = new Map<string, IRgb | string | undefined>();
    }

    async interact(p1: LinkParticle): Promise<void> {
        if (!p1.options.links) {
            return;
        }

        p1.links = [];

        const pos1 = p1.getPosition(),
            container = this.container,
            canvasSize = container.canvas.size;

        if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
            return;
        }

        const linkOpt1 = p1.options.links,
            optOpacity = linkOpt1.opacity,
            optDistance = p1.retina.linksDistance ?? 0,
            warp = linkOpt1.warp,
            range = warp
                ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
                : new Circle(pos1.x, pos1.y, optDistance),
            query = container.particles.quadTree.query(range) as LinkParticle[];

        for (const p2 of query) {
            const linkOpt2 = p2.options.links;

            if (
                p1 === p2 ||
                !linkOpt2?.enable ||
                linkOpt1.id !== linkOpt2.id ||
                p2.spawning ||
                p2.destroyed ||
                !p2.links ||
                p1.links.map((t) => t.destination).indexOf(p2) !== -1 ||
                p2.links.map((t) => t.destination).indexOf(p1) !== -1
            ) {
                continue;
            }

            const pos2 = p2.getPosition();

            if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                continue;
            }

            const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

            if (distance > optDistance) {
                return;
            }

            /* draw a line between p1 and p2 */
            const opacityLine = (1 - distance / optDistance) * optOpacity;

            this.setColor(p1);

            p1.links.push({
                destination: p2,
                opacity: opacityLine,
            });
        }
    }

    isEnabled(particle: LinkParticle): boolean {
        return !!particle.options.links?.enable;
    }

    loadParticlesOptions(
        options: ParticlesLinkOptions,
        ...sources: (RecursivePartial<IParticlesLinkOptions> | undefined)[]
    ): void {
        if (!options.links) {
            options.links = new Links();
        }

        for (const source of sources) {
            options.links.load(source?.links ?? source?.lineLinked ?? source?.line_linked);
        }
    }

    reset(): void {
        // do nothing
    }

    private setColor(p1: LinkParticle): void {
        if (!p1.options.links) {
            return;
        }

        const container = this.linkContainer,
            linksOptions = p1.options.links;

        let linkColor =
            linksOptions.id === undefined
                ? container.particles.linksColor
                : container.particles.linksColors.get(linksOptions.id);

        if (linkColor) {
            return;
        }

        const optColor = linksOptions.color;

        linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);

        if (linksOptions.id === undefined) {
            container.particles.linksColor = linkColor;
        } else {
            container.particles.linksColors.set(linksOptions.id, linkColor);
        }
    }
}
