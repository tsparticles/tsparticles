/* eslint-disable @typescript-eslint/no-magic-numbers */
const lerp = (a: number, b: number, t: number): number => {
        return a + t * (b - a);
    },
    smoothstep = (t: number): number => {
        return t * t * (3 - 2 * t);
    },
    fract = (x: number): number => {
        return x - Math.floor(x);
    };

export class SmoothValueNoise {
    private _coeffW = 29.537;
    private _coeffX = 127.1;
    private _coeffY = 311.7;
    private _coeffZ = 78.233;
    private _coeffZW = 37.719;
    private _scaleFactor = 43758.5453;

    noise2d(x: number, y: number): number {
        const x0 = Math.floor(x),
            y0 = Math.floor(y),
            x1 = x0 + 1,
            y1 = y0 + 1,
            sx = smoothstep(x - x0),
            sy = smoothstep(y - y0),
            n00 = this._valueNoise2D(x0, y0),
            n10 = this._valueNoise2D(x1, y0),
            n01 = this._valueNoise2D(x0, y1),
            n11 = this._valueNoise2D(x1, y1),
            ix0 = lerp(n00, n10, sx),
            ix1 = lerp(n01, n11, sx);

        return lerp(ix0, ix1, sy);
    }

    noise3d(x: number, y: number, z: number): number {
        const x0 = Math.floor(x),
            y0 = Math.floor(y),
            z0 = Math.floor(z),
            x1 = x0 + 1,
            y1 = y0 + 1,
            z1 = z0 + 1,
            sx = smoothstep(x - x0),
            sy = smoothstep(y - y0),
            sz = smoothstep(z - z0),
            n000 = this._valueNoise3D(x0, y0, z0),
            n100 = this._valueNoise3D(x1, y0, z0),
            n010 = this._valueNoise3D(x0, y1, z0),
            n110 = this._valueNoise3D(x1, y1, z0),
            n001 = this._valueNoise3D(x0, y0, z1),
            n101 = this._valueNoise3D(x1, y0, z1),
            n011 = this._valueNoise3D(x0, y1, z1),
            n111 = this._valueNoise3D(x1, y1, z1),
            ix00 = lerp(n000, n100, sx),
            ix10 = lerp(n010, n110, sx),
            ix01 = lerp(n001, n101, sx),
            ix11 = lerp(n011, n111, sx),
            iy0 = lerp(ix00, ix10, sy),
            iy1 = lerp(ix01, ix11, sy);

        return lerp(iy0, iy1, sz);
    }

    noise4d(x: number, y: number, z: number, w: number): number {
        const x0 = Math.floor(x),
            y0 = Math.floor(y),
            z0 = Math.floor(z),
            w0 = Math.floor(w),
            x1 = x0 + 1,
            y1 = y0 + 1,
            z1 = z0 + 1,
            w1 = w0 + 1,
            sx = smoothstep(x - x0),
            sy = smoothstep(y - y0),
            sz = smoothstep(z - z0),
            sw = smoothstep(w - w0),
            n0000 = this._valueNoise4D(x0, y0, z0, w0),
            n1000 = this._valueNoise4D(x1, y0, z0, w0),
            n0100 = this._valueNoise4D(x0, y1, z0, w0),
            n1100 = this._valueNoise4D(x1, y1, z0, w0),
            n0010 = this._valueNoise4D(x0, y0, z1, w0),
            n1010 = this._valueNoise4D(x1, y0, z1, w0),
            n0110 = this._valueNoise4D(x0, y1, z1, w0),
            n1110 = this._valueNoise4D(x1, y1, z1, w0),
            n0001 = this._valueNoise4D(x0, y0, z0, w1),
            n1001 = this._valueNoise4D(x1, y0, z0, w1),
            n0101 = this._valueNoise4D(x0, y1, z0, w1),
            n1101 = this._valueNoise4D(x1, y1, z0, w1),
            n0011 = this._valueNoise4D(x0, y0, z1, w1),
            n1011 = this._valueNoise4D(x1, y0, z1, w1),
            n0111 = this._valueNoise4D(x0, y1, z1, w1),
            n1111 = this._valueNoise4D(x1, y1, z1, w1),
            ix000 = lerp(n0000, n1000, sx),
            ix100 = lerp(n0100, n1100, sx),
            ix010 = lerp(n0010, n1010, sx),
            ix110 = lerp(n0110, n1110, sx),
            ix001 = lerp(n0001, n1001, sx),
            ix101 = lerp(n0101, n1101, sx),
            ix011 = lerp(n0011, n1011, sx),
            ix111 = lerp(n0111, n1111, sx),
            iy00 = lerp(ix000, ix100, sy),
            iy10 = lerp(ix010, ix110, sy),
            iy01 = lerp(ix001, ix101, sy),
            iy11 = lerp(ix011, ix111, sy),
            iz0 = lerp(iy00, iy10, sz),
            iz1 = lerp(iy01, iy11, sz);

        return lerp(iz0, iz1, sw);
    }

    seed(seed: number): void {
        const s = Math.sin(seed) * 10000;
        this._coeffX = fract(s * 15731);
        this._coeffY = fract(s * 789221);
        this._coeffZ = fract(s * 1376312589);
        this._coeffZW = fract(s * 974634777);
        this._coeffW = fract(s * 592558533);
        this._scaleFactor = 43758.5453;
    }

    private _valueNoise2D(x: number, y: number): number {
        const n = Math.sin(x * this._coeffX + y * this._coeffY) * this._scaleFactor;

        return (n - Math.floor(n)) * 2 - 1;
    }

    private _valueNoise3D(x: number, y: number, z: number): number {
        const n = Math.sin(x * this._coeffX + y * this._coeffY + z * this._coeffZ) * this._scaleFactor;

        return (n - Math.floor(n)) * 2 - 1;
    }

    private _valueNoise4D(x: number, y: number, z: number, w: number): number {
        const n =
            Math.sin(x * this._coeffX + y * this._coeffY + z * this._coeffZW + w * this._coeffW) * this._scaleFactor;

        return (n - Math.floor(n)) * 2 - 1;
    }
}
