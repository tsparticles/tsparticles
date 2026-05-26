/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Contribution2D } from "../Contributions.js";
import { shuffleSeed } from "../utils.js";

const half = 0.5;

export class SimplexNoise2D {
  readonly #NORM_2D;
  readonly #SQUISH_2D;
  readonly #STRETCH_2D;

  readonly #base2D;
  readonly #gradients2D;
  #lookup: Contribution2D[];
  readonly #lookupPairs2D;
  readonly #p2D;
  #perm: Uint8Array;
  #perm2D: Uint8Array;

  constructor() {
    this.#NORM_2D = 1 / 47;
    this.#SQUISH_2D = (Math.sqrt(2 + 1) - 1) * half;
    this.#STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) * half;
    this.#base2D = [
      [1, 1, 0, 1, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 2, 1, 1],
    ];
    this.#gradients2D = [
      5,
      2,
      2,
      5,
      -5,
      2,
      -2,
      5,
      5,
      -2,
      2,
      -5,
      -5,
      -2,
      -2,
      -5,
    ];
    this.#lookup = [];
    this.#lookupPairs2D = [
      0,
      1,
      1,
      0,
      4,
      1,
      17,
      0,
      20,
      2,
      21,
      2,
      22,
      5,
      23,
      5,
      26,
      4,
      39,
      3,
      42,
      4,
      43,
      3,
    ];
    this.#p2D = [
      0,
      0,
      1,
      -1,
      0,
      0,
      -1,
      1,
      0,
      2,
      1,
      1,
      1,
      2,
      2,
      0,
      1,
      2,
      0,
      2,
      1,
      0,
      0,
      0,
    ];
    this.#perm = new Uint8Array(256);
    this.#perm2D = new Uint8Array(256);
  }

  noise(x: number, y: number): number {
    const gradients2D = this.#gradients2D,
      NORM_2D = this.#NORM_2D,
      SQUISH_2D = this.#SQUISH_2D,
      STRETCH_2D = this.#STRETCH_2D,
      lookup = this.#lookup,
      perm = this.#perm,
      perm2D = this.#perm2D,
      stretchOffset = (x + y) * STRETCH_2D,
      xs = x + stretchOffset,
      ys = y + stretchOffset,
      xsb = Math.floor(xs),
      ysb = Math.floor(ys),
      squishOffset = (xsb + ysb) * SQUISH_2D,
      dx0 = x - (xsb + squishOffset),
      dy0 = y - (ysb + squishOffset),
      xins = xs - xsb,
      yins = ys - ysb,
      inSum = xins + yins,
      hash = (xins - yins + 1) | (inSum << 1) | ((inSum + yins) << 2) | ((inSum + xins) << 4);

    let value = 0;

    for (let c: Contribution2D | undefined = lookup[hash]; c !== undefined; c = c.next) {
      const dx = dx0 + c.dx,
        dy = dy0 + c.dy,
        attn = 2 - dx * dx - dy * dy;

      if (attn <= 0) {
        continue;
      }

      const px = xsb + c.xsb,
        py = ysb + c.ysb,
        indexPartA = perm[px & 0xff]!,
        index = perm2D[(indexPartA + py) & 0xff]!,
        valuePart = gradients2D[index]! * dx + gradients2D[index + 1]! * dy;

      value += attn * attn * attn * attn * valuePart;
    }

    return value * NORM_2D;
  }

  seed(clientSeed: number): void {
    const p2D = this.#p2D,
      base2D = this.#base2D,
      lookupPairs2D = this.#lookupPairs2D,
      contributions: Contribution2D[] = [];

    for (let i = 0; i < p2D.length; i += 4) {
      const baseSet = base2D[p2D[i]!]!;

      let previous: Contribution2D | null = null,
        current: Contribution2D | null = null;

      for (let k = 0; k < baseSet.length; k += 3) {
        current = this.#contribution2D(baseSet[k]!, baseSet[k + 1]!, baseSet[k + 2]!);

        if (previous === null) {
          contributions[i / 4] = current;
        } else {
          previous.next = current;
        }

        previous = current;
      }

      if (current) {
        current.next = this.#contribution2D(p2D[i + 1]!, p2D[i + 2]!, p2D[i + 3]!);
      }
    }

    this.#lookup = [];

    for (let i = 0; i < lookupPairs2D.length; i += 2) {
      this.#lookup[lookupPairs2D[i]!] = contributions[lookupPairs2D[i + 1]!]!;
    }

    this.#perm = new Uint8Array(256);
    this.#perm2D = new Uint8Array(256);

    const source = new Uint8Array(256);

    for (let i = 0; i < 256; i++) {
      source[i] = i;
    }

    let seed = new Uint32Array(1);

    seed[0] = clientSeed;
    seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));

    for (let i = 255; i >= 0; i--) {
      seed = shuffleSeed(seed);

      const r = new Uint32Array(1);

      r[0] = (seed[0]! + 31) % (i + 1);

      if (r[0] < 0) {
        r[0] += i + 1;
      }

      this.#perm[i] = source[r[0]]!;
      this.#perm2D[i] = this.#perm[i]! & 0x0e;

      source[r[0]] = source[i]!;
    }
  }

  #contribution2D(multiplier: number, xsb: number, ysb: number): Contribution2D {
    const SQUISH_2D = this.#SQUISH_2D;

    return {
      dx: -xsb - multiplier * SQUISH_2D,
      dy: -ysb - multiplier * SQUISH_2D,
      xsb,
      ysb,
    };
  }
}
