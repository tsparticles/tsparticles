import { getDistance, ICoordinates, IDimension } from "tsparticles-engine";
import { getLinkPoints } from "../../src/Utils";
import { expect } from "chai";

export function checkIntermediatePointsTests(
    begin: ICoordinates,
    end: ICoordinates,
    midPoints: ICoordinates[],
    distance: number,
    warp: boolean,
    canvasSize: IDimension,
): void {
    const linkPoints = getLinkPoints(begin, end, distance, warp, canvasSize);

    console.log("begin", begin);
    console.log("end", end);
    console.log("midPoints", midPoints);
    console.log("linkPoints", linkPoints);

    expect(linkPoints).to.be.not.empty;

    for (const point of linkPoints) {
        expect(point).to.be.not.empty;

        if (midPoints.length) {
            const midDistance = getDistance(point.begin, point.end);

            expect(midDistance).to.be.greaterThanOrEqual(0).and.lessThan(distance);

            expect(
                midPoints.find(
                    t =>
                        (t.x === point.begin.x && t.y === point.begin.y) || (t.x === point.end.x && t.y === point.end.y)
                )
            ).to.be.not.undefined;
        }

        //expect(point.begin.x).to.be.within(0, canvasSize.width);
        //expect(point.begin.y).to.be.within(0, canvasSize.height);
        //expect(point.end.x).to.be.within(0, canvasSize.width);
        //expect(point.end.y).to.be.within(0, canvasSize.height);
    }
}

export function checkIntermediatePointsFailTests(
    begin: ICoordinates,
    end: ICoordinates,
    distance: number,
    warp: boolean,
    canvasSize: IDimension
): void {
    const linkPoints = getLinkPoints(begin, end, distance, warp, canvasSize);

    expect(linkPoints).to.be.empty;
}
