import { ICoordinates, IDimension } from "tsparticles-engine";
import { describe, it } from "mocha";
import { expect } from "chai";
import { getIntermediatePoints } from "../src/Utils";

function checkIntermediatePointsTests(begin: ICoordinates, end: ICoordinates, canvasSize: IDimension): void {
    const intermediatePoints = getIntermediatePoints(begin, end, canvasSize, 100);

    console.log(intermediatePoints);

    expect(intermediatePoints).to.be.not.empty;

    for (const point of intermediatePoints) {
        expect(point.begin.x).to.be.within(0, canvasSize.width);
        expect(point.begin.y).to.be.within(0, canvasSize.height);
        expect(point.end.x).to.be.within(0, canvasSize.width);
        expect(point.end.y).to.be.within(0, canvasSize.height);
    }
}

describe("Warp Linker (Canvas: 100x100)", () => {
    const canvasSize = { width: 100, height: 100 };

    describe("Point (2,2)", () => {
        const begin = { x: 2, y: 2 };

        it("should link to Point (98,98)", () => {
            const end = { x: 98, y: 98 };

            checkIntermediatePointsTests(begin, end, canvasSize);
        });

        it("should link to Point (2,98)", () => {
            const end = { x: 2, y: 98 };

            checkIntermediatePointsTests(begin, end, canvasSize);
        });

        it("should link to Point (98,2)", () => {
            const end = { x: 98, y: 2 };

            checkIntermediatePointsTests(begin, end, canvasSize);
        });
    });
});
