import { ColorUtils } from '../src/Classes/Utils/ColorUtils';
import { IColor } from "../src/Interfaces/IColor";
import { expect } from "chai";
import { IRgb } from "../src/Interfaces/IRgb";
import { IHsl } from "../src/Interfaces/IHsl";
import { IHsla } from "../src/Interfaces/IHsla";

describe('ColorUtils', () => {
    const red: IRgb = {
        b: 0,
        g: 0,
        r: 255,
    };

    describe('colorToRgb', () => {
        it('string value', () => {
            const color: IColor = {
                value: "#ff0000",
            };

            expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it('string value', function () {
            const color: IColor = {
                value: [ "#ff0000", "#00ff00", "#0000ff" ],
            };

            expect(ColorUtils.colorToRgb(color)).to.satisfy((rgb: IRgb) => {
                return rgb.r === 255 || rgb.g === 255 || rgb.b === 255;
            }).and.not.be.undefined.and.not.be.null;
        });

        it('IValueColor w/ rgb value', () => {
            const color: IColor = {
                value: {
                    rgb: {
                        b: 0,
                        g: 0,
                        r: 255,
                    }
                },
            };

            expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it('IValueColor w/ hsl value', () => {
            const color: IColor = {
                value: {
                    hsl: {
                        h: 0,
                        l: 50,
                        s: 100,
                    }
                },
            };

            expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it('rgb value', () => {
            const color: IColor = {
                value: {
                    b: 0,
                    g: 0,
                    r: 255,
                },
            };

            expect(ColorUtils.colorToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it('hsl value', () => {
            const color: IColor = {
                value: {
                    h: 0,
                    l: 50,
                    s: 100,
                },
            };

            expect(ColorUtils.colorToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it('invalid string value', () => {
            const color: IColor = {
                value: "hello world"
            };

            expect(ColorUtils.colorToRgb(color)).to.be.undefined;
        });
    });

    describe('stringToAlpha', () => {
        it('from hex with alpha string to alpha value', () => {
            const value = "#ff0000ff";

            expect(ColorUtils.stringToAlpha(value)).to.equal(1).and.be.not.undefined;
        });

        it('from hex without alpha string to alpha value', () => {
            const value = "#ff0000";

            expect(ColorUtils.stringToAlpha(value)).to.equal(1).and.be.not.undefined;
        });

        it('invalid string value', () => {
            const value = "hello world";

            expect(ColorUtils.stringToAlpha(value)).to.be.undefined;
        });
    });

    describe('stringToRgb', () => {
        it('from hex string to rgb value', () => {
            const color = "#ff0000";

            expect(ColorUtils.stringToRgb(color)).include(red).and.not.be.undefined.and.not.be.null;
        });

        it('invalid string value', () => {
            const value = "hello world";

            expect(ColorUtils.stringToRgb(value)).to.be.undefined;
        });
    });

    describe('hslToRgb', () => {
        it('hsl value', () => {
            const color: IHsl = {
                h: 0,
                l: 50,
                s: 100,
            };

            expect(ColorUtils.hslToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });
    });

    describe('hslaToRgba', () => {
        it('hsl value', () => {
            const color: IHsla = {
                a: 1,
                h: 0,
                l: 50,
                s: 100,
            };

            expect(ColorUtils.hslaToRgba(color)).to.include(red).and.include({ a: 1 }).and.not.be.undefined.and.not.be.null;
        });
    });

    describe('getRandomRgbColor', () => {
        const checkRange = (n: number, min?: number) => n >= (min ?? 0) && n <= 255;

        const checkColor = (rgb: IRgb, min?: number) => checkRange(rgb.r, min) && checkRange(rgb.g, min) && checkRange(rgb.b, min);

        it('totally random color', () => {
            expect(ColorUtils.getRandomRgbColor()).to.satisfy((rgb: IRgb) => checkColor(rgb)).and.not.be.undefined.and.not.be.null;
        });

        it('random color with min seed', () => {
            const min = 200;

            expect(ColorUtils.getRandomRgbColor(min)).to.satisfy((rgb: IRgb) => checkColor(rgb, min)).and.not.be.undefined.and.not.be.null;
        });
    });

    describe('getStyleFromColor', () => {
        it('IRgb to rgba string', () => {
            expect(ColorUtils.getStyleFromColor(red)).to.equal("rgba(255, 0, 0, 1)");
        });
    });
});