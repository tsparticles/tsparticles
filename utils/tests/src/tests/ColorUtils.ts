/* eslint-disable @typescript-eslint/no-magic-numbers,no-console,@typescript-eslint/no-unused-expressions */
import {
    type IColor,
    type IHsl,
    type IHsla,
    type IRgb,
    colorToRgb,
    getRandomRgbColor,
    getStyleFromHsl,
    getStyleFromRgb,
    hslToRgb,
    hslaToRgba,
    stringToAlpha,
    stringToRgb,
    tsParticles,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";
import { loadHsvColorPlugin } from "@tsparticles/plugin-hsv-color";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";

describe("ColorUtils", async () => {
    await loadHexColorPlugin(tsParticles);
    await loadHslColorPlugin(tsParticles);
    await loadHsvColorPlugin(tsParticles);
    await loadRgbColorPlugin(tsParticles);

    const red: IRgb = {
        b: 0,
        g: 0,
        r: 255,
    };

    describe("colorToRgb", () => {
        it("string value 1", () => {
            const color: IColor = {
                value: "#ff0000",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 2", () => {
            const color: IColor = {
                value: "rgb(255, 0, 0)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 3", () => {
            const color: IColor = {
                value: "rgba(255, 0, 0, 1)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 4", () => {
            const color: IColor = {
                value: "rgb(255 0 0)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 5", () => {
            const color: IColor = {
                value: "rgba(255 0 0 1)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 6", () => {
            const color: IColor = {
                value: "hsla(0, 100%, 50%, 1)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("string value 7", () => {
            const color: IColor = {
                value: "hsla(0 100% 50% 1)",
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("array string value", () => {
            const color: IColor = {
                value: ["#ff0000", "#00ff00", "#0000ff"],
            };

            expect(colorToRgb(tsParticles, color)).to.satisfy((rgb: IRgb) => {
                return rgb.r === 255 || rgb.g === 255 || rgb.b === 255;
            }).and.not.be.undefined.and.not.be.null;
        });

        it("IValueColor w/ rgb value", () => {
            const color: IColor = {
                value: {
                    rgb: {
                        b: 0,
                        g: 0,
                        r: 255,
                    },
                },
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("IValueColor w/ hsl value", () => {
            const color: IColor = {
                value: {
                    hsl: {
                        h: 0,
                        l: 50,
                        s: 100,
                    },
                },
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("rgb value", () => {
            const color: IColor = {
                value: {
                    b: 0,
                    g: 0,
                    r: 255,
                },
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("hsl value", () => {
            const color: IColor = {
                value: {
                    h: 0,
                    l: 50,
                    s: 100,
                },
            };

            expect(colorToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("invalid string value", () => {
            const color: IColor = {
                value: "hello world",
            };

            expect(colorToRgb(tsParticles, color)).to.be.undefined;
        });

        it("input undefined", () => {
            const color = undefined;

            expect(colorToRgb(tsParticles, color)).to.be.undefined;
        });

        it("random value", () => {
            const color = "random";

            expect(colorToRgb(tsParticles, color)).not.be.undefined.and.not.be.null;
        });
    });

    describe("stringToAlpha", () => {
        it("from hex with alpha string to alpha value", () => {
            const value = "#ff0000ff";

            expect(stringToAlpha(tsParticles, value)).to.equal(1).and.be.not.undefined;
        });

        it("from hex without alpha string to alpha value", () => {
            const value = "#ff0000";

            expect(stringToAlpha(tsParticles, value)).to.equal(1).and.be.not.undefined;
        });

        it("invalid string value", () => {
            const value = "hello world";

            expect(stringToAlpha(tsParticles, value)).to.be.undefined;
        });
    });

    describe("stringToRgb", () => {
        it("from hex string to rgb value", () => {
            const color = "#ff0000";

            expect(stringToRgb(tsParticles, color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("invalid string value", () => {
            const value = "hello world";

            expect(stringToRgb(tsParticles, value)).to.be.undefined;
        });
    });

    describe("hslToRgb", () => {
        it("hsl value", () => {
            const color: IHsl = {
                h: 0,
                l: 50,
                s: 100,
            };

            expect(hslToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
        });

        it("hsl value zero saturation", () => {
            const color: IHsl = {
                h: 180,
                l: 50,
                s: 0,
            };

            const grey: IRgb = {
                b: 128,
                g: 128,
                r: 128,
            };

            expect(hslToRgb(color)).to.include(grey).and.not.be.undefined.and.not.be.null;
        });
    });

    describe("hslaToRgba", () => {
        it("hsl value", () => {
            const color: IHsla = {
                a: 1,
                h: 0,
                l: 50,
                s: 100,
            };

            const rgb = hslaToRgba(color);

            console.log("rgb", rgb, red);

            expect(rgb).include(red).and.to.include({ a: 1 }).and.not.be.undefined.and.not.be.null;
        });
    });

    // describe("hslToHsv", () => {
    //     it("hsl value", () => {
    //         const color: IHsl = {
    //             h: 0,
    //             l: 50,
    //             s: 100,
    //         };
    //
    //         expect(hslToHsv(color)).to.include({
    //             h: 0,
    //             s: 100,
    //             v: 100,
    //         }).and.not.be.undefined.and.not.be.null;
    //     });
    // });
    //
    // describe("hsvToHsl", () => {
    //     it("hsv value", () => {
    //         const color: IHsv = {
    //             h: 0,
    //             s: 100,
    //             v: 100,
    //         };
    //
    //         expect(hsvToHsl(color)).to.include({
    //             h: 0,
    //             l: 50,
    //             s: 100,
    //         }).and.not.be.undefined.and.not.be.null;
    //     });
    // });
    //
    // describe("hsvToRgb", () => {
    //     it("hsv value", () => {
    //         const color: IHsv = {
    //             h: 0,
    //             s: 100,
    //             v: 100,
    //         };
    //
    //         expect(hsvToRgb(color)).to.include(red).and.not.be.undefined.and.not.be.null;
    //     });
    // });
    //
    // describe("rgbToHsv", () => {
    //     it("rgb value", () => {
    //         const color: IHsv = {
    //             h: 0,
    //             s: 100,
    //             v: 100,
    //         };
    //
    //         expect(rgbToHsv(red)).to.include(color).and.not.be.undefined.and.not.be.null;
    //     });
    // });

    describe("getRandomRgbColor", () => {
        const checkRange = (n: number, min?: number): boolean => n >= (min ?? 0) && n < 256;

        const checkColor = (rgb: IRgb, min?: number): boolean =>
            checkRange(rgb.r, min) && checkRange(rgb.g, min) && checkRange(rgb.b, min);

        it("totally random color", () => {
            expect(getRandomRgbColor()).to.satisfy((rgb: IRgb) => checkColor(rgb)).and.not.be.undefined.and.not.be.null;
        });

        it("random color with min seed", () => {
            const min = 200;

            expect(getRandomRgbColor(min)).to.satisfy((rgb: IRgb) => checkColor(rgb, min)).and.not.be.undefined.and.not
                .be.null;
        });
    });

    describe("getStyleFromColor", () => {
        it("IRgb to rgba string", () => {
            expect(getStyleFromRgb(red)).to.equal("rgba(255, 0, 0, 1)");
        });

        it("IHsl to hsla string", () => {
            const color: IHsl = {
                h: 0,
                l: 50,
                s: 100,
            };

            expect(getStyleFromHsl(color)).to.equal("hsla(0, 100%, 50%, 1)");
        });

        // it("IHsv to hsla string", () => {
        //     const color: IHsv = {
        //         h: 0,
        //         s: 100,
        //         v: 100,
        //     };
        //
        //     expect(getStyleFromHsv(color)).to.equal("hsla(0, 100%, 50%, 1)");
        // });
    });
});
