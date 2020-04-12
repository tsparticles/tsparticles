import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IDimension } from "../../Interfaces/IDimension";
import { Particle } from "../Particle";
import { Utils } from "./Utils";
import { IParticle } from "../../Interfaces/IParticle";

/* This class essentially works by interpreting all particles on the screen as a grid.
Grid cells are determined by dividing the width and height by the cell size. so 1920 / 10 = 19 cells of width
Particles are pushed into their respective cells with the same method.

For small particles this is great, but i expect there will need to be allowances for larger particles.
See https://i.stack.imgur.com/1Gx63.png.

Hence the addition of the radius option for selecting objects in adjacent cells.
This also allows for broader detection for things like line drawing
*/

export class SpatialGrid {
    private cellSize: number;
    private widthSegment: number;
    private heightSegment: number;
    private grid: IParticle[][][] = [];

    // Cut the grid up into a 2d array with a 3rd dimesion holding the data.
    constructor(canvas: IDimension) {
        this.cellSize = 5;
        this.widthSegment = Math.round(canvas.width / this.cellSize);
        this.heightSegment = Math.round(canvas.height / this.cellSize);
    }

    // Add all particles
    public setGrid(particles: IParticle[], dimesion?: IDimension): void {
        const grid: IParticle[][][] = [];
        const widthSegment: number = dimesion?.width ? dimesion?.width / this.cellSize : this.widthSegment;
        const heightSegment: number = dimesion?.height ? dimesion?.height / this.cellSize : this.heightSegment;

        for (var i = 0; i < particles.length; i++) {
            const pos = this.index(particles[i].position);

            if (!Array.isArray(grid[pos.x])) grid[pos.x] = [];
            if (!Array.isArray(grid[pos.x][pos.y])) grid[pos.x][pos.y] = [];

            grid[pos.x][pos.y].push(particles[i]);
        }

        this.widthSegment = widthSegment;
        this.heightSegment = heightSegment;
        this.grid = grid;
    }

    // Query items in the same cell, good for small sized objects
    public queryInCell(position: ICoordinates): IParticle[] {
        const pos = this.index(position);

        if (Array.isArray(this.grid[pos.x][pos.y]))
            return this.grid[pos.x][pos.y] || [];

        else
            return [];
    }

    // Query items via a radius of the grid. Good for neighbour detection.
    public queryRadius(position: ICoordinates, radius: number): IParticle[] {
        const pos = this.index(position);
        const rad = this.radius({ x: radius, y: radius } as ICoordinates);
        const items = this.select(this.indexOp(pos, '-', rad), this.indexOp(pos, '+', rad)) as IParticle[];

        var out = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i] && Utils.getDistanceBetweenCoordinates(items[i].position, position) <= radius)
                out.push(items[i]);
        }

        return out;
    }

    // Select a broader area of the grid
    private select(start: ICoordinates, end: ICoordinates): IParticle[] {
        var out: IParticle[] = [];

        for (var x = start.x; x < end.x; x++) {
            if (!Array.isArray(this.grid[x])) continue;

            for (var y = start.y; y < end.y; y++) {
                if (!Array.isArray(this.grid[x][y])) continue;

                // Its unconventional but it is the marginally faster approach for adjoining arrays
                for (let i = 0; i < this.grid[x][y].length; i++)
                    if (this.grid[x][y][i] != null)
                        out[out.length + 1] = this.grid[x][y][i];
            }
        }

        return out;
    }

    // Determines the index of the position relative to the grid segments, handles both radius and positional indexes.
    private index(position: ICoordinates): ICoordinates {
        return {
            x: Math.round(position.x / this.widthSegment),
            y: Math.round(position.y / this.heightSegment)
        } as ICoordinates;
    }

    // Determines the index of the radius. NOTE that the rounding operations are different.
    private radius(radius: ICoordinates): ICoordinates {
        return {
            x: Math.ceil(radius.x / this.widthSegment),
            y: Math.ceil(radius.y / this.heightSegment)
        } as ICoordinates;
    }

    // Its basically a binary operator for the coordinates interface.
    private indexOp(left: ICoordinates, op: string, right: ICoordinates): ICoordinates {
        if (op == '+')
            return {
                x: this.clamp(left.x + right.x),
                y: this.clamp(left.y + right.y)
            } as ICoordinates;
        else
            return {
                x: this.clamp(left.x - right.x),
                y: this.clamp(left.y - right.y)
            } as ICoordinates;
    }

    // The fastest way to clamp a number between a minimum and maximum
    private clamp(num: number): number {
        return num <= 0 ? 0 : num >= this.cellSize ? this.cellSize : num;
    }
}
