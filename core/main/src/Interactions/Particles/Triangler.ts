import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";

export class Triangler implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        return particle.particlesOptions.links.enable && particle.particlesOptions.links.triangles.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: Particle): void {
        const container = this.container;
        const p1Links = container.particles.getLinks(p1);

        for (let i = 0; i < p1Links.length - 1; i++) {
            const firstLink = p1Links[i];
            const secondLink = p1Links[i + 1];
            const p1FirstIndex = firstLink.edges.indexOf(p1);
            const p2 = firstLink.edges[(p1FirstIndex + 1) % 2];
            const p1SecondIndex = secondLink.edges.indexOf(p1);
            const p3 = secondLink.edges[(p1SecondIndex + 1) % 2];
            const thirdLink = container.particles.findLink(p2, p3);
            const triangleIndex = container.particles.findTriangleIndex(p1, p2, p3);
            const linksOptions = p1.particlesOptions.links;
            const trianglesOptions = linksOptions.triangles;

            if (triangleIndex < 0 && thirdLink && firstLink.visible && secondLink.visible && thirdLink.visible) {
                const triangle = container.particles.addTriangle(p1, p2, p3);

                triangle.opacity = trianglesOptions.opacity ?? linksOptions.opacity;
                triangle.visible = Math.random() > 1 - trianglesOptions.frequency;
            } else if (
                triangleIndex >= 0 &&
                (!thirdLink || !firstLink.visible || !secondLink.visible || !thirdLink.visible)
            ) {
                container.particles.removeTriangleAtIndex(triangleIndex);
            }
        }
    }
}
