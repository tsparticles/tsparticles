import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IParticle } from "../../Interfaces/IParticle";


export class SpatialMap {
    private cellSize: number;
    private bucket: IParticle[][];

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.bucket = [];
    }

    public hash3D(x: number, y: number, z: number): number {
        const ix = this.index(x);
        const iy = this.index(y);
        const iz = this.index(z);

        return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791));
    }

    public hash2d(x: number, y: number): number {
        return this.hash3D(x, y, 0);
    }

    public hash(position: ICoordinates): number {
        return this.hash2d(position.x, position.y);
    }

    public add3d(x: number, y: number, z: number, particle: IParticle): void {
        const hash = this.hash3D(x, y, z);

        if (this.bucket[hash] === undefined)
            this.bucket[hash] = [particle];
        else
            this.bucket[hash].push(particle);
    }

    public add2d(x: number, y: number, particle: IParticle): void {
        this.add3d(x, y, 0, particle);
    }

    public add(position: ICoordinates, particle: IParticle): void {
        this.add2d(position.x, position.y, particle);
    }

    public addParticle(particle: IParticle): void {
        this.add(particle.position, particle);
    }

    public clear(): void {
        this.bucket = [];
    }

    public getLocal3d(x: number, y: number, z: number): IParticle[] {
        const o = this.cellSize;

        let nearObjects: IParticle[] = [];

        for (let xx = -o * 2; xx < o * 3; xx += o) {
            for (let yy = -o * 2; yy < o * 3; yy += o) {
                for (let zz = -o * 2; zz < o * 3; zz += o) {
                    const newObjects = this.bucket[this.hash3D(x + xx, y + yy, z + zz)];

                    if (newObjects !== undefined) {
                        nearObjects = nearObjects.concat(newObjects);
                    }
                }
            }
        }

        return nearObjects;
    }

    public getLocal2d(x: number, y: number): IParticle[] {
        return this.getLocal3d(x, y, 0)
    }

    public getLocal(position: ICoordinates): IParticle[] {
        return this.getLocal2d(position.x, position.y);
    }

    private index(coordinate: number): number {
        return Math.floor((coordinate + 1000) / this.cellSize);
    }
}