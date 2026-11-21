/* eslint-disable @typescript-eslint/no-magic-numbers,no-console,@typescript-eslint/no-unused-expressions */
import {
  HdrMode,
  type IColor,
  type IColorManager,
  type IHsl,
  type IHsla,
  type ILegacyColorManager,
  type IOklcha,
  type IParticleOklchAnimation,
  type IRgb,
  OklchAnimation,
  type Particle,
  adaptLegacyColorManager,
  colorToRgb,
  createEngine,
  displayP3ToOklch,
  getLinkColor,
  getOklchAnimationFromOklch,
  getRandomRgbColor,
  getStyleFromHsl,
  getStyleFromOklch,
  getStyleFromRgb,
  hslToRgb,
  hslaToRgba,
  mapOklchToDisplayP3,
  mapOklchToSrgb,
  oklchToDisplayP3Float,
  oklchToRgbFloat,
  rangeColorToOklch,
  rgbToDisplayP3Float,
  rgbToOklch,
  stringToAlpha,
  stringToRgb,
  updateColor,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";
import { loadHsvColorPlugin } from "@tsparticles/plugin-hsv-color";
import { loadHwbColorPlugin } from "@tsparticles/plugin-hwb-color";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";

const tsParticles = createEngine();

describe("ColorUtils", async () => {
  const pluginManager = tsParticles.pluginManager;

  await pluginManager.register(async (engine) => {
    await loadHexColorPlugin(engine);
    await loadHslColorPlugin(engine);
    await loadHsvColorPlugin(engine);
    await loadHwbColorPlugin(engine);
    await loadRgbColorPlugin(engine);
  });

  await tsParticles.init();

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

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 2", () => {
      const color: IColor = {
        value: "rgb(255, 0, 0)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 3", () => {
      const color: IColor = {
        value: "rgba(255, 0, 0, 1)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 4", () => {
      const color: IColor = {
        value: "rgb(255 0 0)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 5", () => {
      const color: IColor = {
        value: "rgba(255 0 0 1)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 6", () => {
      const color: IColor = {
        value: "hsla(0, 100%, 50%, 1)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("string value 7", () => {
      const color: IColor = {
        value: "hsla(0 100% 50% 1)",
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("array string value", () => {
      const color: IColor = {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      };

      expect(colorToRgb(pluginManager, color)).to.satisfy((rgb: IRgb) => {
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

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
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

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("rgb value", () => {
      const color: IColor = {
        value: {
          b: 0,
          g: 0,
          r: 255,
        },
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("hsl value", () => {
      const color: IColor = {
        value: {
          h: 0,
          l: 50,
          s: 100,
        },
      };

      expect(colorToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("invalid string value", () => {
      const color: IColor = {
        value: "hello world",
      };

      expect(colorToRgb(pluginManager, color)).to.be.undefined;
    });

    it("input undefined", () => {
      const color = undefined;

      expect(colorToRgb(pluginManager, color)).to.be.undefined;
    });

    it("random value", () => {
      const color = "random";

      expect(colorToRgb(pluginManager, color)).not.be.undefined.and.not.be.null;
    });
  });

  describe("stringToAlpha", () => {
    it("from hex with alpha string to alpha value", () => {
      const value = "#ff0000ff";

      expect(stringToAlpha(pluginManager, value)).to.equal(1).and.be.not
        .undefined;
    });

    it("from hex without alpha string to alpha value", () => {
      const value = "#ff0000";

      expect(stringToAlpha(pluginManager, value)).to.equal(1).and.be.not
        .undefined;
    });

    it("invalid string value", () => {
      const value = "hello world";

      expect(stringToAlpha(pluginManager, value)).to.be.undefined;
    });
  });

  describe("stringToRgb", () => {
    it("from hex string to rgb value", () => {
      const color = "#ff0000";

      expect(stringToRgb(pluginManager, color)).to.include(red).and.not.be
        .undefined.and.not.be.null;
    });

    it("invalid string value", () => {
      const value = "hello world";

      expect(stringToRgb(pluginManager, value)).to.be.undefined;
    });
  });

  describe("hslToRgb", () => {
    it("hsl value", () => {
      const color: IHsl = {
        h: 0,
        l: 50,
        s: 100,
      };

      expect(hslToRgb(color)).to.include(red).and.not.be.undefined.and.not.be
        .null;
    });

    it("hsl value zero saturation", () => {
      const color: IHsl = {
          h: 180,
          l: 50,
          s: 0,
        },
        grey: IRgb = {
          b: 128,
          g: 128,
          r: 128,
        };

      expect(hslToRgb(color)).to.include(grey).and.not.be.undefined.and.not.be
        .null;
    });
  });

  describe("OKLCH conversions", () => {
    it("mixes link colors using each particle's unequal radius weight", () => {
      const sourceColor: IOklcha = { a: 0.4, c: 0.2, h: 30, l: 50 },
        destinationColor: IOklcha = { a: 0.8, c: 0.1, h: 150, l: 80 },
        source = {
          getFillColor: () => sourceColor,
          getRadius: () => 10,
          getStrokeColor: () => undefined,
        } as unknown as Particle,
        destination = {
          getFillColor: () => destinationColor,
          getRadius: () => 30,
          getStrokeColor: () => undefined,
        } as unknown as Particle,
        expectedA =
          sourceColor.c * Math.cos((sourceColor.h * Math.PI) / 180) * 0.25 +
          destinationColor.c *
            Math.cos((destinationColor.h * Math.PI) / 180) *
            0.75,
        expectedB =
          sourceColor.c * Math.sin((sourceColor.h * Math.PI) / 180) * 0.25 +
          destinationColor.c *
            Math.sin((destinationColor.h * Math.PI) / 180) *
            0.75,
        result = getLinkColor(source, destination, "mid");

      expect(result?.a).to.be.closeTo(0.7, 1e-12);
      expect(result?.l).to.equal(72.5);
      expect(result?.c).to.be.closeTo(Math.hypot(expectedA, expectedB), 1e-12);
      expect(result?.h).to.be.closeTo(
        ((Math.atan2(expectedB, expectedA) * 180) / Math.PI + 360) % 360,
        1e-10,
      );
    });

    it("recomputes cached link styles when the output gamut changes", async () => {
      let currentStrokeStyle = "";

      const { LinkInstance } =
          await import("../../../../interactions/particles/links/src/LinkInstance.js"),
        color = { a: 0.8, c: 0.2, h: 270, l: 60 },
        container = {
          hdr: false,
          hdrMode: undefined,
          outputColorSpace: "srgb",
          particles: { linksColors: new Map() },
          peakNits: 1000,
        },
        destination = {
          getPosition: () => ({ x: 10, y: 10 }),
        },
        particle = {
          getPosition: () => ({ x: 1, y: 1 }),
          links: [{ color, destination, isWarped: false, opacity: 0.5 }],
          options: {
            links: { enable: true, frequency: 1, triangles: { enable: false } },
          },
          retina: { linksWidth: 2 },
        },
        styles: string[] = [],
        contextCalls: string[] = [],
        context = {
          beginPath(): void {
            contextCalls.push("beginPath");
          },
          globalAlpha: 1,
          lineTo(): void {
            contextCalls.push("lineTo");
          },
          lineWidth: 0,
          moveTo(): void {
            contextCalls.push("moveTo");
          },
          stroke(): void {
            styles.push(currentStrokeStyle);
            contextCalls.push("stroke");
          },
          get strokeStyle(): string {
            return currentStrokeStyle;
          },
          set strokeStyle(style: string) {
            currentStrokeStyle = style;
          },
        },
        instance = new LinkInstance(pluginManager, container as never);

      instance.drawParticle(context as never, particle as never);
      container.outputColorSpace = "display-p3";
      instance.drawParticle(context as never, particle as never);

      expect(styles).to.have.length(2);
      expect(contextCalls.filter((call) => call === "stroke")).to.have.length(
        2,
      );
      expect(styles[0]).to.equal(styles[1]);
      expect(styles[0]).to.equal(
        getStyleFromOklch(color, false, undefined, 1000, undefined, "srgb"),
      );
      expect(styles[1]).to.equal(
        getStyleFromOklch(
          color,
          false,
          undefined,
          1000,
          undefined,
          "display-p3",
        ),
      );
    });

    it("matches the CSS Color 4 sRGB red reference", () => {
      const result = rgbToOklch(red);

      expect(result.l).to.be.closeTo(62.7955, 0.0001);
      expect(result.c).to.be.closeTo(0.257683, 0.000001);
      expect(result.h).to.be.closeTo(29.2339, 0.001);
    });

    it("matches the neutral sRGB white, black and gray references", () => {
      const black = rgbToOklch({ r: 0, g: 0, b: 0 }),
        gray = rgbToOklch({ r: 128, g: 128, b: 128 }),
        white = rgbToOklch({ r: 255, g: 255, b: 255 });

      expect(black).to.deep.equal({ c: 0, h: 0, l: 0 });
      expect(gray.l).to.be.closeTo(59.98708, 0.0001);
      expect(gray.c).to.be.lessThan(0.0000001);
      expect(gray.h).to.equal(0);
      expect(white.l).to.be.closeTo(100, 0.0001);
      expect(white.c).to.be.lessThan(0.0000001);
      expect(white.h).to.equal(0);
    });

    it("keeps achromatic hue stable and preserves floating point at conversion", () => {
      const gray = rgbToOklch({ r: 128, g: 128, b: 128 });

      expect(gray.c).to.be.lessThan(0.0000001);
      expect(gray.h).to.equal(0);

      const roundTrip = oklchToRgbFloat(rgbToOklch(red));

      expect(roundTrip.r).to.be.closeTo(red.r, 0.000255);
      expect(roundTrip.g).to.be.closeTo(red.g, 0.000255);
      expect(roundTrip.b).to.be.closeTo(red.b, 0.000255);
    });

    it("matches the independent CSS Color 4 OKLCH-to-sRGB reference", () => {
      // WPT css/css-color/oklch-005.html: oklch(50% 0.2 270) is
      // rgb(23.056% 31.73% 82.628%).
      const result = oklchToRgbFloat({ c: 0.2, h: 270, l: 50 });

      expect(result.r).to.be.closeTo(58.7928, 0.01);
      expect(result.g).to.be.closeTo(80.9115, 0.01);
      expect(result.b).to.be.closeTo(210.7014, 0.01);
    });

    it("maps into Display-P3 using the independent WPT gamut reference", () => {
      // WPT css-color/canvas-display-p3-gamut-mapping.html gives
      // [191, 227, 255] with a 9-channel tolerance for this color.
      const color = { c: 0.3, h: 240, l: 90 },
        mapped = mapOklchToDisplayP3(color),
        style = getStyleFromOklch(
          color,
          false,
          1,
          undefined,
          undefined,
          "display-p3",
        ),
        channels = /^oklch\(90% 0\.3 240° \/ 1\)$/u.exec(style);

      expect(channels).not.to.be.null;
      expect(style).to.equal("oklch(90% 0.3 240° / 1)");
      expect(mapped.color.c).to.be.lessThan(color.c);
    });

    it("maps the CSS Color 4 high-chroma P3 example near its published boundary", () => {
      // CSS Color 4 §14.2 gives color(display-p3 1 0.546 0) as an example
      // result for mapping oklch(76% 0.27 60); it is illustrative, not exact.
      const color = { c: 0.27, h: 60, l: 76 },
        mapped = mapOklchToDisplayP3(color);

      expect(mapped.color.l).to.equal(color.l);
      expect(mapped.color.h).to.equal(color.h);
      expect(mapped.color.c).to.be.lessThan(color.c);
      expect(mapped.rgb.r).to.be.closeTo(255, 9);
      expect(mapped.rgb.g).to.be.closeTo(0.546 * 255, 9);
      expect(mapped.rgb.b).to.be.closeTo(0, 9);
    });

    it("maps sRGB and Display-P3 cusp references from an independent implementation", () => {
      // Reference cusps were computed with colorjs.io 0.7.1 by searching the
      // maximum in-gamut chroma for each hue over lightness (epsilon 0).
      const cuspCases = [
        {
          gamut: "sRGB",
          map: mapOklchToSrgb,
          values: [
            {
              c: 0.253583,
              h: 30,
              l: 63.22837,
              rgb: { r: 255, g: 21.225, b: 0 },
            },
            {
              c: 0.273353,
              h: 145,
              l: 86.91193,
              rgb: { r: 0, g: 255, b: 73.067 },
            },
            {
              c: 0.234261,
              h: 260,
              l: 57.43053,
              rgb: { r: 0, g: 107.702, b: 255 },
            },
            {
              c: 0.317423,
              h: 325,
              l: 67.88539,
              rgb: { r: 239.675, g: 0, b: 255 },
            },
          ],
        },
        {
          gamut: "Display-P3",
          map: mapOklchToDisplayP3,
          values: [
            {
              c: 0.293224,
              h: 30,
              l: 65.4209,
              rgb: { r: 255, g: 27.202, b: 0 },
            },
            {
              c: 0.363472,
              h: 145,
              l: 85.16288,
              rgb: { r: 39.32, g: 255, b: 0 },
            },
            {
              c: 0.275999,
              h: 260,
              l: 53.74775,
              rgb: { r: 0, g: 83.755, b: 255 },
            },
            {
              c: 0.345605,
              h: 325,
              l: 68.00807,
              rgb: { r: 225.573, g: 0, b: 255 },
            },
          ],
        },
      ];

      for (const { gamut, map, values } of cuspCases) {
        for (const cusp of values) {
          const mapped = map({ ...cusp, c: cusp.c * 1.25 });

          expect(mapped.color.l, `${gamut} L at h=${cusp.h}`).to.be.closeTo(
            cusp.l,
            0.001,
          );
          expect(mapped.color.h, `${gamut} h=${cusp.h}`).to.equal(cusp.h);
          expect(mapped.color.c, `${gamut} C at h=${cusp.h}`).to.be.closeTo(
            cusp.c,
            0.0003,
          );
          expect(mapped.rgb.r, `${gamut} red at h=${cusp.h}`).to.be.closeTo(
            cusp.rgb.r,
            0.5,
          );
          expect(mapped.rgb.g, `${gamut} green at h=${cusp.h}`).to.be.closeTo(
            cusp.rgb.g,
            0.5,
          );
          expect(mapped.rgb.b, `${gamut} blue at h=${cusp.h}`).to.be.closeTo(
            cusp.rgb.b,
            0.5,
          );
        }
      }
    });

    it("parses CSS Display-P3 input without collapsing it into clipped sRGB", () => {
      const resolved = rangeColorToOklch(
          pluginManager,
          "color(display-p3 1 0 0 / 40%)",
        ),
        reference = displayP3ToOklch({ r: 255, g: 0, b: 0 });

      expect(resolved?.a).to.equal(0.4);
      expect(resolved?.l).to.be.closeTo(64.857, 0.001);
      expect(resolved?.c).to.be.closeTo(0.29949, 0.00001);
      expect(resolved?.h).to.be.closeTo(28.958, 0.001);
      expect(resolved?.l).to.equal(reference.l);
      expect(resolved?.c).to.equal(reference.c);
      expect(resolved?.h).to.equal(reference.h);
    });

    it("matches the CSS Color 4 OKLCH vectors for all Display-P3 primaries", () => {
      const primaries = [
        {
          input: "color(display-p3 1 0 0)",
          expected: { c: 0.29949, h: 28.958, l: 64.857 },
        },
        {
          input: "color(display-p3 0 1 0)",
          expected: { c: 0.36853, h: 145.645, l: 84.883 },
        },
        {
          input: "color(display-p3 0 0 1)",
          expected: { c: 0.32316, h: 264.052, l: 46.636 },
        },
      ];

      for (const { input, expected } of primaries) {
        const result = rangeColorToOklch(pluginManager, input);

        expect(result?.l).to.be.closeTo(expected.l, 0.001);
        expect(result?.c).to.be.closeTo(expected.c, 0.00001);
        expect(result?.h).to.be.closeTo(expected.h, 0.001);
      }
    });

    it("maps rounded Display-P3 primary OKLCH references close to their boundaries", () => {
      const primaries = [
        {
          color: { c: 0.29949, h: 28.958, l: 64.857 },
          expected: { r: 255, g: 0, b: 0 },
        },
        {
          color: { c: 0.36853, h: 145.645, l: 84.883 },
          expected: { r: 0, g: 255, b: 0 },
        },
        {
          color: { c: 0.32316, h: 264.052, l: 46.636 },
          expected: { r: 0, g: 0, b: 255 },
        },
      ];

      for (const { color, expected } of primaries) {
        const mapped = mapOklchToDisplayP3(color);

        expect(mapped.color.c).to.be.closeTo(color.c, 0.0002);
        expect(mapped.rgb.r).to.be.closeTo(expected.r, 0.5);
        expect(mapped.rgb.g).to.be.closeTo(expected.g, 0.5);
        expect(mapped.rgb.b).to.be.closeTo(expected.b, 0.5);
      }
    });

    it("maps each destination gamut without mutating the canonical color", () => {
      const maps = [
          { map: mapOklchToSrgb, name: "sRGB" },
          { map: mapOklchToDisplayP3, name: "Display-P3" },
        ],
        inputs = [
          { c: 0.02, h: 210, l: 55 },
          { c: 0.5, h: 20, l: 60 },
          { c: 0.4, h: 180, l: -10 },
          { c: 0.4, h: 180, l: 110 },
        ];

      for (const { map, name } of maps) {
        for (const input of inputs) {
          const original = { ...input },
            result = map(input);

          expect(input, `${name} input`).to.deep.equal(original);
          expect(result.color, `${name} result`).not.to.equal(input);
          expect(result.color.l, `${name} lightness`).to.be.within(0, 100);
          expect(result.rgb.r, `${name} red`).to.be.within(-0.1, 255.1);
          expect(result.rgb.g, `${name} green`).to.be.within(-0.1, 255.1);
          expect(result.rgb.b, `${name} blue`).to.be.within(-0.1, 255.1);
        }
      }
    });

    it("preserves extended Display-P3 channels when resolving to OKLCH", () => {
      // CSS Color 4 §14.1.1 gives this out-of-P3 color as an equivalent
      // to oklch(85.07% 0.4873 151.4), before destination gamut mapping.
      const result = rangeColorToOklch(
          pluginManager,
          "color(display-p3 -0.5782 1.067 -0.2363)",
        ),
        percentage = rangeColorToOklch(
          pluginManager,
          "color(display-p3 -57.82% 106.7% -23.63%)",
        );

      expect(result?.l).to.be.closeTo(85.07, 0.05);
      expect(result?.c).to.be.closeTo(0.4873, 0.0003);
      expect(result?.h).to.be.closeTo(151.4, 0.1);
      expect(result?.a).to.equal(1);
      expect(percentage).to.deep.equal(result);

      const mapped = mapOklchToDisplayP3(result ?? { c: 0, h: 0, l: 0 });

      expect(mapped.color.l).to.equal(result?.l);
      expect(mapped.color.h).to.equal(result?.h);
      expect(mapped.color.c).to.be.lessThan(result?.c ?? 0);

      for (const channel of [mapped.rgb.r, mapped.rgb.g, mapped.rgb.b]) {
        expect(Number.isFinite(channel)).to.be.true;
        expect(channel).to.be.at.least(0).and.at.most(255);
      }
    });

    it("preserves extended sRGB coordinates and rejects malformed alpha", () => {
      const extended = { r: 300, g: -100, b: 20 },
        roundTrip = oklchToRgbFloat(rgbToOklch(extended));

      expect(roundTrip.r).to.be.closeTo(extended.r, 0.0003);
      expect(roundTrip.g).to.be.closeTo(extended.g, 0.0003);
      expect(roundTrip.b).to.be.closeTo(extended.b, 0.0003);
      expect(rangeColorToOklch(pluginManager, "color(display-p3 1 0 0 / 101%)"))
        .to.be.undefined;
      expect(rangeColorToOklch(pluginManager, "oklch(70% 0.2 30) extra")).to.be
        .undefined;
      expect(rangeColorToOklch(pluginManager, "oklch(120% 0.2 30)")).to.be
        .undefined;
      expect(rangeColorToOklch(pluginManager, "oklch(0.7 -0.2 30)")).to.be
        .undefined;
      expect(
        rangeColorToOklch(pluginManager, {
          value: { oklch: { c: 0.2, h: 30, l: 101 } },
        }),
      ).to.be.undefined;

      const unitless = rangeColorToOklch(pluginManager, "oklch(0.7 0.2 30)"),
        percentage = rangeColorToOklch(pluginManager, "oklch(70% 0.2 30)");

      expect(unitless).to.deep.equal(percentage);
      expect(unitless?.l).to.equal(70);
    });

    it("parses every CSS hue angle unit in the engine's native OKLCH fallback", () => {
      const bareEngine = createEngine();

      for (const hue of [
        "180deg",
        "180°",
        "200grad",
        "3.141592653589793rad",
        ".5turn",
      ]) {
        expect(
          rangeColorToOklch(bareEngine.pluginManager, `oklch(70% 0.2 ${hue})`)
            ?.h,
          hue,
        ).to.be.closeTo(180, 1e-10);
      }
    });

    it("keeps alpha and canonical channels when a built-in HSL manager resolves a string", () => {
      const resolved = rangeColorToOklch(
        pluginManager,
        "hsla(210, 35%, 42%, 0.3)",
      );

      expect(resolved?.a).to.equal(0.3);
      expect(
        [resolved?.l, resolved?.c, resolved?.h].every(Number.isFinite),
      ).to.equal(true);
      expect(resolved?.c).to.be.greaterThan(0);
    });

    it("rejects malformed RGB, HSL, and HSV strings and out-of-range channels", () => {
      const invalidColors = [
        "rgb(1, 2, 3) trailing",
        "rgb(256, 0, 0)",
        "rgba(1, 2, 3, 101%)",
        "hsl(210, 35%, 42%) trailing",
        "hsl(210, 101%, 42%)",
        "hsla(210, 35%, 42%, 101%)",
        "hsv(120°, 40%, 50%) trailing",
        "hsv(120°, 101%, 50%)",
        "hsva(120°, 40%, 50%, 101%)",
        "hwb(120 10% 20%) trailing",
        "hwb(120 101% 20%)",
        "hwb(120 10% 101%)",
        "hwba(120 10% 20% / 101%)",
      ];

      for (const input of invalidColors) {
        expect(rangeColorToOklch(pluginManager, input), input).to.be.undefined;
      }
    });

    it("accepts case-insensitive built-in color functions and signed hue", () => {
      const rgb = rangeColorToOklch(pluginManager, "RGB(12, 34, 56)"),
        hsl = rangeColorToOklch(pluginManager, "HSLA(-150, 35%, 42%, 0.3)"),
        hsv = rangeColorToOklch(pluginManager, "HSVA(-240°, 40%, 50%, 37%)"),
        hwbDeg = rangeColorToOklch(pluginManager, "HWBA(90deg 10% 20% / 0.4)"),
        hwbRad = rangeColorToOklch(
          pluginManager,
          "hwb(1.5707963267948966rad 10% 20%)",
        ),
        hwbTurn = rangeColorToOklch(pluginManager, "hwb(0.25turn 10% 20%)"),
        hwbGrad = rangeColorToOklch(pluginManager, "hwb(100grad 10% 20%)"),
        hwbNegative = rangeColorToOklch(pluginManager, "hwb(-270deg 10% 20%)");

      expect(rgb?.a).to.equal(1);
      expect(hsl?.a).to.equal(0.3);
      expect(hsv?.a).to.equal(0.37);
      expect(hwbDeg?.a).to.equal(0.4);
      expect(hwbRad?.l).to.be.closeTo(hwbDeg?.l ?? 0, 0.0001);
      expect(hwbTurn?.l).to.be.closeTo(hwbDeg?.l ?? 0, 0.0001);
      expect(hwbGrad?.l).to.be.closeTo(hwbDeg?.l ?? 0, 0.0001);
      expect(hwbNegative?.l).to.be.closeTo(hwbDeg?.l ?? 0, 0.0001);
      expect(
        [rgb?.l, hsl?.l, hsv?.l, hwbDeg?.l, hwbNegative?.l].every(
          Number.isFinite,
        ),
      ).to.equal(true);
    });

    it("uses the engine RNG to resolve RGB, HSL, HSV and HWB ranges", () => {
      const rangeCases = [
        {
          fixed: { value: { rgb: { b: 65, g: 30, r: 25 } } },
          name: "RGB",
          ranged: {
            value: {
              rgb: {
                b: { max: 80, min: 20 },
                g: { max: 50, min: 10 },
                r: { max: 100, min: 0 },
              },
            },
          },
        },
        {
          fixed: { value: { hsl: { h: 90, l: 50, s: 65 } } },
          name: "HSL",
          ranged: {
            value: {
              hsl: {
                h: { max: 360, min: 0 },
                l: { max: 70, min: 30 },
                s: { max: 80, min: 20 },
              },
            },
          },
        },
        {
          fixed: { value: { hsv: { h: 90, s: 50, v: 60 } } },
          name: "HSV",
          ranged: {
            value: {
              hsv: {
                h: { max: 360, min: 0 },
                s: { max: 80, min: 20 },
                v: { max: 70, min: 30 },
              },
            },
          },
        },
        {
          fixed: { value: { hwb: { b: 60, h: 90, w: 20 } } },
          name: "HWB",
          ranged: {
            value: {
              hwb: {
                b: { max: 70, min: 30 },
                h: { max: 360, min: 0 },
                w: { max: 30, min: 10 },
              },
            },
          },
        },
      ];

      for (const { fixed, name, ranged } of rangeCases) {
        const samples = [0.25, 0.5, 0.75];
        let randomCalls = 0;

        tsParticles.setRandom(() => samples[randomCalls++] ?? 0);

        try {
          const resolved = rangeColorToOklch(pluginManager, ranged);

          expect(randomCalls, `${name} RNG calls`).to.equal(3);
          expect(resolved, `${name} sampled result`).to.deep.equal(
            rangeColorToOklch(pluginManager, fixed),
          );
        } finally {
          tsParticles.setRandom();
        }
      }
    });

    it("resolves through a native manager with no RGB hooks", () => {
      const direct = { a: 0.4, c: 0.17, h: 585, l: 62 },
        directManager: IColorManager = {
          accepts: (input) => input.startsWith("direct("),
          handleColorOklch: () => direct,
          handleRangeColorOklch: () => direct,
          parseStringOklch: () => direct,
        },
        directEngine = createEngine();

      directEngine.pluginManager.addColorManager("direct", directManager);

      expect(
        rangeColorToOklch(directEngine.pluginManager, "direct(color)"),
      ).to.deep.equal({ ...direct, h: 225 });
      expect(
        rangeColorToOklch(directEngine.pluginManager, {
          value: { direct: true },
        }),
      ).to.deep.equal({
        ...direct,
        h: 225,
      });
    });

    it("rejects invalid direct OKLCH manager results", () => {
      const customEngine = createEngine(),
        customManager: IColorManager = {
          accepts: (input) => input.startsWith("custom("),
          handleColorOklch: () => undefined,
          handleRangeColorOklch: () => ({ a: 1.1, c: 0.2, h: 30, l: 50 }),
          parseStringOklch: () => ({
            a: Number.NaN,
            c: -0.1,
            h: Number.POSITIVE_INFINITY,
            l: 50,
          }),
        };

      customEngine.pluginManager.addColorManager("custom", customManager);

      expect(rangeColorToOklch(customEngine.pluginManager, "custom(color)")).to
        .be.undefined;
      expect(
        rangeColorToOklch(customEngine.pluginManager, {
          value: { custom: true },
        }),
      ).to.be.undefined;
    });

    it("rejects custom OKLCH manager lightness outside the canonical range", () => {
      const customEngine = createEngine(),
        customManager: IColorManager = {
          accepts: (input) => input.startsWith("custom("),
          handleColorOklch: () => undefined,
          handleRangeColorOklch: () => ({ a: 0.6, c: 0.2, h: 30, l: -1 }),
          parseStringOklch: () => ({ a: 0.35, c: 0.2, h: 30, l: 101 }),
        };

      customEngine.pluginManager.addColorManager("custom", customManager);

      expect(rangeColorToOklch(customEngine.pluginManager, "custom(color)")).to
        .be.undefined;
      expect(
        rangeColorToOklch(customEngine.pluginManager, {
          value: { custom: true },
        }),
      ).to.be.undefined;
    });

    it("adapts custom managers that only implement the legacy RGB contract", () => {
      const customEngine = createEngine(),
        customRgb = { r: 12.5, g: 87.25, b: 194.75 },
        legacyManager: ILegacyColorManager = {
          accepts: (input) => input.startsWith("custom("),
          handleColor: () => customRgb,
          handleRangeColor: () => customRgb,
          parseString: () => ({ ...customRgb, a: 0.35 }),
        },
        customManager = adaptLegacyColorManager(legacyManager);

      customEngine.pluginManager.addColorManager("custom", customManager);

      const parsed = rangeColorToOklch(
        customEngine.pluginManager,
        "custom(color)",
      );

      expect(parsed).to.deep.equal({ ...rgbToOklch(customRgb), a: 0.35 });
      expect(
        rangeColorToOklch(customEngine.pluginManager, {
          value: { custom: true },
        }),
      ).to.deep.equal({
        ...rgbToOklch(customRgb),
        a: 1,
      });
    });

    it("selects an indexed color-array entry before canonical parsing", () => {
      const resolved = rangeColorToOklch(
        pluginManager,
        { value: ["oklch(20% 0.1 10)", "oklch(30% 0.2 20)"] },
        1,
      );

      expect(resolved).to.deep.equal({ a: 1, c: 0.2, h: 20, l: 30 });
    });

    it("resolves native OKLCH syntax without an RGB round trip and keeps alpha", () => {
      const resolved = rangeColorToOklch(
        pluginManager,
        "oklch(70% 0.2 -10 / 50%)",
      );

      expect(resolved).to.deep.equal({ a: 0.5, c: 0.2, h: 350, l: 70 });
      expect(
        getStyleFromOklch({ a: 0.5, c: 0.2, h: 350, l: 70 }, false, 0.4),
      ).to.equal("oklch(70% 0.2 350° / 0.2)");
    });

    it("uses explicit Display-P3 primaries for tagged RGB object input", () => {
      const tagged = rangeColorToOklch(pluginManager, {
          value: { a: 0.4, b: 0, colorSpace: "display-p3", g: 0, r: 255 },
        }),
        css = rangeColorToOklch(pluginManager, "color(display-p3 1 0 0 / 40%)");

      expect(tagged).to.deep.equal(css);
    });

    it("serializes canonical out-of-sRGB colors directly for browser conversion", () => {
      const mapped = mapOklchToSrgb({ c: 0.4, h: 145, l: 72 }),
        style = getStyleFromOklch({ c: 0.4, h: 145, l: 72 }, false);

      expect(style).to.equal("oklch(72% 0.4 145° / 1)");
      expect(mapped.color.c).to.be.lessThan(0.4);

      for (const channel of [mapped.rgb.r, mapped.rgb.g, mapped.rgb.b]) {
        expect(channel).to.be.at.least(0).and.at.most(255);
      }
    });

    it("keeps sRGB and Display-P3 cusp-boundary results in gamut", () => {
      const boundaryColors = [
          { c: 0.8, h: 0, l: 10 },
          { c: 0.8, h: 60, l: 50 },
          { c: 0.8, h: 120, l: 90 },
          { c: 0.8, h: 180, l: 10 },
          { c: 0.8, h: 240, l: 50 },
          { c: 0.8, h: 300, l: 90 },
        ],
        targets = [
          { map: mapOklchToSrgb, name: "sRGB" },
          { map: mapOklchToDisplayP3, name: "Display-P3" },
        ];

      for (const target of targets) {
        for (const color of boundaryColors) {
          const mapped = target.map(color);

          expect(mapped.color.l, `${target.name} lightness`).to.equal(color.l);
          expect(mapped.color.h, `${target.name} hue`).to.equal(color.h);
          expect(mapped.color.c, `${target.name} chroma`)
            .to.be.at.least(0)
            .and.lessThan(color.c);

          for (const channel of [mapped.rgb.r, mapped.rgb.g, mapped.rgb.b]) {
            expect(Number.isFinite(channel), `${target.name} finite channel`).to
              .be.true;
            expect(channel, `${target.name} channel range`)
              .to.be.at.least(0)
              .and.at.most(255);
          }
        }
      }

      const neutral = { c: 0, h: 0, l: 50 };

      for (const target of targets) {
        expect(target.map(neutral).color).to.deep.equal(neutral);
      }
    });

    it("uses channel units directly and wraps hue within configured bounds", () => {
      const animationOptions = new OklchAnimation();

      animationOptions.load({
        h: { enable: true, max: 100, min: 30, speed: 30, sync: true },
      });

      const animation = getOklchAnimationFromOklch(
        { c: 0.1, h: 95, l: 50 },
        animationOptions,
        1,
      );

      expect(animation.h.velocity).to.equal(30);

      updateColor(animation, { factor: 1, value: 16 });
      expect(animation.h.value).to.equal(55);
    });

    it("wraps hue across multiple configured turns in both directions", () => {
      const makeAnimation = (
          h: number,
          velocity: number,
        ): IParticleOklchAnimation => ({
          a: 1,
          c: { enable: false, max: 0.4, min: 0, value: 0 },
          h: { enable: true, max: 100, min: 30, value: h, velocity },
          l: { enable: false, max: 100, min: 0, value: 50 },
        }),
        forward = makeAnimation(95, 250),
        reverse = makeAnimation(35, -250);

      updateColor(forward, { factor: 1, value: 16 });
      updateColor(reverse, { factor: 1, value: 16 });

      expect(forward.h.value).to.equal(65);
      expect(forward.h.loops).to.equal(4);
      expect(reverse.h.value).to.equal(65);
      expect(reverse.h.loops).to.equal(4);
    });

    it("continues hue animation while chroma is achromatic", () => {
      const animation = {
        a: 1,
        c: { enable: false, max: 0.4, min: 0, value: 0 },
        h: { enable: true, max: 360, min: 0, value: 350, velocity: 20 },
        l: { enable: false, max: 100, min: 0, value: 50 },
      };

      updateColor(animation, { factor: 1, value: 16 });

      expect(animation.c.value).to.equal(0);
      expect(animation.h.value).to.equal(10);
    });

    it("applies the delay once and decays hue velocity on each active tick", () => {
      const options = new OklchAnimation();

      options.load({
        h: {
          enable: true,
          max: 360,
          min: 0,
          speed: 20,
          decay: 0.5,
          delay: 1,
          sync: true,
        },
      });

      const animation = getOklchAnimationFromOklch(
        { c: 0.1, h: 30, l: 50 },
        options,
        1,
      );

      updateColor(animation, { factor: 1, value: 500 });
      expect(animation.h.value).to.equal(30);
      expect(animation.h.time).to.equal(500);
      expect(animation.h.velocity).to.equal(20);

      updateColor(animation, { factor: 1, value: 500 });
      expect(animation.h.value).to.equal(50);
      expect(animation.h.time).to.equal(1000);
      expect(animation.h.velocity).to.equal(10);

      updateColor(animation, { factor: 1, value: 500 });
      expect(animation.h.value).to.equal(60);
      expect(animation.h.velocity).to.equal(5);
    });

    it("stops hue at its configured completed-loop count", () => {
      const options = new OklchAnimation();

      options.load({
        h: { enable: true, max: 360, min: 0, speed: 200, count: 1, sync: true },
      });

      const animation = getOklchAnimationFromOklch(
        { c: 0.1, h: 300, l: 50 },
        options,
        1,
      );

      updateColor(animation, { factor: 1, value: 16 });
      expect(animation.h.value).to.equal(140);
      expect(animation.h.loops).to.equal(1);

      updateColor(animation, { factor: 1, value: 16 });
      expect(animation.h.value).to.equal(140);
      expect(animation.h.loops).to.equal(1);
    });

    it("stops an oscillating channel after its configured full period", () => {
      const options = new OklchAnimation();

      options.load({
        c: { enable: true, max: 1, min: 0, speed: 0.2, count: 1, sync: true },
      });

      const animation = getOklchAnimationFromOklch(
        { c: 0.9, h: 120, l: 50 },
        options,
        1,
      );

      for (let tick = 0; tick < 7; tick++) {
        updateColor(animation, { factor: 1, value: 16 });
      }

      expect(animation.c.value).to.equal(0);
      expect(animation.c.loops).to.equal(2);

      updateColor(animation, { factor: 1, value: 16 });

      expect(animation.c.value).to.equal(0);
      expect(animation.c.loops).to.equal(2);
    });

    it("uses the supplied RNG for unsynchronized start and per-tick offset", () => {
      const options = new OklchAnimation(),
        samples = [0.25, 0.5, 0.5];
      let randomCalls = 0;

      options.load({
        h: {
          enable: true,
          max: 360,
          min: 0,
          speed: 20,
          offset: { min: 2, max: 4 },
          sync: false,
        },
      });

      const animation = getOklchAnimationFromOklch(
        { c: 0.1, h: 120, l: 50 },
        options,
        2,
        () => {
          return samples[randomCalls++] ?? 0;
        },
      );

      expect(animation.h.velocity).to.equal(10);
      expect(animation.h.value).to.equal(60);
      expect(animation.h.initialValue).to.equal(60);

      updateColor(
        animation,
        { factor: 1, value: 16 },
        false,
        () => samples[randomCalls++] ?? 0,
      );

      expect(animation.h.value).to.equal(73);
      expect(randomCalls).to.equal(3);
    });

    it("composes static color alpha with particle opacity without animating alpha", () => {
      const animation = getOklchAnimationFromOklch(
        { a: 0.4, c: 0.1, h: 120, l: 50 },
        new OklchAnimation(),
        1,
      );

      updateColor(animation, { factor: 1, value: 16 });

      expect(animation.a).to.equal(0.4);
      expect(
        getStyleFromOklch(
          {
            a: animation.a,
            c: animation.c.value,
            h: animation.h.value,
            l: animation.l.value,
          },
          false,
          0.5,
        ),
      ).to.include(", 0.2)");
    });
  });

  describe("hslaToRgba", () => {
    it("hsl value", () => {
      const color: IHsla = {
          a: 1,
          h: 0,
          l: 50,
          s: 100,
        },
        rgb = hslaToRgba(color);

      console.log("rgb", rgb, red);

      expect(rgb).include(red).and.to.include({ a: 1 }).and.not.be.undefined.and
        .not.be.null;
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
    const checkRange = (n: number, min?: number): boolean =>
        n >= (min ?? 0) && n < 256,
      checkColor = (rgb: IRgb, min?: number): boolean =>
        checkRange(rgb.r, min) &&
        checkRange(rgb.g, min) &&
        checkRange(rgb.b, min);

    it("totally random color", () => {
      expect(getRandomRgbColor()).to.satisfy((rgb: IRgb) => checkColor(rgb)).and
        .not.be.undefined.and.not.be.null;
    });

    it("random color with min seed", () => {
      const min = 200;

      expect(getRandomRgbColor(min)).to.satisfy((rgb: IRgb) =>
        checkColor(rgb, min),
      ).and.not.be.undefined.and.not.be.null;
    });
  });

  describe("getStyleFromColor", () => {
    it("IRgb to rgba string", () => {
      expect(getStyleFromRgb(red, false)).to.equal("rgba(255, 0, 0, 1)");
    });

    it("IHsl to hsla string", () => {
      const color: IHsl = {
        h: 0,
        l: 50,
        s: 100,
      };

      expect(getStyleFromHsl(color, false)).to.equal("hsla(0, 100%, 50%, 1)");
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

  describe("getStyleFromRgb HDR", () => {
    const referenceWhiteNits = 203,
      displayP3ToLinear = (channel: number): number =>
        Math.abs(channel) <= 0.04045
          ? channel / 12.92
          : Math.sign(channel) *
            Math.pow((Math.abs(channel) + 0.055) / 1.055, 2.4),
      parseDisplayP3 = (style: string): { b: number; g: number; r: number } => {
        const match =
          /^color\(display-p3 ([\d.]+) ([\d.]+) ([\d.]+) \/ ([\d.]+)\)$/u.exec(
            style,
          );

        expect(match).not.be.null;

        return {
          b: Number.parseFloat(match?.[3] ?? ""),
          g: Number.parseFloat(match?.[2] ?? ""),
          r: Number.parseFloat(match?.[1] ?? ""),
        };
      };

    it("standard mode outputs untone-mapped normalized channels", () => {
      const p3 = rgbToDisplayP3Float(red);

      expect(getStyleFromRgb(red, true)).to.equal(
        `color(display-p3 ${p3.r / 255} ${p3.g / 255} ${p3.b / 255} / 1)`,
      );
      expect(p3.r / 255).to.be.closeTo(0.91755205, 0.000001);
      expect(p3.g / 255).to.be.closeTo(0.20030383, 0.000001);
      expect(p3.b / 255).to.be.closeTo(0.13857343, 0.000001);
    });

    it("converts sRGB inputs to Display-P3 before HDR output", () => {
      const green: IRgb = { b: 0, g: 255, r: 0 },
        p3 = rgbToDisplayP3Float(green),
        channels = parseDisplayP3(getStyleFromRgb(green, true));

      expect(channels.r).to.equal(p3.r / 255);
      expect(channels.g).to.equal(p3.g / 255);
      expect(channels.b).to.equal(p3.b / 255);
    });

    it("formats OKLCH HDR colors in the Display-P3 coordinate space", () => {
      const color = { c: 0.27, h: 60, l: 76 },
        p3 = oklchToDisplayP3Float(color),
        expected = `color(display-p3 ${p3.r / 255} ${p3.g / 255} ${p3.b / 255} / 1)`;

      expect(
        getStyleFromOklch(color, true, 1, 400, HdrMode.standard, "display-p3"),
      ).to.equal(expected);
    });

    it("SDR output ignores HDR-only params", () => {
      expect(getStyleFromRgb(red, false, 1, 1000, HdrMode.vivid)).to.equal(
        "rgba(255, 0, 0, 1)",
      );
    });

    it("keeps linear Display-P3 channels within the display headroom for every mode", () => {
      for (const mode of [
        HdrMode.natural,
        HdrMode.vivid,
        HdrMode.cinematic,
        HdrMode.dynamic,
      ]) {
        const channels = parseDisplayP3(
            getStyleFromRgb(red, true, 1, 400, mode),
          ),
          maxChannel = Math.max(1, 400 / referenceWhiteNits);

        for (const channel of [channels.r, channels.g, channels.b]) {
          const linearChannel = displayP3ToLinear(channel);

          expect(linearChannel).to.be.at.least(0).and.to.be.at.most(maxChannel);
        }
      }
    });

    it("allows channels beyond 1 for bright colors on capable displays", () => {
      const channels = parseDisplayP3(
        getStyleFromRgb(red, true, 1, 400, HdrMode.natural),
      );

      expect(channels.r).to.be.above(1);
    });

    it("vivid mode keeps linear channels within the display headroom", () => {
      const channels = parseDisplayP3(
        getStyleFromRgb(red, true, 1, 400, HdrMode.vivid),
      );

      expect(displayP3ToLinear(channels.r)).to.be.at.most(
        400 / referenceWhiteNits,
      );
    });

    it("dynamic mode keeps the blue channel intact", () => {
      const blue: IRgb = {
          b: 255,
          g: 0,
          r: 0,
        },
        channels = parseDisplayP3(
          getStyleFromRgb(blue, true, 1, 400, HdrMode.dynamic),
        );

      expect(channels.b).to.be.at.least(0.9);
    });

    it("each HdrMode produces its documented distinct transformation", () => {
      const color: IRgb = {
          b: 160,
          g: 40,
          r: 80,
        },
        styles = new Set(
          [
            HdrMode.standard,
            HdrMode.natural,
            HdrMode.vivid,
            HdrMode.cinematic,
            HdrMode.dynamic,
          ].map((mode) => getStyleFromRgb(color, true, 1, 400, mode)),
        );

      expect(styles.size).to.equal(5);
    });

    it("measures linear Display-P3 luminance and expands it with peakNits", () => {
      const color: IRgb = {
          b: 255,
          g: 180,
          r: 200,
        },
        luminanceNits = (channels: {
          b: number;
          g: number;
          r: number;
        }): number =>
          referenceWhiteNits *
          (0.2289745641 * displayP3ToLinear(channels.r) +
            0.6917385218 * displayP3ToLinear(channels.g) +
            0.0792869141 * displayP3ToLinear(channels.b)),
        luminance400 = luminanceNits(
          parseDisplayP3(getStyleFromRgb(color, true, 1, 400, HdrMode.natural)),
        ),
        luminance1000 = luminanceNits(
          parseDisplayP3(
            getStyleFromRgb(color, true, 1, 1000, HdrMode.natural),
          ),
        );

      expect(luminance1000).to.be.above(luminance400);
      expect(luminance400).to.be.closeTo(155.88603, 0.01);
      expect(luminance1000).to.be.closeTo(183.97916, 0.01);
    });
  });
});
