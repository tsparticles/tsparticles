import { canvasSize, distance, tests } from "./Fixture/defaultValues";
import { describe, it } from "mocha";
import { expect } from "chai";
import { CircleWarp } from "../src/CircleWarp";

describe(`CircleWarp Tests (Canvas: ${canvasSize.width}x${canvasSize.height}, Distance: ${distance})`, () => {
    for (const test of tests) {
        describe(`Center (${test.begin.x}, ${test.begin.y}) (${test.warp ? "warp" : "no-warp"})`, () => {
            const circle = new CircleWarp(test.begin.x, test.begin.y, distance, canvasSize);

            for (const end of test.tests) {
                it(`should contain Point (${end.coordinates.x}, ${end.coordinates.y})`, () => {
                    const res = circle.contains(end.coordinates);

                    expect(res).to.be.equal(!end.fail);
                });
            }
        });
    }
});
