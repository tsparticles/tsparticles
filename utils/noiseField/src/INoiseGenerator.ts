export interface INoiseGenerator {
    noise4d(x: number, y: number, z: number, w: number): number;
    seed(seed: number): void;
}
