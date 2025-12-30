/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Contribution3D } from "../Contributions.js";
import { shuffleSeed } from "../utils.js";

export class SimplexNoise3D {
    private readonly _NORM_3D;
    private readonly _SQUISH_3D;
    private readonly _STRETCH_3D;

    private readonly _base3D;
    private readonly _gradients3D;
    private _lookup: Contribution3D[];
    private readonly _lookupPairs3D;
    private readonly _p3D;
    private _perm: Uint8Array;
    private _perm3D: Uint8Array;

    constructor() {
        this._NORM_3D = 1.0 / 103.0;
        this._SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
        this._STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;

        this._base3D = [
            [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
            [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
            [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1],
        ];
        this._gradients3D = [
            -11,
            4,
            4,
            -4,
            11,
            4,
            -4,
            4,
            11,
            11,
            4,
            4,
            4,
            11,
            4,
            4,
            4,
            11,
            -11,
            -4,
            4,
            -4,
            -11,
            4,
            -4,
            -4,
            11,
            11,
            -4,
            4,
            4,
            -11,
            4,
            4,
            -4,
            11,
            -11,
            4,
            -4,
            -4,
            11,
            -4,
            -4,
            4,
            -11,
            11,
            4,
            -4,
            4,
            11,
            -4,
            4,
            4,
            -11,
            -11,
            -4,
            -4,
            -4,
            -11,
            -4,
            -4,
            -4,
            -11,
            11,
            -4,
            -4,
            4,
            -11,
            -4,
            4,
            -4,
            -11,
        ];
        this._lookup = [];
        this._lookupPairs3D = [
            0,
            2,
            1,
            1,
            2,
            2,
            5,
            1,
            6,
            0,
            7,
            0,
            32,
            2,
            34,
            2,
            129,
            1,
            133,
            1,
            160,
            5,
            161,
            5,
            518,
            0,
            519,
            0,
            546,
            4,
            550,
            4,
            645,
            3,
            647,
            3,
            672,
            5,
            673,
            5,
            674,
            4,
            677,
            3,
            678,
            4,
            679,
            3,
            680,
            13,
            681,
            13,
            682,
            12,
            685,
            14,
            686,
            12,
            687,
            14,
            712,
            20,
            714,
            18,
            809,
            21,
            813,
            23,
            840,
            20,
            841,
            21,
            1198,
            19,
            1199,
            22,
            1226,
            18,
            1230,
            19,
            1325,
            23,
            1327,
            22,
            1352,
            15,
            1353,
            17,
            1354,
            15,
            1357,
            17,
            1358,
            16,
            1359,
            16,
            1360,
            11,
            1361,
            10,
            1362,
            11,
            1365,
            10,
            1366,
            9,
            1367,
            9,
            1392,
            11,
            1394,
            11,
            1489,
            10,
            1493,
            10,
            1520,
            8,
            1521,
            8,
            1878,
            9,
            1879,
            9,
            1906,
            7,
            1910,
            7,
            2005,
            6,
            2007,
            6,
            2032,
            8,
            2033,
            8,
            2034,
            7,
            2037,
            6,
            2038,
            7,
            2039,
            6,
        ];
        this._p3D = [
            0,
            0,
            1,
            -1,
            0,
            0,
            1,
            0,
            -1,
            0,
            0,
            -1,
            1,
            0,
            0,
            0,
            1,
            -1,
            0,
            0,
            -1,
            0,
            1,
            0,
            0,
            -1,
            1,
            0,
            2,
            1,
            1,
            0,
            1,
            1,
            1,
            -1,
            0,
            2,
            1,
            0,
            1,
            1,
            1,
            -1,
            1,
            0,
            2,
            0,
            1,
            1,
            1,
            -1,
            1,
            1,
            1,
            3,
            2,
            1,
            0,
            3,
            1,
            2,
            0,
            1,
            3,
            2,
            0,
            1,
            3,
            1,
            0,
            2,
            1,
            3,
            0,
            2,
            1,
            3,
            0,
            1,
            2,
            1,
            1,
            1,
            0,
            0,
            2,
            2,
            0,
            0,
            1,
            1,
            0,
            1,
            0,
            2,
            0,
            2,
            0,
            1,
            1,
            0,
            0,
            1,
            2,
            0,
            0,
            2,
            2,
            0,
            0,
            0,
            0,
            1,
            1,
            -1,
            1,
            2,
            0,
            0,
            0,
            0,
            1,
            -1,
            1,
            1,
            2,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            -1,
            2,
            3,
            1,
            1,
            1,
            2,
            0,
            0,
            2,
            2,
            3,
            1,
            1,
            1,
            2,
            2,
            0,
            0,
            2,
            3,
            1,
            1,
            1,
            2,
            0,
            2,
            0,
            2,
            1,
            1,
            -1,
            1,
            2,
            0,
            0,
            2,
            2,
            1,
            1,
            -1,
            1,
            2,
            2,
            0,
            0,
            2,
            1,
            -1,
            1,
            1,
            2,
            0,
            0,
            2,
            2,
            1,
            -1,
            1,
            1,
            2,
            0,
            2,
            0,
            2,
            1,
            1,
            1,
            -1,
            2,
            2,
            0,
            0,
            2,
            1,
            1,
            1,
            -1,
            2,
            0,
            2,
            0,
        ];
        this._perm = new Uint8Array(256);
        this._perm3D = new Uint8Array(256);
    }

    noise(x: number, y: number, z: number): number {
        const { _STRETCH_3D, _NORM_3D, _SQUISH_3D, _lookup, _perm, _perm3D, _gradients3D } = this,
            stretchOffset = (x + y + z) * _STRETCH_3D,
            xs = x + stretchOffset,
            ys = y + stretchOffset,
            zs = z + stretchOffset,
            xsb = Math.floor(xs),
            ysb = Math.floor(ys),
            zsb = Math.floor(zs),
            squishOffset = (xsb + ysb + zsb) * _SQUISH_3D,
            dx0 = x - (xsb + squishOffset),
            dy0 = y - (ysb + squishOffset),
            dz0 = z - (zsb + squishOffset),
            xins = xs - xsb,
            yins = ys - ysb,
            zins = zs - zsb,
            inSum = xins + yins + zins,
            hash =
                (yins - zins + 1) |
                ((xins - yins + 1) << 1) |
                ((xins - zins + 1) << 2) |
                (inSum << 3) |
                ((inSum + zins) << 5) |
                ((inSum + yins) << 7) |
                ((inSum + xins) << 9);

        let value = 0;

        for (let c: Contribution3D | undefined = _lookup[hash]; c !== undefined; c = c.next) {
            const dx = dx0 + c.dx,
                dy = dy0 + c.dy,
                dz = dz0 + c.dz,
                attn = 2 - dx * dx - dy * dy - dz * dz;

            if (attn > 0) {
                const px = xsb + c.xsb,
                    py = ysb + c.ysb,
                    pz = zsb + c.zsb,
                    indexPartA = _perm[px & 0xff]!,
                    indexPartB = _perm[(indexPartA + py) & 0xff]!,
                    index = _perm3D[(indexPartB + pz) & 0xff]!,
                    valuePart =
                        _gradients3D[index]! * dx + _gradients3D[index + 1]! * dy + _gradients3D[index + 2]! * dz;

                value += attn * attn * attn * attn * valuePart;
            }
        }
        return value * _NORM_3D;
    }

    seed(clientSeed: number): void {
        const { _base3D, _lookupPairs3D, _p3D } = this,
            contributions: Contribution3D[] = [];

        for (let i = 0; i < _p3D.length; i += 9) {
            const baseSet = _base3D[_p3D[i]!]!;

            let previous: Contribution3D | null = null,
                current: Contribution3D | null = null;

            for (let k = 0; k < baseSet.length; k += 4) {
                current = this._contribution3D(baseSet[k]!, baseSet[k + 1]!, baseSet[k + 2]!, baseSet[k + 3]!);

                if (previous === null) {
                    contributions[i / 9] = current;
                } else {
                    previous.next = current;
                }

                previous = current;
            }

            if (current) {
                current.next = this._contribution3D(_p3D[i + 1]!, _p3D[i + 2]!, _p3D[i + 3]!, _p3D[i + 4]!);
                current.next.next = this._contribution3D(_p3D[i + 5]!, _p3D[i + 6]!, _p3D[i + 7]!, _p3D[i + 8]!);
            }
        }

        this._lookup = [];

        for (let i = 0; i < _lookupPairs3D.length; i += 2) {
            this._lookup[_lookupPairs3D[i]!] = contributions[_lookupPairs3D[i + 1]!]!;
        }

        this._perm = new Uint8Array(256);
        this._perm3D = new Uint8Array(256);

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
            this._perm3D[i] = (this._perm[i]! % 24) * 3;
            source[r[0]] = source[i]!;
        }
    }

    private _contribution3D(multiplier: number, xsb: number, ysb: number, zsb: number): Contribution3D {
        const { _SQUISH_3D } = this;

        return {
            dx: -xsb - multiplier * _SQUISH_3D,
            dy: -ysb - multiplier * _SQUISH_3D,
            dz: -zsb - multiplier * _SQUISH_3D,
            xsb,
            ysb,
            zsb,
        };
    }
}
