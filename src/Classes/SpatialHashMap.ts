import { Particle } from "./Particle";
import { Utils } from "./Utils/Utils";
import { ICoordinates } from "./../Interfaces/ICoordinates";
import { Container } from "./Container";

export class SpatialHashMap {
    private readonly container: Container;

    private grid: Particle[][];

    constructor(container: Container) {
        this.container = container;
        this.grid = [];
    }

    public init(): void {
        const container = this.container;
        const dimension = container.canvas.dimension;

        this.grid = new Array(dimension.width * dimension.height).fill(null).map(() => []);
    }

    public clear(): void {
        this.grid.forEach(cell => {
            cell.splice(0);
        });
    }

    public add(particle: Particle): void {
        const dimension = this.container.canvas.dimension;
        const pos = {
            x: Utils.clamp(Math.round(particle.position.x), 0, dimension.width - 1),
            y: Utils.clamp(Math.round(particle.position.y), 0, dimension.height - 1),
        };
        const index = pos.x + pos.y * dimension.width;

        this.grid[index].push(particle);
    }

    public remove(particle: Particle): void {
        const dimension = this.container.canvas.dimension;
        const pos = {
            x: Utils.clamp(Math.round(particle.position.x), 0, dimension.width - 1),
            y: Utils.clamp(Math.round(particle.position.y), 0, dimension.height - 1),
        };
        const index = pos.x + pos.y * dimension.width;
        const space = this.grid[index];

        space.splice(space.indexOf(particle), 1);
    }

    public query(position: ICoordinates, radius?: number): Particle[] {
        const dimension = this.container.canvas.dimension;

        if (radius) {
            return this.queryWithRadius(position, radius);
        }

        const pos = {
            x: Utils.clamp(Math.round(position.x), 0, dimension.width - 1),
            y: Utils.clamp(Math.round(position.y), 0, dimension.height - 1),
        };
        const index = pos.x + pos.y * dimension.width;

        return this.grid[index];
    }

    public queryWithRadius(position: ICoordinates, radius: number): Particle[] {
        const bounds = Utils.calculateBounds(position, radius);
        const dimension = this.container.canvas.dimension;

        bounds.left = Math.max(bounds.left, 0);
        bounds.right = Math.min(bounds.right, dimension.width - 1);
        bounds.bottom = Math.max(bounds.bottom, 0);
        bounds.top = Math.min(bounds.top, dimension.height - 1);

        const result = [];

        for (let i = bounds.left; i <= bounds.right; i++) {
            for (let j = bounds.top; j <= bounds.bottom; j++) {
                const query = this.query({
                    x: i,
                    y: j,
                });

                for (let k = 0; k < query.length; k++) {
                    result.push(query[k]);
                }
            }
        }

        return result;
    }
}