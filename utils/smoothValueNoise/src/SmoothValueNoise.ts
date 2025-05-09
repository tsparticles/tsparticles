/* eslint-disable @typescript-eslint/no-magic-numbers */
export class SmoothValueNoise {
    noise2d(x: number, y: number): number {
        const x0 = Math.floor(x),
            y0 = Math.floor(y),
            x1 = x0 + 1,
            y1 = y0 + 1,
            sx = this._smoothstep(x - x0),
            sy = this._smoothstep(y - y0),
            n00 = this._valueNoise2D(x0, y0),
            n10 = this._valueNoise2D(x1, y0),
            n01 = this._valueNoise2D(x0, y1),
            n11 = this._valueNoise2D(x1, y1),
            ix0 = this._lerp(n00, n10, sx),
            ix1 = this._lerp(n01, n11, sx);

        return this._lerp(ix0, ix1, sy);
    }

    noise3d(x: number, y: number, z: number): number {
        const x0 = Math.floor(x),
            y0 = Math.floor(y),
            z0 = Math.floor(z),
            x1 = x0 + 1,
            y1 = y0 + 1,
            z1 = z0 + 1,
            sx = this._smoothstep(x - x0),
            sy = this._smoothstep(y - y0),
            sz = this._smoothstep(z - z0),
            n000 = this._valueNoise3D(x0, y0, z0),
            n100 = this._valueNoise3D(x1, y0, z0),
            n010 = this._valueNoise3D(x0, y1, z0),
            n110 = this._valueNoise3D(x1, y1, z0),
            n001 = this._valueNoise3D(x0, y0, z1),
            n101 = this._valueNoise3D(x1, y0, z1),
            n011 = this._valueNoise3D(x0, y1, z1),
            n111 = this._valueNoise3D(x1, y1, z1),
            ix00 = this._lerp(n000, n100, sx),
            ix10 = this._lerp(n010, n110, sx),
            ix01 = this._lerp(n001, n101, sx),
            ix11 = this._lerp(n011, n111, sx),
            iy0 = this._lerp(ix00, ix10, sy),
            iy1 = this._lerp(ix01, ix11, sy);

        return this._lerp(iy0, iy1, sz);
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
            sx = this._smoothstep(x - x0),
            sy = this._smoothstep(y - y0),
            sz = this._smoothstep(z - z0),
            sw = this._smoothstep(w - w0),
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
            interpolate4 = (a: number, b: number, t: number): number => {
                return this._lerp(a, b, t);
            },
            ix000 = interpolate4(n0000, n1000, sx),
            ix100 = interpolate4(n0100, n1100, sx),
            ix010 = interpolate4(n0010, n1010, sx),
            ix110 = interpolate4(n0110, n1110, sx),
            ix001 = interpolate4(n0001, n1001, sx),
            ix101 = interpolate4(n0101, n1101, sx),
            ix011 = interpolate4(n0011, n1011, sx),
            ix111 = interpolate4(n0111, n1111, sx),
            iy00 = interpolate4(ix000, ix100, sy),
            iy10 = interpolate4(ix010, ix110, sy),
            iy01 = interpolate4(ix001, ix101, sy),
            iy11 = interpolate4(ix011, ix111, sy),
            iz0 = interpolate4(iy00, iy10, sz),
            iz1 = interpolate4(iy01, iy11, sz);

        return interpolate4(iz0, iz1, sw);
    }

    private _lerp(a: number, b: number, t: number): number {
        return a + t * (b - a);
    }

    private _smoothstep(t: number): number {
        return t * t * (3 - 2 * t);
    }

    private _valueNoise2D(x: number, y: number): number {
        const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;

        return n - Math.floor(n);
    }

    private _valueNoise3D(x: number, y: number, z: number): number {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.5432) * 43758.5453;

        return n - Math.floor(n);
    }

    private _valueNoise4D(x: number, y: number, z: number, w: number): number {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + w * 29.537) * 43758.5453;

        return n - Math.floor(n);
    }
}
