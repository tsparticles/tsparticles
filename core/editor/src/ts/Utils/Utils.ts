import { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";

export function hslToRgb(hsl: IHsl): IRgb {
    const result: IRgb = { b: 0, g: 0, r: 0 };
    const hslPercent: IHsl = {
        h: hsl.h / 360,
        l: hsl.l / 100,
        s: hsl.s / 100,
    };

    if (hslPercent.s === 0) {
        result.b = hslPercent.l; // achromatic
        result.g = hslPercent.l;
        result.r = hslPercent.l;
    } else {
        const q =
            hslPercent.l < 0.5
                ? hslPercent.l * (1 + hslPercent.s)
                : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
        const p = 2 * hslPercent.l - q;

        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
    }

    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);

    return result;
}

function hue2rgb(p: number, q: number, t: number): number {
    let tCalc = t;

    if (tCalc < 0) {
        tCalc += 1;
    }

    if (tCalc > 1) {
        tCalc -= 1;
    }

    if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
    }

    if (tCalc < 1 / 2) {
        return q;
    }

    if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
    }

    return p;
}
