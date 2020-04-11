import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IDimension } from "../../Interfaces/IDimension";
import { Particle } from "../Particle";
import { Utils } from "./Utils";

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
    private grid: object[][][] = [];

    // Cut the grid up into a 2d array with a 3rd dimesion holding the data.
    constructor(canvas: IDimension, cellSize: number) {
        this.cellSize = cellSize;
        this.widthSegment = Math.round(canvas.width / this.cellSize);
        this.heightSegment = Math.round(canvas.height / this.cellSize);
    }

    // Bulk load all particles
    public addParticles(particles: Particle[]): void {
        for (const particle of particles) this.addParticle(particle);
    }

    // Add one individual particle
    public addParticle(particle: Particle): void {
        const ix = Math.round(particle.position.x / this.widthSegment);
        const iy = Math.round(particle.position.y / this.heightSegment);

        if (!Array.isArray(this.grid[ix])) this.grid[ix] = [];

        if (!Array.isArray(this.grid[ix][iy])) this.grid[ix][iy] = [];

        this.grid[ix][iy].push(particle);
    }


    public queryInCell(position: ICoordinates): object[] {
        const ix = Math.round(position.x / this.widthSegment);
        const iy = Math.round(position.y / this.heightSegment);

        return this.grid[ix][iy] || [];
    }

    public queryRadius(position: ICoordinates, radius: number): object[] {
        const ix = Math.round(position.x / this.widthSegment);
        const iy = Math.round(position.y / this.heightSegment);

        const rx = Math.ceil(radius / this.widthSegment);
        const ry = Math.ceil(radius / this.heightSegment);

        const items = this.select(ix - rx, ix + rx, iy - ry, iy + ry) as Particle[];

        return items.filter((particle) => Utils.getDistanceBetweenCoordinates(particle.position, position) <= radius);
    }

    // Reset the grid contents, also if the screen size changed do it here.
    public reset(canvas?: IDimension): void {
        this.grid = [];

        if (canvas) {
            this.widthSegment = Math.round(canvas.width / this.cellSize);
            this.heightSegment = Math.round(canvas.height / this.cellSize);
        }
    }

    // Select a broader area of the grid
    private select(startX: number, endX: number, startY: number, endY: number): object[] {
        let output: object[] = [];

        for (let x = startX; x < endX; x++) {
            for (let y = startY; y < endY; y++) {
                if (this.grid[x][y])
                    output = output.concat(this.grid[x][y]);
            }
        }

        return output;
    }
}
