/* eslint-disable @typescript-eslint/no-magic-numbers,no-console,@typescript-eslint/no-unused-expressions */
import {
  MoveDirection,
  OutModeDirection,
  Vector,
  areBoundsInside,
  arrayRandomIndex,
  calculateBounds,
  clamp,
  getDistance,
  getParticleBaseVelocity,
  getRandom,
  isInArray,
  isPointInside,
  itemFromArray,
  mix,
  randomInRangeValue,
  setRangeValue,
  tsParticles,
} from "@tsparticles/engine";
import { buildParticleWithDirection, segmentBounce } from "../Fixture/Utils.js";
import { describe, expect, it } from "vitest";

describe("Utils", () => {
  describe("clamp", () => {
    const min = 1,
      max = 10;

    it("should return minimum when number is less than minimum", () => {
      const num = -5,
        clampedNumber = clamp(num, min, max);

      expect(clampedNumber).to.equal(min);
    });

    it("should return minimum when number equals minimum", () => {
      const clampedNumber = clamp(min, min, max);

      expect(clampedNumber).to.equal(min);
    });

    it("should return number when number is between minimum and maximum", () => {
      const num = 5,
        clampedNumber = clamp(num, min, max);

      expect(clampedNumber).to.equal(num);
    });

    it("should return maximum when number equals maximum", () => {
      const clampedNumber = clamp(max, min, max);

      expect(clampedNumber).to.equal(max);
    });

    it("should return maximum when number is greater than maximum", () => {
      const num = 15,
        clampedNumber = clamp(num, min, max);

      expect(clampedNumber).to.equal(max);
    });
  });

  describe("isInArray", () => {
    const numericArray: number[] = [1, 2, 3, Math.PI, Math.E],
      stringArray: string[] = ["lorem", "ipsum", "dolor"];

    // Numeric

    it("should return true when value is number contained in numeric array", () => {
      const value = numericArray[4];
      expect(isInArray(value, numericArray)).to.be.true;
    });

    it("should return false when value is number not contained in numeric array", () => {
      const value = Math.SQRT2;
      expect(isInArray(value, numericArray)).to.be.false;
    });

    it("should return true when array is non-array number matching value", () => {
      expect(isInArray(Math.LN2, Math.LN2)).to.be.true;
    });

    it("should return false when array is non-array number not matching value", () => {
      expect(isInArray(Math.LN2, Math.LN10)).to.be.false;
    });

    // String

    it("should return true when value is string contained in numeric array", () => {
      const value = stringArray[0];
      expect(isInArray(value, stringArray)).to.be.true;
    });

    it("should return false when value is string not contained in numeric array", () => {
      const value = "sit";
      expect(isInArray(value, stringArray)).to.be.false;
    });

    it("should return true when array is non-array string matching value", () => {
      expect(isInArray(stringArray[0], stringArray[0])).to.be.true;
    });

    it("should return false when array is non-array string not matching value", () => {
      expect(isInArray(stringArray[0], stringArray[1])).to.be.false;
    });
  });

  describe("mix", () => {
    const comp1 = 5,
      comp2 = 10,
      size = 10;

    it("should return the average when weights are identical", () => {
      const weight1 = Math.floor(getRandom() * (size - 1) + 1),
        weight2 = weight1,
        mean = Math.floor((comp1 + comp2) / 2);

      expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(mean);
    });

    it("should return comp1 when weight2 is 0 (and weight1 > 0)", () => {
      const weight1 = Math.floor(getRandom() * (size - 1) + 1),
        weight2 = 0;

      expect(mix(comp1, comp2, weight1, weight2), `weight 1: ${weight1.toString()}`).to.be.equal(Math.floor(comp1));
    });

    it("should return comp2 when weight1 is 0 (and weight2 > 0)", () => {
      const weight1 = 0,
        weight2 = Math.floor(getRandom() * (size - 1) + 1);

      expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(Math.floor(comp2));
    });

    it("should return the expected weighted-average when weights differ", () => {
      const comp1 = 6,
        comp2 = 9,
        weight1 = 2,
        weight2 = 1;

      expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(7);
    });

    it("should handle negative components", () => {
      const comp1 = -6,
        comp2 = -9,
        weight1 = 2,
        weight2 = 1;

      expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(-7);
    });
  });

  describe("arrayRandomIndex", () => {
    it("should always return an index that is not out of the bounds of the array", () => {
      const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        randomIndex = arrayRandomIndex(array);

      expect(randomIndex % 1).to.equal(0); // Make sure it is an integer
      expect(randomIndex).to.be.at.least(0);
      expect(randomIndex).to.be.at.most(9);
      expect(randomIndex).to.equal(array[randomIndex]); // Additional check that index is in bounds
    });
  });

  describe("itemFromArray", () => {
    const numericArray = [1, 2, 3, Math.PI, Math.E],
      stringArray = ["lorem", "ipsum", "dolor"],
      objectArray = [{ x: 1 }, { y: 2 }, { z: 3 }];

    it("should always return a random item from a numeric array", () => {
      const randomItem = itemFromArray(numericArray);

      expect(numericArray, "itemFromArray returned us an item not in the original array").to.include(randomItem);
    });

    it("should return the requested numeric item when specifying index", () => {
      const index = 3;
      expect(itemFromArray(numericArray, index)).to.equal(numericArray[index]);
    });

    it("should always return a random item from a string array", () => {
      const randomItem = itemFromArray(stringArray);

      expect(stringArray, "itemFromArray returned us an item not in the original array").to.include(randomItem);
    });

    it("should return the requested string item when specifying index", () => {
      const index = 1;
      expect(itemFromArray(stringArray, index)).to.equal(stringArray[index]);
    });

    it("should always return a random object from an array of objects", () => {
      const randomObject = itemFromArray(objectArray);

      expect(objectArray, "itemFromArray returned us an item not in the original array").to.include(randomObject);
    });

    it("should return the requested object when specifying index", () => {
      const index = 1;
      expect(itemFromArray(objectArray, index)).to.eql(objectArray[index]);
    });
  });

  describe("randomInRange", () => {
    it("should generate a random number in the specified range, range in positive reals", () => {
      const min = 1,
        max = 10,
        randomNumber = randomInRangeValue(setRangeValue(min, max));

      expect(randomNumber).to.be.within(min, max);
    });

    it("should generate a random number in the specified range, range in negative reals", () => {
      const min = -10,
        max = -1,
        randomNumber = randomInRangeValue(setRangeValue(min, max));

      expect(randomNumber).to.be.within(min, max);
    });

    it("should generate a random number in the specified range, range crossing negative and positive reals", () => {
      const min = -10,
        max = 10,
        randomNumber = randomInRangeValue(setRangeValue(min, max));

      expect(randomNumber).to.be.within(min, max);
    });

    it("should set min as 0 when max equals to min", () => {
      const min = 10,
        max = 10,
        randomNumber = randomInRangeValue(setRangeValue(min, max));

      expect(randomNumber).to.be.within(0, max);
    });
  });

  describe("getDistanceBetweenCoordinates", () => {
    const point = { x: 1, y: 1 },
      precision = 1e-10;

    it("should return 0 whenever points are identical", () => {
      expect(getDistance(point, point)).to.be.closeTo(0, precision);
    });

    it("should calculate correct distance when both points are in first quadrant", () => {
      const pointA = point,
        pointB = { x: 2, y: 2 };

      expect(getDistance(pointA, pointB)).to.be.closeTo(Math.SQRT2, precision);
    });

    it("should calculate correct distance when one point is in first quadrant and one is in second quadrant", () => {
      const pointA = point,
        pointB = { x: -1, y: 1 };

      expect(getDistance(pointA, pointB)).to.be.closeTo(2, precision);
    });

    it("should calculate correct distance when one point is in first quadrant and one is in third quadrant", () => {
      const pointA = point,
        pointB = { x: -1, y: -1 };

      expect(getDistance(pointA, pointB)).to.be.closeTo(2 * Math.SQRT2, precision);
    });

    it("should return the same distance regardless of the order of the points", () => {
      const pointA = point,
        pointB = { x: -1, y: -1 };

      expect(getDistance(pointA, pointB)).to.equal(getDistance(pointB, pointA));
    });
  });

  describe("calculateBounds", () => {
    it("should return the correct bounds", () => {
      const point = { x: 0, y: 0 },
        radius = 1,
        calculatedBounds = calculateBounds(point, radius),
        expectedBounds = {
          bottom: radius, // On a display, going down the screen is actually increasing in y
          left: -radius,
          right: radius,
          top: -radius, // On a display, going up the screen is actually decreasing in y
        };

      expect(calculatedBounds).to.eql(expectedBounds);
    });
  });

  describe("areBoundsInside", () => {
    const dimension = { width: 1920, height: 1080 };

    it("should return true when the bounds match the screen", () => {
      const bounds = {
        bottom: dimension.height,
        top: 0,
        left: 0,
        right: dimension.width,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the bounds are completely inside the screen", () => {
      const bounds = {
        bottom: 200,
        top: 100,
        left: 100,
        right: 200,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the bounds overlap top of the screen", () => {
      const bounds = {
        bottom: 1,
        top: -1,
        left: 100,
        right: 101,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the bounds overlap bottom of the screen", () => {
      const bounds = {
        bottom: dimension.height + 1,
        top: dimension.height - 1,
        left: 100,
        right: 101,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the bounds overlap the left of the screen", () => {
      const bounds = {
        bottom: 101,
        top: 100,
        left: -1,
        right: 1,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the bounds overlap the right of the screen", () => {
      const bounds = {
        bottom: 101,
        top: 100,
        left: dimension.width - 1,
        right: dimension.width + 1,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.true;
    });

    it("should return false when the bounds do not intersect the screen and are above", () => {
      const bounds = {
        bottom: -1,
        top: -2,
        left: 100,
        right: 101,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.false;
    });

    it("should return false when the bounds do not intersect the screen and are below", () => {
      const bounds = {
        bottom: dimension.height + 2,
        top: dimension.height + 1,
        left: 100,
        right: 101,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.false;
    });

    it("should return false when the bounds do not intersect the screen and are to the left", () => {
      const bounds = {
        bottom: 101,
        top: 100,
        left: -2,
        right: -1,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.false;
    });

    it("should return false when the bounds do not intersect the screen and are to the right", () => {
      const bounds = {
        bottom: 101,
        top: 100,
        left: dimension.width + 1,
        right: dimension.width + 2,
      };

      expect(areBoundsInside(bounds, dimension, Vector.origin)).to.be.false;
    });

    it("should return true when direction is top and the bounds do not intersect the screen and are below", () => {
      const bounds = {
          bottom: dimension.height + 2,
          top: dimension.height + 1,
          left: 100,
          right: 101,
        },
        direction = OutModeDirection.top;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.true;
    });

    it("should return false when direction is top and the bounds do not intersect the screen and are above", () => {
      const bounds = {
          bottom: -1,
          top: -2,
          left: 100,
          right: 101,
        },
        direction = OutModeDirection.top;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.false;
    });

    it("should return true when direction is bottom and the bounds do not intersect the screen and are above", () => {
      const bounds = {
          bottom: -1,
          top: -2,
          left: 100,
          right: 101,
        },
        direction = OutModeDirection.bottom;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.true;
    });

    it("should return false when direction is bottom and the bounds do not intersect the screen and are below", () => {
      const bounds = {
          bottom: dimension.height + 2,
          top: dimension.height + 1,
          left: 100,
          right: 101,
        },
        direction = OutModeDirection.bottom;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.false;
    });

    it("should return true when direction is left and the bounds do not intersect the screen and are to the right", () => {
      const bounds = {
          bottom: 101,
          top: 100,
          left: dimension.width + 1,
          right: dimension.width + 2,
        },
        direction = OutModeDirection.left;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.true;
    });

    it("should return false when direction is left and the bounds do not intersect the screen and are to the left", () => {
      const bounds = {
          bottom: 101,
          top: 100,
          left: -2,
          right: -1,
        },
        direction = OutModeDirection.left;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.false;
    });

    it("should return true when direction is right and the bounds do not intersect the screen and are to the left", () => {
      const bounds = {
          bottom: 101,
          top: 100,
          left: -2,
          right: -1,
        },
        direction = OutModeDirection.right;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.true;
    });

    it("should return false when direction is right and the bounds do not intersect the screen and are to the right", () => {
      const bounds = {
          bottom: 101,
          top: 100,
          left: dimension.width + 1,
          right: dimension.width + 2,
        },
        direction = OutModeDirection.right;

      expect(areBoundsInside(bounds, dimension, Vector.origin, direction)).to.be.false;
    });
  });

  describe("isPointInside", () => {
    const dimension = { width: 1920, height: 1080 },
      centerPoint = { x: dimension.width / 2, y: dimension.height / 2 },
      topPoint = { x: dimension.width / 2, y: 0 },
      bottomPoint = { x: dimension.width / 2, y: dimension.height },
      leftPoint = { x: 0, y: dimension.height / 2 },
      rightPoint = { x: dimension.width, y: dimension.height / 2 };

    it("should return true when the point lies inside the screen, no radius", () => {
      expect(isPointInside(centerPoint, dimension, Vector.origin)).to.be.true;
    });

    it("should return true when the point lies inside the screen, radius inside dimensions", () => {
      expect(isPointInside(centerPoint, dimension, Vector.origin, 100)).to.be.true;
    });

    it("should return true when the point overlaps top and bottom but not left and right", () => {
      expect(isPointInside(centerPoint, dimension, Vector.origin, 1000)).to.be.true;
    });

    it("should return true when the point overlaps all sides of the screen", () => {
      expect(isPointInside(centerPoint, dimension, Vector.origin, 10000)).to.be.true;
    });

    it("should return false when point lies on top boundary of screen with no radius", () => {
      expect(isPointInside(topPoint, dimension, Vector.origin)).to.be.false;
    });

    it("should return true when point lies on top boundary of screen with non-zero radius", () => {
      expect(isPointInside(topPoint, dimension, Vector.origin, getRandom())).to.be.true;
    });

    it("should return false when point lies on bottom boundary of screen with no radius", () => {
      expect(isPointInside(bottomPoint, dimension, Vector.origin)).to.be.false;
    });

    it("should return true when point lies on bottom boundary of screen with non-zero radius", () => {
      expect(isPointInside(bottomPoint, dimension, Vector.origin, getRandom())).to.be.true;
    });

    it("should return false when point lies on left boundary of screen with no radius", () => {
      expect(isPointInside(leftPoint, dimension, Vector.origin)).to.be.false;
    });

    it("should return true when point lies on left boundary of screen with non-zero radius", () => {
      expect(isPointInside(leftPoint, dimension, Vector.origin, getRandom())).to.be.true;
    });

    it("should return false when point lies on right boundary of screen with no radius", () => {
      expect(isPointInside(rightPoint, dimension, Vector.origin)).to.be.false;
    });

    it("should return true when point lies on right boundary of screen with non-zero radius", () => {
      expect(isPointInside(rightPoint, dimension, Vector.origin, getRandom())).to.be.true;
    });
  });

  describe("getParticleBaseVelocity", async () => {
    const container = await tsParticles.load({
      id: "test",
    });

    if (!container) {
      throw new Error("Container not found");
    }

    it("should return the proper base velocity, when it's moving top", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.top);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(-Math.PI / 2);
    });

    it("should return the proper base velocity, when it's moving top-right", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.topRight);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(-Math.PI / 4);
    });

    it("should return the proper base velocity, when it's moving right", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.right);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(0);
    });

    it("should return the proper base velocity, when it's moving bottom-right", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.bottomRight);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(Math.PI / 4);
    });

    it("should return the proper base velocity, when it's moving bottom", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.bottom);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(Math.PI / 2);
    });

    it("should return the proper base velocity, when it's moving bottom-left", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.bottomLeft);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql((3 * Math.PI) / 4);
    });

    it("should return the proper base velocity, when it's moving left", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.left);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql(Math.PI);
    });

    it("should return the proper base velocity, when it's moving top-left", () => {
      const particle = buildParticleWithDirection(container, MoveDirection.topLeft);

      if (!particle) {
        throw new Error("Particle not found");
      }

      expect(getParticleBaseVelocity(particle.direction).angle).to.eql((-3 * Math.PI) / 4);
    });
  });

  describe("segmentBounce", () => {
    const start = {
        x: 29, // Math.floor(getRandom() * 100),
        y: 82, // Math.floor(getRandom() * 100)
      },
      stop = {
        x: 53, // Math.floor(getRandom() * 100),
        y: 82, // Math.floor(getRandom() * 100)
      },
      velocity = Vector.origin; // angle = 238.91568442036498 * Math.PI / 180;//getRandom() * Math.PI * 2;

    velocity.length = 1;
    velocity.angle = (238.91568442036498 * Math.PI) / 180;

    console.log("segment", start, stop);
    console.log("s. angle", ((Math.atan2(start.y - stop.y, start.x - stop.x) * 180) / Math.PI) % 360);
    console.log("p. speed", velocity.length);
    console.log("p. angle", ((velocity.angle * 180) / Math.PI) % 360);

    segmentBounce(start, stop, velocity);

    console.log("res. speed", velocity.length);
    console.log("res. angle", ((velocity.angle * 180) / Math.PI) % 360);

    it("should bounce the particle off the segment", () => {
      expect(velocity.length).to.be.not.undefined.and.not.null;
    });
  });
});
