/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Contribution2D } from "../Contributions.js";
import { shuffleSeed } from "../utils.js";

export class SimplexNoise2D {
    private readonly _NORM_2D;
    private readonly _SQUISH_2D;
    private readonly _STRETCH_2D;

    private readonly _base2D;
    private readonly _gradients2D;
    private _lookup: Contribution2D[];
    private readonly _lookupPairs2D;
    private readonly _p2D;
    private _perm: Uint8Array;
    private _perm2D: Uint8Array;

    constructor() {
        this._NORM_2D = 1.0 / 47.0;
        this._SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
        this._STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
        this._base2D = [
            [1, 1, 0, 1, 0, 1, 0, 0, 0],
            [1, 1, 0, 1, 0, 1, 2, 1, 1],
        ];
        this._gradients2D = [
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
        this._lookup = [];
        this._lookupPairs2D = [
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
        this._p2D = [
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
        this._perm = new Uint8Array(256);
        this._perm2D = new Uint8Array(256);
    }

    noise(x: number, y: number): number {
        const { _gradients2D, _NORM_2D, _SQUISH_2D, _STRETCH_2D, _lookup, _perm, _perm2D } = this;

        const stretchOffset = (x + y) * _STRETCH_2D,
            xs = x + stretchOffset,
            ys = y + stretchOffset,
            xsb = Math.floor(xs),
            ysb = Math.floor(ys),
            squishOffset = (xsb + ysb) * _SQUISH_2D,
            dx0 = x - (xsb + squishOffset),
            dy0 = y - (ysb + squishOffset),
            xins = xs - xsb,
            yins = ys - ysb,
            inSum = xins + yins,
            hash = (xins - yins + 1) | (inSum << 1) | ((inSum + yins) << 2) | ((inSum + xins) << 4);

        let value = 0;

        for (let c: Contribution2D | undefined = _lookup[hash]; c !== undefined; c = c.next) {
            const dx = dx0 + c.dx,
                dy = dy0 + c.dy,
                attn = 2 - dx * dx - dy * dy;

            if (attn > 0) {
                const px = xsb + c.xsb,
                    py = ysb + c.ysb,
                    indexPartA = _perm[px & 0xff]!,
                    index = _perm2D[(indexPartA + py) & 0xff]!,
                    valuePart = _gradients2D[index]! * dx + _gradients2D[index + 1]! * dy;

                value += attn * attn * attn * attn * valuePart;
            }
        }

        return value * _NORM_2D;
    }

    seed(clientSeed: number): void {
        const { _p2D, _base2D, _lookupPairs2D } = this;

        const contributions: Contribution2D[] = [];

        for (let i = 0; i < _p2D.length; i += 4) {
            const baseSet = _base2D[_p2D[i]!]!;

            let previous: Contribution2D | null = null,
                current: Contribution2D | null = null;

            for (let k = 0; k < baseSet.length; k += 3) {
                current = this._contribution2D(baseSet[k]!, baseSet[k + 1]!, baseSet[k + 2]!);

                if (previous === null) {
                    contributions[i / 4] = current;
                } else {
                    previous.next = current;
                }

                previous = current;
            }

            if (current) {
                current.next = this._contribution2D(_p2D[i + 1]!, _p2D[i + 2]!, _p2D[i + 3]!);
            }
        }

        this._lookup = [];

        for (let i = 0; i < _lookupPairs2D.length; i += 2) {
            this._lookup[_lookupPairs2D[i]!] = contributions[_lookupPairs2D[i + 1]!]!;
        }

        this._perm = new Uint8Array(256);
        this._perm2D = new Uint8Array(256);

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

            this._perm[i] = source[r[0]]!;
            this._perm2D[i] = this._perm[i]! & 0x0e;
            source[r[0]] = source[i]!;
        }
    }

    private _contribution2D(multiplier: number, xsb: number, ysb: number): Contribution2D {
        const { _SQUISH_2D } = this;

        return {
            dx: -xsb - multiplier * _SQUISH_2D,
            dy: -ysb - multiplier * _SQUISH_2D,
            xsb,
            ysb,
        };
    }
}
