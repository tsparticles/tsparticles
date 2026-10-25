/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import {
  AlterType,
  type IHsl,
  type IRgb,
  MoveDirection,
  alterHsl,
  calcExactPositionOrRandomFromSize,
  calcPositionFromSize,
  calcPositionOrRandomFromSize,
  calcPositionOrRandomFromSizeRanged,
  checkDistance,
  clamp,
  colorMix,
  deepExtend,
  degToRad,
  executeOnSingleOrMultiple,
  getDistance,
  getDistanceSq,
  getDistances,
  getParticleBaseVelocity,
  getParticleDirectionAngle,
  getRandom,
  getRandomFn,
  getRandomInRange,
  getRangeMax,
  getRangeMin,
  getRangeValue,
  hslToRgb,
  hslToRgbFloat,
  hslaToRgba,
  isInArray,
  itemFromArray,
  itemFromSingleOrMultiple,
  mix,
  parseAlpha,
  randomInRangeValue,
  rgbToHsl,
  setRandom,
  setRangeValue,
} from "@tsparticles/engine";
import { afterEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";

describe("EngineUtils", () => {
  globalThis.window = TestWindow;

  afterEach(() => {
    setRandom();
  });

  describe("getRandom, getRandomInRange and getRandomFn", () => {
    it("clamps the injected random source into [0, 1)", () => {
      setRandom(() => 1);
      expect(getRandom()).to.equal(1 - Number.EPSILON);

      setRandom(() => -1);
      expect(getRandom()).to.equal(0);
    });

    it("passes through a deterministic random source", () => {
      setRandom(() => 0.5);
      expect(getRandom()).to.equal(0.5);
    });

    it("maps a deterministic source between the given bounds", () => {
      setRandom(() => 0.5);
      expect(getRandomInRange(-10, 10)).to.equal(0);
      expect(getRandomInRange(10, 20)).to.equal(15);
      expect(getRandomInRange(0, 0)).to.equal(0);
    });

    it("exposes the currently installed random function", () => {
      const fn = (): number => 0.25;

      setRandom(fn);
      expect(getRandomFn()).to.equal(fn);

      setRandom();
      expect(getRandomFn()).to.equal(Math.random);
    });
  });

  describe("range helpers", () => {
    it("getRangeValue returns numbers unchanged", () => {
      expect(getRangeValue(5)).to.equal(5);
      expect(getRangeValue(0)).to.equal(0);
      expect(getRangeValue(-3.5)).to.equal(-3.5);
    });

    it("getRangeValue samples an object range with the random source", () => {
      setRandom(() => 0.5);
      expect(getRangeValue({ min: 2, max: 4 })).to.equal(3);
    });

    it("getRangeMin and getRangeMax read numbers and object bounds", () => {
      expect(getRangeMin(7)).to.equal(7);
      expect(getRangeMax(7)).to.equal(7);
      expect(getRangeMin({ min: -2, max: 9 })).to.equal(-2);
      expect(getRangeMax({ min: -2, max: 9 })).to.equal(9);
    });

    it("randomInRangeValue samples the open range when min and max differ", () => {
      setRandom(() => 0.5);
      expect(randomInRangeValue({ min: 0, max: 10 })).to.equal(5);
      expect(randomInRangeValue({ min: -10, max: -1 })).to.equal(-5.5);
    });

    it("randomInRangeValue falls back to a zero based range when min equals max", () => {
      setRandom(() => 0.5);
      expect(randomInRangeValue({ min: 8, max: 8 })).to.equal(4);
      expect(randomInRangeValue(8)).to.equal(4);
    });

    it("setRangeValue normalizes ranges and widens them around a value", () => {
      expect(setRangeValue(5)).to.equal(5);
      expect(setRangeValue(5, 5)).to.equal(5);
      expect(setRangeValue({ min: 1, max: 5 }, 3)).to.eql({ min: 1, max: 5 });
      expect(setRangeValue({ min: 1, max: 5 }, 0)).to.eql({ min: 0, max: 5 });
      expect(setRangeValue({ min: 1, max: 5 }, 10)).to.eql({ min: 1, max: 10 });
      expect(setRangeValue(5, 10)).to.eql({ min: 5, max: 10 });
    });

    it("setRangeValue keeps object ranges untouched when no value is given", () => {
      expect(setRangeValue({ min: 3, max: 7 })).to.eql({ min: 3, max: 7 });
    });
  });

  describe("clamp and mix", () => {
    it("clamp keeps the value inside the inclusive bounds", () => {
      expect(clamp(-5, 1, 10)).to.equal(1);
      expect(clamp(1, 1, 10)).to.equal(1);
      expect(clamp(5, 1, 10)).to.equal(5);
      expect(clamp(10, 1, 10)).to.equal(10);
      expect(clamp(15, 1, 10)).to.equal(10);
    });

    it("mix returns the floored weighted average", () => {
      expect(mix(6, 9, 2, 1)).to.equal(7);
      expect(mix(5, 10, 1, 1)).to.equal(7);
      expect(mix(5, 10, 1, 0)).to.equal(5);
      expect(mix(5, 10, 0, 1)).to.equal(10);
      expect(mix(-6, -9, 2, 1)).to.equal(-7);
    });
  });

  describe("angles and directions", () => {
    it("degToRad converts degrees to radians", () => {
      expect(degToRad(0)).to.equal(0);
      expect(degToRad(90)).to.equal(Math.PI / 2);
      expect(degToRad(180)).to.equal(Math.PI);
    });

    it("getParticleDirectionAngle maps the cardinal directions", () => {
      const center = { x: 0, y: 0 },
        position = { x: 1, y: 0 };

      expect(getParticleDirectionAngle(MoveDirection.right, position, center)).to.equal(0);
      expect(getParticleDirectionAngle(MoveDirection.top, position, center)).to.equal(-Math.PI / 2);
      expect(getParticleDirectionAngle(MoveDirection.bottom, position, center)).to.equal(Math.PI / 2);
      expect(getParticleDirectionAngle(MoveDirection.left, position, center)).to.equal(Math.PI);
      expect(getParticleDirectionAngle(MoveDirection.topRight, position, center)).to.equal(-Math.PI / 4);
    });

    it("getParticleDirectionAngle accepts numeric degrees", () => {
      expect(getParticleDirectionAngle(180, { x: 0, y: 0 }, { x: 0, y: 0 })).to.equal(Math.PI);
    });

    it("getParticleDirectionAngle points toward the center for inside", () => {
      expect(getParticleDirectionAngle(MoveDirection.inside, { x: 1, y: 0 }, { x: 0, y: 0 })).to.equal(Math.PI);
      expect(getParticleDirectionAngle(MoveDirection.outside, { x: 1, y: 0 }, { x: 0, y: 0 })).to.equal(0);
    });

    it("getParticleBaseVelocity returns a unit vector at the given angle", () => {
      const velocity = getParticleBaseVelocity(0);

      expect(velocity.length).to.equal(1);
      expect(velocity.angle).to.equal(0);
    });
  });

  describe("distance helpers", () => {
    it("getDistances returns the signed deltas and the hypotenuse", () => {
      expect(getDistances({ x: 0, y: 0 }, { x: 3, y: 4 })).to.eql({ dx: -3, dy: -4, distance: 5 });
    });

    it("getDistanceSq and getDistance are consistent", () => {
      expect(getDistanceSq({ x: 0, y: 0 }, { x: 3, y: 4 })).to.equal(25);
      expect(getDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).to.equal(5);
      expect(getDistance({ x: 1, y: 1 }, { x: 1, y: 1 })).to.equal(0);
    });

    it("checkDistance is inclusive of the boundary", () => {
      const a = { x: 0, y: 0 },
        b = { x: 3, y: 4 };

      expect(checkDistance(a, b, 5)).to.be.true;
      expect(checkDistance(a, b, 4.99)).to.be.false;
    });
  });

  describe("position helpers", () => {
    const size = { width: 800, height: 600 };

    it("calcPositionFromSize returns undefined when no position is given", () => {
      expect(calcPositionFromSize({ size, position: { x: 50, y: 50 } })).to.eql({ x: 400, y: 300 });
      expect(calcPositionFromSize({ size })).to.be.undefined;
    });

    it("calcPositionOrRandomFromSize uses the random source without a position", () => {
      setRandom(() => 0.5);
      expect(calcPositionOrRandomFromSize({ size })).to.eql({ x: 400, y: 300 });
      expect(calcPositionOrRandomFromSize({ size, position: { x: 25, y: 75 } })).to.eql({ x: 200, y: 450 });
    });

    it("calcPositionOrRandomFromSizeRanged samples ranged coordinates", () => {
      setRandom(() => 0.5);
      expect(calcPositionOrRandomFromSizeRanged({ size, position: { x: { min: 0, max: 100 }, y: 20 } })).to.eql({
        x: 400,
        y: 120,
      });
    });

    it("calcExactPositionOrRandomFromSize keeps exact coordinates or samples pixels", () => {
      setRandom(() => 0.5);
      expect(calcExactPositionOrRandomFromSize({ size, position: { x: 10, y: 20 } })).to.eql({ x: 10, y: 20 });
      expect(calcExactPositionOrRandomFromSize({ size })).to.eql({ x: 400, y: 300 });
    });
  });

  describe("parseAlpha", () => {
    it("returns the default alpha for empty input", () => {
      expect(parseAlpha()).to.equal(1);
      expect(parseAlpha("")).to.equal(1);
    });

    it("parses plain and percent alpha values", () => {
      expect(parseAlpha("0.5")).to.equal(0.5);
      expect(parseAlpha("50%")).to.equal(0.5);
      expect(parseAlpha("100%")).to.equal(1);
    });
  });

  describe("array and singleOrMultiple helpers", () => {
    it("isInArray checks identity and array membership", () => {
      expect(isInArray(2, [1, 2, 3])).to.be.true;
      expect(isInArray(4, [1, 2, 3])).to.be.false;
      expect(isInArray(5, 5)).to.be.true;
      expect(isInArray(5, 6)).to.be.false;
    });

    it("itemFromArray wraps positive indexes and samples when asked", () => {
      const array = [10, 20, 30];

      expect(itemFromArray(array, 0)).to.equal(10);
      expect(itemFromArray(array, 5)).to.equal(30);
      expect(itemFromArray(array, 3)).to.equal(10);

      setRandom(() => 0);
      expect(itemFromArray(array, 0, false)).to.equal(10);
    });

    it("itemFromSingleOrMultiple returns the single value or picks from the array", () => {
      expect(itemFromSingleOrMultiple(7)).to.equal(7);
      expect(itemFromSingleOrMultiple([7, 8], 1)).to.equal(8);
    });

    it("executeOnSingleOrMultiple maps arrays and wraps single values", () => {
      expect(executeOnSingleOrMultiple([1, 2], value => value * 2)).to.eql([2, 4]);
      expect(executeOnSingleOrMultiple(3, value => value + 1)).to.equal(4);
    });
  });

  describe("color helpers", () => {
    const red: IRgb = { r: 255, g: 0, b: 0 },
      black: IRgb = { r: 0, g: 0, b: 0 };

    it("colorMix blends two rgb colors by weight", () => {
      expect(colorMix(red, black, 1, 1)).to.eql({ r: 127, g: 0, b: 0 });
      expect(colorMix(red, black, 1, 0)).to.eql({ r: 255, g: 0, b: 0 });
      expect(colorMix(black, red, 0, 1)).to.eql({ r: 255, g: 0, b: 0 });
    });

    it("colorMix accepts hsl inputs", () => {
      const green: IHsl = { h: 120, s: 100, l: 50 };

      expect(colorMix(green, black, 1, 0)).to.eql({ r: 0, g: 255, b: 0 });
    });

    it("rgbToHsl and hslToRgb are inverse for pure hues", () => {
      expect(rgbToHsl(red)).to.eql({ h: 0, s: 100, l: 50 });
      expect(rgbToHsl({ r: 0, g: 255, b: 0 })).to.eql({ h: 120, s: 100, l: 50 });
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).to.eql({ r: 0, g: 255, b: 0 });
      expect(hslToRgbFloat({ h: 240, s: 100, l: 50 })).to.eql({ r: 0, g: 0, b: 255 });
    });

    it("rgbToHsl handles grayscale", () => {
      expect(rgbToHsl(black)).to.eql({ h: 0, s: 0, l: 0 });
      expect(rgbToHsl({ r: 255, g: 255, b: 255 })).to.eql({ h: 0, s: 0, l: 100 });
    });

    it("hslaToRgba keeps the alpha channel", () => {
      expect(hslaToRgba({ h: 0, s: 100, l: 50, a: 0.25 })).to.eql({ r: 255, g: 0, b: 0, a: 0.25 });
    });

    it("alterHsl shifts lightness and keeps hue and saturation", () => {
      const base: IHsl = { h: 200, s: 50, l: 40 };

      expect(alterHsl(base, AlterType.enlighten, 10)).to.eql({ h: 200, s: 50, l: 50 });
      expect(alterHsl(base, AlterType.darken, 10)).to.eql({ h: 200, s: 50, l: 30 });
    });
  });

  describe("deepExtend", () => {
    it("merges nested objects and preserves untouched keys", () => {
      const destination = { a: 1, nested: { x: 1, y: 2 } },
        result = deepExtend(destination, { nested: { y: 3, z: 4 } }) as typeof destination;

      expect(result).to.eql({ a: 1, nested: { x: 1, y: 3, z: 4 } });
    });

    it("replaces arrays with mapped copies", () => {
      const source = { list: [{ a: 1 }] },
        result = deepExtend({}, source) as typeof source,
        sourceItem = source.list[0];

      expect(result.list).to.eql([{ a: 1 }]);
      expect(result.list[0]).to.not.equal(sourceItem);
    });

    it("ignores nullish sources and lets primitives replace the destination", () => {
      expect(deepExtend({ a: 1 }, null, undefined)).to.eql({ a: 1 });
      expect(deepExtend({ a: 1 }, 5)).to.equal(5);
    });

    it("drops dangerous prototype keys", () => {
      const source = JSON.parse('{"__proto__": {"polluted": true}, "safe": 1}') as Record<string, unknown>,
        result = deepExtend({}, source) as Record<string, unknown>;

      expect(result.safe).to.equal(1);
      expect(({} as Record<string, unknown>).polluted).to.be.undefined;
    });
  });
});
