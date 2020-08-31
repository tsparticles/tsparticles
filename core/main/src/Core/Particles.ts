import type { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/IRgb";
import { Particle } from "./Particle";
import { Point, QuadTree, Rectangle, Utils } from "../Utils";
import type { RecursivePartial } from "../Types";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import { InteractionManager } from "./Particle/InteractionManager";
import type { IDelta } from "./Interfaces/IDelta";
import type { ILink, ILinkTriangle } from "./Interfaces/ILink";
import type { IParticle } from "./Interfaces/IParticle";

/**
 * Particles manager
 * @category Core
 */
export class Particles {
    public get count(): number {
        return this.array.length;
    }

    public quadTree;
    //public spatialGrid;
    public linksColors;

    public array: Particle[];
    public links: ILink[];
    public triangles: ILinkTriangle[];
    public pushing?: boolean;
    public linksColor?: IRgb | string;
    public grabLineColor?: IRgb | string;

    private interactionManager;
    private nextId;

    constructor(private readonly container: Container) {
        this.nextId = 0;
        this.array = [];
        this.links = [];
        this.triangles = [];
        this.interactionManager = new InteractionManager(container);

        const canvasSize = this.container.canvas.size;

        this.linksColors = new Map<string, IRgb | string | undefined>();
        this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
        //this.spatialGrid = new SpatialGrid(this.container.canvas.size);
    }

    /* --------- tsParticles functions - particles ----------- */
    public init(): void {
        this.links = [];
        this.triangles = [];
        const container = this.container;
        const options = container.options;
        let handled = false;

        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }

            if (handled) {
                break;
            }
        }

        if (!handled) {
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }

        if (options.infection.enable) {
            for (let i = 0; i < options.infection.infections; i++) {
                const notInfected = this.array.filter((p) => p.infecter.infectionStage === undefined);
                const infected = Utils.itemFromArray(notInfected);

                infected.infecter.startInfection(0);
            }
        }

        this.interactionManager.init();

        container.noise.init();
    }

    public redraw(): void {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }

    public removeAt(index: number, quantity?: number): void {
        if (index >= 0 && index <= this.count) {
            for (const particle of this.array.splice(index, quantity ?? 1)) {
                particle.destroy();
            }
        }
    }

    public remove(particle: Particle): void {
        this.removeAt(this.array.indexOf(particle));
    }

    public update(delta: IDelta): void {
        const container = this.container;
        const particlesToDelete = [];

        container.noise.update();

        for (const particle of this.array) {
            // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
            //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
            // let f = -BANG_SIZE / d;
            // if ( d < BANG_SIZE ) {
            //     let t = Math.atan2( dy, dx );
            //     p.vx = f * Math.cos(t);
            //     p.vy = f * Math.sin(t);
            // }

            particle.move(delta);

            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }

            //container.particles.spatialGrid.insert(particle);

            this.quadTree.insert(new Point(particle.getPosition(), particle));
        }

        for (const particle of particlesToDelete) {
            this.remove(particle);
        }

        this.interactionManager.externalInteract(delta);

        // this loop is required to be done after mouse interactions
        for (const particle of this.container.particles.array) {
            particle.update(delta);

            if (!particle.destroyed && !particle.spawning) {
                this.interactionManager.particlesInteract(particle, delta);
            }
        }
    }

    public draw(delta: IDelta): void {
        const container = this.container;

        /* clear canvas */
        container.canvas.clear();

        const canvasSize = this.container.canvas.size;

        this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);

        /* update each particles param */
        //this.spatialGrid.init(this.container.canvas.size);
        this.update(delta);
        //this.spatialGrid.setGrid(this.array, this.container.canvas.size);

        /* draw polygon shape in debug mode */
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }

        /*if (container.canvas.context) {
        this.quadTree.draw(container.canvas.context);
    }*/

        container.canvas.drawLinks();
        container.canvas.drawLinkTriangles();

        /* draw each particle */
        for (const p of this.array) {
            p.draw(delta);
        }
    }

    /**
     * Removes all particles from the array
     */
    public clear(): void {
        this.array = [];
    }

    /* ---------- tsParticles functions - modes events ------------ */
    public push(nb: number, mouse?: IMouseData, overrideOptions?: RecursivePartial<IParticles>): void {
        const container = this.container;
        const options = container.options;
        const limit = options.particles.number.limit * container.density;

        this.pushing = true;

        if (limit > 0) {
            const countToRemove = this.count + nb - limit;

            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }

        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse?.position, overrideOptions);
        }

        if (!options.particles.move.enable) {
            this.container.play();
        }

        this.pushing = false;
    }

    public addParticle(position?: ICoordinates, overrideOptions?: RecursivePartial<IParticles>): Particle | undefined {
        try {
            const particle = new Particle(this.nextId, this.container, position, overrideOptions);

            this.array.push(particle);

            this.nextId++;

            return particle;
        } catch {
            console.warn("error adding particle");

            return;
        }
    }

    public removeQuantity(quantity: number): void {
        const options = this.container.options;

        this.removeAt(0, quantity);

        if (!options.particles.move.enable) {
            this.container.play();
        }
    }

    public findLink(source: IParticle, destination: IParticle): ILink | undefined {
        return this.links.find((l) => l.edges.includes(source) && l.edges.includes(destination));
    }

    public findLinkIndex(source: IParticle, destination: IParticle): number {
        return this.links.findIndex((l) => l.edges.includes(source) && l.edges.includes(destination));
    }

    public addLink(source: IParticle, destination: IParticle): ILink {
        let link = this.findLink(source, destination);

        if (!link) {
            link = {
                edges: [source, destination],
                opacity: 1,
                visible: true,
            };

            this.links.push(link);
        }

        return link;
    }

    public getLinks(particle: IParticle): ILink[] {
        return this.links.filter((l) => l.edges.includes(particle));
    }

    public removeLink(source: IParticle, destination: IParticle): void {
        this.removeLinkAtIndex(this.findLinkIndex(source, destination));
    }

    public removeExactLink(link: ILink): void {
        this.removeLinkAtIndex(this.links.indexOf(link));
    }

    public removeLinkAtIndex(index: number): void {
        if (index >= 0) {
            this.links.splice(index, 1);
        }
    }

    public removeLinks(particle: IParticle): void {
        for (const link of this.links) {
            if (!link.edges.includes(particle)) {
                continue;
            }

            this.removeExactLink(link);
        }
    }

    public findTriangle(v1: IParticle, v2: IParticle, v3: IParticle): ILinkTriangle | undefined {
        return this.triangles.find(
            (l) => l.vertices.includes(v1) && l.vertices.includes(v2) && l.vertices.includes(v3)
        );
    }

    public findTriangleIndex(v1: IParticle, v2: IParticle, v3: IParticle): number {
        return this.triangles.findIndex(
            (l) => l.vertices.includes(v1) && l.vertices.includes(v2) && l.vertices.includes(v3)
        );
    }

    public addTriangle(v1: IParticle, v2: IParticle, v3: IParticle): ILinkTriangle {
        let triangle = this.findTriangle(v1, v2, v3);

        if (!triangle) {
            triangle = {
                vertices: [v1, v2, v3],
                opacity: 1,
                visible: true,
            };

            this.triangles.push(triangle);
        }

        return triangle;
    }

    public getTriangles(v1: IParticle, v2?: IParticle): ILinkTriangle[] {
        return this.triangles.filter((l) => l.vertices.includes(v1) && (!v2 || l.vertices.includes(v2)));
    }

    public removeTriangle(v1: IParticle, v2: IParticle, v3: IParticle): void {
        this.removeTriangleAtIndex(this.findTriangleIndex(v1, v2, v3));
    }

    public removeExactTriangle(triangle: ILinkTriangle): void {
        this.removeLinkAtIndex(this.triangles.indexOf(triangle));
    }

    public removeTriangleAtIndex(index: number): void {
        if (index >= 0) {
            this.triangles.splice(index, 1);
        }
    }

    public removeTriangles(v1: IParticle, v2?: IParticle): void {
        for (const triangle of this.triangles) {
            if (!triangle.vertices.includes(v1) || (v2 && !triangle.vertices.includes(v2))) {
                continue;
            }

            this.removeExactTriangle(triangle);
        }
    }
}
