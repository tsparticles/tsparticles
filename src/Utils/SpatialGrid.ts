import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDimension } from "../Core/Interfaces/IDimension";
import { Utils } from "./Utils";
import type { Particle } from "../Core/Particle";


/* This class essentially works by interpreting all particles on the screen as a grid.
Grid cells are determined by dividing the width and height by the cell size. so 1920 / 10 = 19 cells of width
Particles are pushed into their respective cells with the same method.

Before refactoring understand this code is written with an emphasis on speed and efficiency.
This is because this system is responsible for neighbour detection. Meaning
any changes to the efficiency to this code will exponentially change the efficiency
of the system.
*/

export class SpatialGrid {
    private readonly cellSize: number;
    private widthSegment: number;
    private heightSegment: number;
    private grid: Particle[][][] = [];

    // Cut the grid up into a 2d array with a 3rd dimension holding the data.
    constructor(canvas: IDimension) {
        this.cellSize = 20;
        this.widthSegment = Math.round(canvas.width / this.cellSize);
        this.heightSegment = Math.round(canvas.height / this.cellSize);
    }

    public init(dimension?: IDimension): void {
        this.widthSegment = dimension?.width ? dimension?.width / this.cellSize : this.widthSegment;
        this.heightSegment = dimension?.height ? dimension?.height / this.cellSize : this.heightSegment;
        this.grid = [];
    }

    /**
     * Sets the spatial grid. (This is for use in the update loop in Particles.ts)
     * @param particles the particles array
     * @param dimension The current canvas dimensions
     */
    public setGrid(particles: Particle[], dimension?: IDimension): void {
        this.init(dimension);

        for (const particle of particles) {
            this.insert(particle);
        }
    }

    public insert(particle: Particle) {
        const pos = particle.getPosition();
        const posIndex = this.index(pos);

        if (!Array.isArray(this.grid[posIndex.x])) this.grid[posIndex.x] = [];
        if (!Array.isArray(this.grid[posIndex.x][posIndex.y])) this.grid[posIndex.x][posIndex.y] = [];

        this.grid[posIndex.x][posIndex.y].push(particle);
    }


    /**
     * Returns all particles in the same grid cell as the position.
     * For more flexible checking see: QueryRadius()
     * @param position The query position
     */
    public queryInCell(position: ICoordinates): Particle[] {
        const pos = this.index(position);

        return Array.isArray(this.grid[pos.x]) && Array.isArray(this.grid[pos.x][pos.y]) ?
            this.grid[pos.x][pos.y] || [] : [];
    }

    /**
     * Returns all items on the canvas inside the radius relative to the position
     * @param position The query position
     * @param radius The radius around the position
     */
    public queryRadius(position: ICoordinates, radius: number): Particle[] {
        const pos = this.index(position);
        const rad = this.radius({ x: radius, y: radius } as ICoordinates);
        const items = this.select(this.indexOp(pos, '-', rad), this.indexOp(pos, '+', rad));
        const out = [];

        for (const item of items) {
            const itemPos = item.getPosition();

            if (Utils.getDistance(itemPos, position) <= radius) {
                out.push(item);
            }
        }

        return out;
    }

    /**
     * Returns all items on the canvas inside the radius relative to the position included with their distance.
     * @param position The query position
     * @param radius The radius around the position
     */
    public queryRadiusWithDistance(position: ICoordinates, radius: number): {
        distance: number,
        particle: Particle,
    }[] {
        const pos = this.index(position);
        const rad = this.radius({ x: radius, y: radius });
        const items = this.select(this.indexOp(pos, '-', rad), this.indexOp(pos, '+', rad));
        const out = [];

        for (const item of items) {
            const itemPos = item.getPosition();

            const distance = Utils.getDistance(itemPos, position);

            if (distance <= radius) {
                out.push({
                    distance: distance,
                    particle: item,
                });
            }
        }

        return out;
    }


    /**
     * Iterates and returns all values inside the provided X,Y coordinates
     * NOTE: The ICoordinates need to be provided as an index, see index()
     * This function is only for internal use.
     * @param start The starting X,Y indexes for the selection
     * @param end The ending X,Y indexes for the selection
     */
    private select(start: ICoordinates, end: ICoordinates): Particle[] {
        const out: Particle[] = [];

        for (let x = start.x; x <= end.x; x++) {
            if (!Array.isArray(this.grid[x])) {
                continue;
            }

            for (let y = start.y; y <= end.y; y++) {
                if (!Array.isArray(this.grid[x][y])) {
                    continue;
                }

                // Its unconventional but it is the marginally faster approach for adjoining arrays
                for (const item of this.grid[x][y]) {
                    out.push(item);
                }
            }
        }

        return out;
    }


    /**
     * Determines the grid indexes based on the given positional coordinates
     * This code relies on the segment values stored in this class.
     * @param position The plain X,Y coordinates to convert.
     */
    private index(position: ICoordinates): ICoordinates {
        return {
            x: Math.round(position.x / this.widthSegment),
            y: Math.round(position.y / this.heightSegment),
        };
    }

    /**
     * Determines the grid indexes based on the given radius
     * This code relies on the segment values stored in this class.
     * @param radius The plain X,Y coordinates to convert.
     */
    private radius(radius: ICoordinates): ICoordinates {
        return {
            x: Math.ceil(radius.x / this.widthSegment),
            y: Math.ceil(radius.y / this.heightSegment),
        };
    }

    /**
     * Does basic operations on ICoordinates based on the provided operator.
     * @param left The left hand side of the equation
     * @param op The desired operation
     * @param right The right hand side of the equation
     */
    private indexOp(left: ICoordinates, op: string, right: ICoordinates): ICoordinates {
        if (op == '+') {
            return {
                x: this.clamp(left.x + right.x),
                y: this.clamp(left.y + right.y),
            };
        } else {
            return {
                x: this.clamp(left.x - right.x),
                y: this.clamp(left.y - right.y),
            };
        }
    }

    /**
     * Clamps a number between 0, and the maximum cell size to ensure that
     * selections happen inside the grid space
     * @param num The number to clamp
     */
    private clamp(num: number): number {
        return Utils.clamp(num, 0, this.cellSize);
    }
}
