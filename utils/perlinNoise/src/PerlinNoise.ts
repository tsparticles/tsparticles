/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Grad } from "./Grad.js";

export class PerlinNoise {
    private readonly _grad4;
    private readonly _gradP: Grad[];
    private readonly _p;
    private readonly _perm: number[];

    constructor() {
        this._grad4 = [
            new Grad(0, 1, 1, 1),
            new Grad(0, 1, 1, -1),
            new Grad(0, 1, -1, 1),
            new Grad(0, 1, -1, -1),
            new Grad(0, -1, 1, 1),
            new Grad(0, -1, 1, -1),
            new Grad(0, -1, -1, 1),
            new Grad(0, -1, -1, -1),
            new Grad(1, 0, 1, 1),
            new Grad(1, 0, 1, -1),
            new Grad(1, 0, -1, 1),
            new Grad(1, 0, -1, -1),
            new Grad(-1, 0, 1, 1),
            new Grad(-1, 0, 1, -1),
            new Grad(-1, 0, -1, 1),
            new Grad(-1, 0, -1, -1),
            new Grad(1, 1, 0, 1),
            new Grad(1, 1, 0, -1),
            new Grad(1, -1, 0, 1),
            new Grad(1, -1, 0, -1),
            new Grad(-1, 1, 0, 1),
            new Grad(-1, 1, 0, -1),
            new Grad(-1, -1, 0, 1),
            new Grad(-1, -1, 0, -1),
            new Grad(1, 1, 1, 0),
            new Grad(1, 1, -1, 0),
            new Grad(1, -1, 1, 0),
            new Grad(1, -1, -1, 0),
            new Grad(-1, 1, 1, 0),
            new Grad(-1, 1, -1, 0),
            new Grad(-1, -1, 1, 0),
            new Grad(-1, -1, -1, 0),
        ];
        this._p = [
            151,
            160,
            137,
            91,
            90,
            15,
            131,
            13,
            201,
            95,
            96,
            53,
            194,
            233,
            7,
            225,
            140,
            36,
            103,
            30,
            69,
            142,
            8,
            99,
            37,
            240,
            21,
            10,
            23,
            190,
            6,
            148,
            247,
            120,
            234,
            75,
            0,
            26,
            197,
            62,
            94,
            252,
            219,
            203,
            117,
            35,
            11,
            32,
            57,
            177,
            33,
            88,
            237,
            149,
            56,
            87,
            174,
            20,
            125,
            136,
            171,
            168,
            68,
            175,
            74,
            165,
            71,
            134,
            139,
            48,
            27,
            166,
            77,
            146,
            158,
            231,
            83,
            111,
            229,
            122,
            60,
            211,
            133,
            230,
            220,
            105,
            92,
            41,
            55,
            46,
            245,
            40,
            244,
            102,
            143,
            54,
            65,
            25,
            63,
            161,
            1,
            216,
            80,
            73,
            209,
            76,
            132,
            187,
            208,
            89,
            18,
            169,
            200,
            196,
            135,
            130,
            116,
            188,
            159,
            86,
            164,
            100,
            109,
            198,
            173,
            186,
            3,
            64,
            52,
            217,
            226,
            250,
            124,
            123,
            5,
            202,
            38,
            147,
            118,
            126,
            255,
            82,
            85,
            212,
            207,
            206,
            59,
            227,
            47,
            16,
            58,
            17,
            182,
            189,
            28,
            42,
            223,
            183,
            170,
            213,
            119,
            248,
            152,
            2,
            44,
            154,
            163,
            70,
            221,
            153,
            101,
            155,
            167,
            43,
            172,
            9,
            129,
            22,
            39,
            253,
            19,
            98,
            108,
            110,
            79,
            113,
            224,
            232,
            178,
            185,
            112,
            104,
            218,
            246,
            97,
            228,
            251,
            34,
            242,
            193,
            238,
            210,
            144,
            12,
            191,
            179,
            162,
            241,
            81,
            51,
            145,
            235,
            249,
            14,
            239,
            107,
            49,
            192,
            214,
            31,
            181,
            199,
            106,
            157,
            184,
            84,
            204,
            176,
            115,
            121,
            50,
            45,
            127,
            4,
            150,
            254,
            138,
            236,
            205,
            93,
            222,
            114,
            67,
            29,
            24,
            72,
            243,
            141,
            128,
            195,
            78,
            66,
            215,
            61,
            156,
            180,
        ];
        this._gradP = new Array<Grad>(512);
        this._perm = new Array<number>(512);
    }

    noise2d(x: number, y: number): number {
        const { _gradP, _perm } = this;

        // Find unit grid cell containing point
        let X = Math.floor(x),
            Y = Math.floor(y);

        // Get relative xy coordinates of point within that cell
        x -= X;
        y -= Y;

        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X &= 255;
        Y &= 255;

        // Calculate noise contributions from each of the four corners
        const n00 = _gradP[X + _perm[Y]!]!.dot2(x, y),
            n01 = _gradP[X + _perm[Y + 1]!]!.dot2(x, y - 1),
            n10 = _gradP[X + 1 + _perm[Y]!]!.dot2(x - 1, y),
            n11 = _gradP[X + 1 + _perm[Y + 1]!]!.dot2(x - 1, y - 1),
            // Compute the fade curve value for x
            u = this._fade(x);

        // Interpolate the four results
        return this._lerp(this._lerp(n00, n10, u), this._lerp(n01, n11, u), this._fade(y));
    }

    noise3d(x: number, y: number, z: number): number {
        const { _gradP: gradP, _perm: perm } = this;

        // Find unit grid cell containing point
        let X = Math.floor(x),
            Y = Math.floor(y),
            Z = Math.floor(z);

        // Get relative xyz coordinates of point within that cell
        x = x - X;
        y = y - Y;
        z = z - Z;

        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;

        // Calculate noise contributions from each of the eight corners
        const n000 = gradP[X + perm[Y + perm[Z]!]!]!.dot3(x, y, z),
            n001 = gradP[X + perm[Y + perm[Z + 1]!]!]!.dot3(x, y, z - 1),
            n010 = gradP[X + perm[Y + 1 + perm[Z]!]!]!.dot3(x, y - 1, z),
            n011 = gradP[X + perm[Y + 1 + perm[Z + 1]!]!]!.dot3(x, y - 1, z - 1),
            n100 = gradP[X + 1 + perm[Y + perm[Z]!]!]!.dot3(x - 1, y, z),
            n101 = gradP[X + 1 + perm[Y + perm[Z + 1]!]!]!.dot3(x - 1, y, z - 1),
            n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]!]!]!.dot3(x - 1, y - 1, z),
            n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]!]!]!.dot3(x - 1, y - 1, z - 1),
            // Compute the fade curve value for x, y, z
            u = this._fade(x),
            v = this._fade(y),
            w = this._fade(z);

        // Interpolate
        return this._lerp(
            this._lerp(this._lerp(n000, n100, u), this._lerp(n001, n101, u), w),
            this._lerp(this._lerp(n010, n110, u), this._lerp(n011, n111, u), w),
            v,
        );
    }

    noise4d(x: number, y: number, z: number, w: number): number {
        const { _gradP: gradP, _perm: perm } = this;

        // Find unit grid cell containing point
        let X = Math.floor(x),
            Y = Math.floor(y),
            Z = Math.floor(z),
            W = Math.floor(w);

        // Get relative coordinates within cell
        x -= X;
        y -= Y;
        z -= Z;
        w -= W;

        // Wrap at 255
        X &= 255;
        Y &= 255;
        Z &= 255;
        W &= 255;

        const u = this._fade(x),
            v = this._fade(y),
            s = this._fade(z),
            t = this._fade(w),
            // Helper to get gradient index
            gi = (i: number, j: number, k: number, l: number): Grad =>
                gradP[X + i + perm[Y + j + perm[Z + k + perm[W + l]!]!]!]!,
            // Contributions from 16 corners of 4D hypercube
            n0000 = gi(0, 0, 0, 0).dot4(x, y, z, w),
            n0001 = gi(0, 0, 0, 1).dot4(x, y, z, w - 1),
            n0010 = gi(0, 0, 1, 0).dot4(x, y, z - 1, w),
            n0011 = gi(0, 0, 1, 1).dot4(x, y, z - 1, w - 1),
            n0100 = gi(0, 1, 0, 0).dot4(x, y - 1, z, w),
            n0101 = gi(0, 1, 0, 1).dot4(x, y - 1, z, w - 1),
            n0110 = gi(0, 1, 1, 0).dot4(x, y - 1, z - 1, w),
            n0111 = gi(0, 1, 1, 1).dot4(x, y - 1, z - 1, w - 1),
            n1000 = gi(1, 0, 0, 0).dot4(x - 1, y, z, w),
            n1001 = gi(1, 0, 0, 1).dot4(x - 1, y, z, w - 1),
            n1010 = gi(1, 0, 1, 0).dot4(x - 1, y, z - 1, w),
            n1011 = gi(1, 0, 1, 1).dot4(x - 1, y, z - 1, w - 1),
            n1100 = gi(1, 1, 0, 0).dot4(x - 1, y - 1, z, w),
            n1101 = gi(1, 1, 0, 1).dot4(x - 1, y - 1, z, w - 1),
            n1110 = gi(1, 1, 1, 0).dot4(x - 1, y - 1, z - 1, w),
            n1111 = gi(1, 1, 1, 1).dot4(x - 1, y - 1, z - 1, w - 1),
            // Trilinear interpolation
            x00 = this._lerp(n0000, n1000, u),
            x01 = this._lerp(n0001, n1001, u),
            x10 = this._lerp(n0010, n1010, u),
            x11 = this._lerp(n0011, n1011, u),
            y00 = this._lerp(x00, x10, s),
            y01 = this._lerp(x01, x11, s),
            x20 = this._lerp(n0100, n1100, u),
            x21 = this._lerp(n0101, n1101, u),
            x30 = this._lerp(n0110, n1110, u),
            x31 = this._lerp(n0111, n1111, u),
            y10 = this._lerp(x20, x30, s),
            y11 = this._lerp(x21, x31, s),
            z0 = this._lerp(y00, y10, v),
            z1 = this._lerp(y01, y11, v);

        return this._lerp(z0, z1, t);
    }

    seed(inputSeed: number): void {
        const { _grad4: grad4, _gradP: gradP, _perm: perm, _p: p } = this;

        let seed = inputSeed;

        if (seed > 0 && seed < 1) {
            // Scale the seed out
            seed *= 65536;
        }

        seed = Math.floor(seed);

        if (seed < 256) {
            seed |= seed << 8;
        }

        const grad4Length = grad4.length;

        for (let i = 0; i < 256; i++) {
            const v = i & 1 ? p[i]! ^ (seed & 255) : p[i]! ^ ((seed >> 8) & 255);

            perm[i] = perm[i + 256] = v;

            gradP[i] = gradP[i + 256] = grad4[v % grad4Length]!;
        }
    }

    /**
     * @param t -
     * @returns the fade value
     */
    private _fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    /**
     * @param a -
     * @param b -
     * @param t -
     * @returns the linear interpolation value
     */
    private _lerp(a: number, b: number, t: number): number {
        return (1 - t) * a + t * b;
    }
}
