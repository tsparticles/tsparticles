/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * @param seed -
 * @returns the new seed
 */
export function shuffleSeed(seed: Uint32Array<ArrayBuffer>): Uint32Array<ArrayBuffer> {
    const newSeed = new Uint32Array(1);

    newSeed[0] = seed[0] * 1664525 + 1013904223;

    return newSeed;
}
