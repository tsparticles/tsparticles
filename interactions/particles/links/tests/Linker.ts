import { describe, it } from "mocha";
import { expect } from "chai";
import { getLinkDistance } from "../src/Linker";
import { canvasSize, distance, offsets, tests } from "./Fixture/defaultValues";
import { checkIntermediatePointsFailTests, checkIntermediatePointsTests } from "./Fixture/utils";

describe(`Linker (Canvas: ${canvasSize.width}x${canvasSize.height}, Distance: ${distance})`, () => {
    for (const test of tests) {
        describe(`Point (${test.begin.x}, ${test.begin.y}) (${test.warp ? "warp" : "no-warp"})`, () => {
            for (const end of test.tests) {
                it(`should link Point (${end.coordinates.x}, ${end.coordinates.y})`, () => {
                    if (end.fail) {
                        checkIntermediatePointsFailTests(
                            test.begin,
                            end.coordinates,
                            distance,
                            test.warp,
                            canvasSize,
                            offsets
                        );
                    } else {
                        const linkDistance = getLinkDistance(
                            test.begin,
                            end.coordinates,
                            distance,
                            canvasSize,
                            test.warp,
                            offsets
                        );

                        console.log("linkDistance", linkDistance);

                        expect(linkDistance).to.be.greaterThanOrEqual(0).and.lessThan(distance);

                        checkIntermediatePointsTests(
                            test.begin,
                            end.coordinates,
                            end.midPoints,
                            distance,
                            test.warp,
                            canvasSize,
                            offsets
                        );
                    }
                });
            }
        });
    }
});
