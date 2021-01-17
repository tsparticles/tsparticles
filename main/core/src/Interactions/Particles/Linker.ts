import type { Container } from "../../Core/Container";
import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IDimension } from "../../Core/Interfaces/IDimension";
import { ParticlesInteractorBase } from "../../Core/ParticlesInteractorBase";
import { Circle, CircleWarp, getDistance, getLinkRandomColor } from "../../Utils";

export class Linker extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container, "linker");
    }

    public isEnabled(particle: IParticle): boolean {
        return particle.options.links.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: IParticle): void {
        const container = this.container;
        const linkOpt1 = p1.options.links;
        const optOpacity = linkOpt1.opacity;
        const optDistance = p1.linksDistance ?? container.retina.linksDistance;
        const canvasSize = container.canvas.size;
        const warp = linkOpt1.warp;
        const pos1 = p1.getPosition();

        const range = warp
            ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new Circle(pos1.x, pos1.y, optDistance);

        const query = container.particles.quadTree.query(range);

        for (const p2 of query) {
            const linkOpt2 = p2.options.links;

            if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed) {
                continue;
            }

            const pos2 = p2.getPosition();
            const distance = this.getDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

            if (distance > optDistance) {
                return;
            }

            /* draw a line between p1 and p2 */
            const opacityLine = (1 - distance / optDistance) * optOpacity;

            this.setColor(p1);

            if (
                p2.links.map((t) => t.destination).indexOf(p1) === -1 &&
                p1.links.map((t) => t.destination).indexOf(p2) === -1
            ) {
                p1.links.push({
                    destination: p2,
                    opacity: opacityLine,
                });
            }
        }
    }

    private setColor(p1: IParticle): void {
        const container = this.container;
        const linksOptions = p1.options.links;

        let linkColor =
            linksOptions.id === undefined
                ? container.particles.linksColor
                : container.particles.linksColors.get(linksOptions.id);

        if (!linkColor) {
            const optColor = linksOptions.color;

            linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);

            if (linksOptions.id === undefined) {
                container.particles.linksColor = linkColor;
            } else {
                container.particles.linksColors.set(linksOptions.id, linkColor);
            }
        }
    }

    private getDistance(
        pos1: ICoordinates,
        pos2: ICoordinates,
        optDistance: number,
        canvasSize: IDimension,
        warp: boolean
    ): number {
        let distance = getDistance(pos1, pos2);

        if (distance <= optDistance || !warp) {
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
}
