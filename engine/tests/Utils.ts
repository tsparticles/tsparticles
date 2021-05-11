import { describe, it } from "mocha";
import { expect } from "chai";
import { IContainerPlugin, IParticle, IPlugin, IRangeValue, Particle } from "../src";
import { Container } from "../src/Core/Container";
import { MoveDirection } from "../src/Enums";
import {
    areBoundsInside,
    arrayRandomIndex,
    calculateBounds,
    clamp,
    getDistance,
    getDistances,
    getParticleBaseVelocity,
    isInArray,
    isPointInside,
    itemFromArray,
    mix,
    Plugins,
    randomInRange,
    setRangeValue,
} from "../src/Utils";
import { ICoordinates } from "../src/Core/Interfaces/ICoordinates";
import { Vector } from "../src/Core/Particle/Vector";

function buildPluginWithId(id: string, needsPlugin: boolean): IPlugin {
    return {
        id,
        getPlugin() {
            return {} as IContainerPlugin;
        },
        needsPlugin() {
            return needsPlugin;
        },
        loadOptions() {
            return null;
        },
    };
}

function buildParticleWithDirection(direction: MoveDirection): IParticle {
    const container = new Container("someid");
    const options = { move: { direction } };
    return new Particle(1, container, undefined, options);
}

function segmentBounce(start: ICoordinates, stop: ICoordinates, velocity: Vector): void {
    const { dx, dy } = getDistances(start, stop);
    const wallAngle = Math.atan2(dy, dx) + Math.PI / 2;
    const wallNormalX = Math.sin(wallAngle);
    const wallNormalY = -Math.cos(wallAngle);

    const d = 2 * (velocity.x * wallNormalX + velocity.y * wallNormalY);

    velocity.x -= d * wallNormalX;
    velocity.y -= d * wallNormalY;
}

describe("Utils", () => {
    describe("clamp", () => {
        const min = 1;
        const max = 10;

        it("should return minimum when number is less than minimum", () => {
            const num = -5;
            const clampedNumber = clamp(num, min, max);

            expect(clampedNumber).to.equal(min);
        });

        it("should return minimum when number equals minimum", () => {
            const clampedNumber = clamp(min, min, max);

            expect(clampedNumber).to.equal(min);
        });

        it("should return number when number is between minimum and maximum", () => {
            const num = 5;
            const clampedNumber = clamp(num, min, max);

            expect(clampedNumber).to.equal(num);
        });

        it("should return maximum when number equals maximum", () => {
            const clampedNumber = clamp(max, min, max);

            expect(clampedNumber).to.equal(max);
        });

        it("should return maximum when number is greater than maximum", () => {
            const num = 15;
            const clampedNumber = clamp(num, min, max);

            expect(clampedNumber).to.equal(max);
        });
    });

    describe("isInArray", () => {
        const numericArray: number[] = [1, 2, 3, Math.PI, Math.E];
        const stringArray: string[] = ["lorem", "ipsum", "dolor"];

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
        const comp1 = 5;
        const comp2 = 10;
        const size = 10;

        it("should return the average when weights are identical", () => {
            const weight1 = Math.floor(Math.random() * (size - 1) + 1);
            const weight2 = weight1;
            const mean = Math.floor((comp1 + comp2) / 2);

            expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(mean);
        });

        it("should return comp1 when weight2 is 0 (and weight1 > 0)", () => {
            const weight1 = Math.floor(Math.random() * (size - 1) + 1);
            const weight2 = 0;

            expect(mix(comp1, comp2, weight1, weight2), `weight 1: ${weight1}`).to.be.equal(Math.floor(comp1));
        });

        it("should return comp2 when weight1 is 0 (and weight2 > 0)", () => {
            const weight1 = 0;
            const weight2 = Math.floor(Math.random() * (size - 1) + 1);

            expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(Math.floor(comp2));
        });

        it("should return the expected weighted-average when weights differ", () => {
            const comp1 = 6;
            const comp2 = 9;
            const weight1 = 2;
            const weight2 = 1;

            expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(7);
        });

        it("should handle negative components", () => {
            const comp1 = -6;
            const comp2 = -9;
            const weight1 = 2;
            const weight2 = 1;

            expect(mix(comp1, comp2, weight1, weight2)).to.be.equal(-7);
        });
    });

    describe("arrayRandomIndex", () => {
        it("should always return an index that is not out of the bounds of the array", () => {
            const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const randomIndex = arrayRandomIndex(array);

            expect(randomIndex % 1).to.equal(0); // Make sure it is an integer
            expect(randomIndex).to.be.at.least(0);
            expect(randomIndex).to.be.at.most(9);
            expect(randomIndex).to.equal(array[randomIndex]); // Additional check that index is in bounds
        });
    });

    describe("itemFromArray", () => {
        const numericArray = [1, 2, 3, Math.PI, Math.E];
        const stringArray = ["lorem", "ipsum", "dolor"];
        const objectArray = [{ x: 1 }, { y: 2 }, { z: 3 }];

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
            const range = setRangeValue(1, 10);
            const randomNumber = randomInRange(range);

            expect(randomNumber).to.be.within((range as IRangeValue).min, (range as IRangeValue).max);
        });

        it("should generate a random number in the specified range, range in negative reals", () => {
            const range = setRangeValue(-1, -10);
            const randomNumber = randomInRange(range);

            expect(randomNumber).to.be.within((range as IRangeValue).min, (range as IRangeValue).max);
        });

        it("should generate a random number in the specified range, range crossing negative and positive reals", () => {
            const range = setRangeValue(-10, 10);
            const randomNumber = randomInRange(range);

            expect(randomNumber).to.be.within((range as IRangeValue).min, (range as IRangeValue).max);
        });
    });

    describe("getDistanceBetweenCoordinates", () => {
        const point = { x: 1, y: 1 };
        const precision = 1e-10;

        it("should return 0 whenever points are identical", () => {
            expect(getDistance(point, point)).to.be.closeTo(0, precision);
        });

        it("should calculate correct distance when both points are in first quadrant", () => {
            const pointA = point;
            const pointB = { x: 2, y: 2 };

            expect(getDistance(pointA, pointB)).to.be.closeTo(Math.SQRT2, precision);
        });

        it("should calculate correct distance when one point is in first quadrant and one is in second quadrant", () => {
            const pointA = point;
            const pointB = { x: -1, y: 1 };

            expect(getDistance(pointA, pointB)).to.be.closeTo(2, precision);
        });

        it("should calculate correct distance when one point is in first quadrant and one is in third quadrant", () => {
            const pointA = point;
            const pointB = { x: -1, y: -1 };

            expect(getDistance(pointA, pointB)).to.be.closeTo(2 * Math.SQRT2, precision);
        });

        it("should return the same distance regardless of the order of the points", () => {
            const pointA = point;
            const pointB = { x: -1, y: -1 };

            expect(getDistance(pointA, pointB)).to.equal(getDistance(pointB, pointA));
        });
    });

    describe("calculateBounds", () => {
        it("should return the correct bounds", () => {
            const point = { x: 0, y: 0 };
            const radius = 1;
            const calculatedBounds = calculateBounds(point, radius);
            const expectedBounds = {
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

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return true when the bounds are completely inside the screen", () => {
            const bounds = {
                bottom: 200,
                top: 100,
                left: 100,
                right: 200,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return true when the bounds overlap top of the screen", () => {
            const bounds = {
                bottom: 1,
                top: -1,
                left: 100,
                right: 101,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return true when the bounds overlap bottom of the screen", () => {
            const bounds = {
                bottom: dimension.height + 1,
                top: dimension.height - 1,
                left: 100,
                right: 101,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return true when the bounds overlap the left of the screen", () => {
            const bounds = {
                bottom: 101,
                top: 100,
                left: -1,
                right: 1,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return true when the bounds overlap the right of the screen", () => {
            const bounds = {
                bottom: 101,
                top: 100,
                left: dimension.width - 1,
                right: dimension.width + 1,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.true;
        });

        it("should return false when the bounds do not intersect the screen and are above", () => {
            const bounds = {
                bottom: -1,
                top: -2,
                left: 100,
                right: 101,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.false;
        });

        it("should return false when the bounds do not intersect the screen and are below", () => {
            const bounds = {
                bottom: dimension.height + 2,
                top: dimension.height + 1,
                left: 100,
                right: 101,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.false;
        });

        it("should return false when the bounds do not intersect the screen and are to the left", () => {
            const bounds = {
                bottom: 101,
                top: 100,
                left: -2,
                right: -1,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.false;
        });

        it("should return false when the bounds do not intersect the screen and are to the right", () => {
            const bounds = {
                bottom: 101,
                top: 100,
                left: dimension.width + 1,
                right: dimension.width + 2,
            };

            expect(areBoundsInside(bounds, dimension)).to.be.false;
        });
    });

    describe("isPointInside", () => {
        const dimension = { width: 1920, height: 1080 };
        const centerPoint = { x: dimension.width / 2, y: dimension.height / 2 };
        const topPoint = { x: dimension.width / 2, y: 0 };
        const bottomPoint = { x: dimension.width / 2, y: dimension.height };
        const leftPoint = { x: 0, y: dimension.height / 2 };
        const rightPoint = { x: dimension.width, y: dimension.height / 2 };

        it("should return true when the point lies inside the screen, no radius", () => {
            expect(isPointInside(centerPoint, dimension)).to.be.true;
        });

        it("should return true when the point lies inside the screen, radius inside dimensions", () => {
            expect(isPointInside(centerPoint, dimension, 100)).to.be.true;
        });

        it("should return true when the point overlaps top and bottom but not left and right", () => {
            expect(isPointInside(centerPoint, dimension, 1000)).to.be.true;
        });

        it("should return true when the point overlaps all sides of the screen", () => {
            expect(isPointInside(centerPoint, dimension, 10000)).to.be.true;
        });

        it("should return false when point lies on top boundry of screen with no radius", () => {
            expect(isPointInside(topPoint, dimension)).to.be.false;
        });

        it("should return true when point lies on top boundry of screen with non-zero radius", () => {
            expect(isPointInside(topPoint, dimension, Math.random())).to.be.true;
        });

        it("should return false when point lies on bottom boundry of screen with no radius", () => {
            expect(isPointInside(bottomPoint, dimension)).to.be.false;
        });

        it("should return true when point lies on bottom boundry of screen with non-zero radius", () => {
            expect(isPointInside(bottomPoint, dimension, Math.random())).to.be.true;
        });

        it("should return false when point lies on left boundry of screen with no radius", () => {
            expect(isPointInside(leftPoint, dimension)).to.be.false;
        });

        it("should return true when point lies on left boundry of screen with non-zero radius", () => {
            expect(isPointInside(leftPoint, dimension, Math.random())).to.be.true;
        });

        it("should return false when point lies on right boundry of screen with no radius", () => {
            expect(isPointInside(rightPoint, dimension)).to.be.false;
        });

        it("should return true when point lies on right boundry of screen with non-zero radius", () => {
            expect(isPointInside(rightPoint, dimension, Math.random())).to.be.true;
        });
    });

    describe("getParticleBaseVelocity", () => {
        it("should return the proper base velocity, when it's moving top", () => {
            expect(getParticleBaseVelocity(MoveDirection.top).angle).to.equal(-Math.PI / 2);
        });
        it("should return the proper base velocity, when it's moving top-right", () => {
            expect(getParticleBaseVelocity(MoveDirection.topRight).angle).to.equal(-Math.PI / 4);
        });
        it("should return the proper base velocity, when it's moving right", () => {
            expect(getParticleBaseVelocity(MoveDirection.right).angle).to.equal(0);
        });
        it("should return the proper base velocity, when it's moving bottom-right", () => {
            expect(getParticleBaseVelocity(MoveDirection.bottomRight).angle).to.equal(Math.PI / 4);
        });
        it("should return the proper base velocity, when it's moving bottom", () => {
            expect(getParticleBaseVelocity(MoveDirection.bottom).angle).to.equal(Math.PI / 2);
        });
        it("should return the proper base velocity, when it's moving bottom-left", () => {
            expect(getParticleBaseVelocity(MoveDirection.bottomLeft).angle).to.equal((3 * Math.PI) / 4);
        });
        it("should return the proper base velocity, when it's moving left", () => {
            expect(getParticleBaseVelocity(MoveDirection.left).angle).to.equal(Math.PI);
        });
        it("should return the proper base velocity, when it's moving top-left", () => {
            expect(getParticleBaseVelocity(MoveDirection.topLeft).angle).to.equal((-3 * Math.PI) / 4);
        });
    });

    describe("Plugins", () => {
        const plugin1 = buildPluginWithId("some plugin", true);
        const plugin2 = buildPluginWithId("some other plugin", false);

        describe("getAvailablePlugins", () => {
            Plugins.addPlugin(plugin1);
            Plugins.addPlugin(plugin2);
            const plugins = Plugins.getAvailablePlugins(new Container("some container id"));

            it("should return a Map of available plugins", () => {
                expect(plugins.get("some plugin")).to.not.be.undefined;
            });

            it("should ignore unneeded plugins", () => {
                expect(plugins.get("some other plugin")).to.be.undefined;
            });
        });
    });

    describe("segmentBounce", () => {
        const start = {
                x: 29, //Math.floor(Math.random() * 100),
                y: 82, //Math.floor(Math.random() * 100)
            },
            stop = {
                x: 53, //Math.floor(Math.random() * 100),
                y: 82, //Math.floor(Math.random() * 100)
            },
            velocity = Vector.origin; // angle = 238.91568442036498 * Math.PI / 180;//Math.random() * Math.PI * 2;

        velocity.length = 1;
        velocity.angle = (238.91568442036498 * Math.PI) / 180;

        console.log("segment", start, stop);
        console.log("s. angle", ((Math.atan2(start.y - stop.y, start.x - stop.x) * 180) / Math.PI) % 360);
        console.log("p. speed", velocity.length);
        console.log("p. angle", ((velocity.angle * 180) / Math.PI) % 360);

        segmentBounce(start, stop, velocity);

        console.log("res. speed", velocity.length);
        console.log("res. angle", ((velocity.angle * 180) / Math.PI) % 360);
    });
});
