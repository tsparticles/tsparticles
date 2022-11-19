import { ICoordinates, IDimension } from "tsparticles-engine";
import { describe, it } from "mocha";
import { expect } from "chai";
import { getLinkPoints } from "../src/Utils";

function checkIntermediatePointsTests(
    begin: ICoordinates,
    end: ICoordinates,
    midPoints: ICoordinates[],
    distance: number,
    warp: boolean,
    canvasSize: IDimension
): void {
    const linkPoints = getLinkPoints(begin, end, distance, warp, canvasSize);

    console.log(linkPoints);

    expect(linkPoints).to.be.not.empty;

    for (const point of linkPoints) {
        expect(point).to.be.not.empty;

        console.log(point);

        if (midPoints.length) {
            console.log(midPoints);

            expect(
                midPoints.find(
                    t => (t.x === point.begin.x && t.y === point.begin.y) || (t.x === point.end.x && t.y === point.end.y)
                )
            ).to.be.not.undefined;
        }

        expect(point.begin.x).to.be.within(0, canvasSize.width);
        expect(point.begin.y).to.be.within(0, canvasSize.height);
        expect(point.end.x).to.be.within(0, canvasSize.width);
        expect(point.end.y).to.be.within(0, canvasSize.height);
    }
}

function checkIntermediatePointsFailTests(
    begin: ICoordinates,
    end: ICoordinates,
    distance: number,
    warp: boolean,
    canvasSize: IDimension
): void {
    const linkPoints = getLinkPoints(begin, end, distance, warp, canvasSize);

    expect(linkPoints).to.be.empty;
}

const canvasSize = { width: 100, height: 100 },
    distance = 10;

type SingleLinkTest = {
    coordinates: ICoordinates;
    fail: boolean;
    midPoints: ICoordinates[];
};

type LinkTest = {
    begin: ICoordinates;
    tests: SingleLinkTest[];
    warp: boolean;
};

const tests: LinkTest[] = [
    {
        begin: { x: 2, y: 2 },
        tests: [
            {
                coordinates: { x: 4, y: 4 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 15, y: 15 },
                fail: true,
                midPoints: [],
            },
        ],
        warp: false,
    },
    {
        begin: { x: 2, y: 2 },
        tests: [
            {
                coordinates: { x: 4, y: 4 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 15, y: 15 },
                fail: true,
                midPoints: [],
            },
            {
                coordinates: { x: 98, y: 2 },
                fail: false,
                midPoints: [
                    { x: 100, y: 2 },
                    { x: 0, y: 2 },
                ],
            },
            {
                coordinates: { x: 2, y: 98 },
                fail: false,
                midPoints: [
                    { x: 2, y: 100 },
                    { x: 2, y: 0 },
                ],
            },
            {
                coordinates: { x: 98, y: 98 },
                fail: false,
                midPoints: [
                    { x: 100, y: 100 },
                    { x: 0, y: 0 },
                ],
            },
        ],
        warp: true,
    },
    {
        begin: { x: 98, y: 2 },
        tests: [
            {
                coordinates: { x: 98, y: 4 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 15, y: 15 },
                fail: true,
                midPoints: [],
            },
            {
                coordinates: { x: 2, y: 2 },
                fail: false,
                midPoints: [
                    { x: 0, y: 2 },
                    { x: 100, y: 2 },
                ],
            },
            {
                coordinates: { x: 2, y: 98 },
                fail: false,
                midPoints: [
                    { x: 2, y: 100 },
                    { x: 2, y: 0 },
                ],
            },
            {
                coordinates: { x: 98, y: 98 },
                fail: false,
                midPoints: [
                    { x: 100, y: 100 },
                    { x: 0, y: 0 },
                ],
            },
        ],
        warp: true,
    },
    {
        begin: { x: 2, y: 98 },
        tests: [
            {
                coordinates: { x: 4, y: 98 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 15, y: 15 },
                fail: true,
                midPoints: [],
            },
            {
                coordinates: { x: 2, y: 2 },
                fail: false,
                midPoints: [
                    { x: 2, y: 0 },
                    { x: 2, y: 100 },
                ],
            },
            {
                coordinates: { x: 98, y: 2 },
                fail: false,
                midPoints: [
                    { x: 100, y: 2 },
                    { x: 0, y: 2 },
                ],
            },
            {
                coordinates: { x: 98, y: 98 },
                fail: false,
                midPoints: [
                    { x: 100, y: 100 },
                    { x: 0, y: 0 },
                ],
            },
        ],
        warp: true,
    },
    {
        begin: { x: 98, y: 98 },
        tests: [
            {
                coordinates: { x: 94, y: 94 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 15, y: 15 },
                fail: true,
                midPoints: [],
            },
            {
                coordinates: { x: 2, y: 2 },
                fail: false,
                midPoints: [
                    { x: 0, y: 0 },
                    { x: 100, y: 100 },
                ],
            },
            {
                coordinates: { x: 2, y: 98 },
                fail: false,
                midPoints: [
                    { x: 2, y: 100 },
                    { x: 2, y: 0 },
                ],
            },
            {
                coordinates: { x: 98, y: 2 },
                fail: false,
                midPoints: [
                    { x: 100, y: 2 },
                    { x: 0, y: 2 },
                ],
            },
        ],
        warp: true,
    },
];

describe(`Linker (Canvas: ${canvasSize.width}x${canvasSize.height}, Distance: ${distance})`, () => {
    for (const test of tests) {
        describe(`Point (${test.begin.x}, ${test.begin.y}) (${test.warp ? "warp" : "no-warp"})`, () => {
            for (const end of test.tests) {
                it(`should link Point (${end.coordinates.x}, ${end.coordinates.y})`, () => {
                    if (end.fail) {
                        checkIntermediatePointsFailTests(test.begin, end.coordinates, distance, test.warp, canvasSize);
                    } else {
                        checkIntermediatePointsTests(
                            test.begin,
                            end.coordinates,
                            end.midPoints,
                            distance,
                            test.warp,
                            canvasSize
                        );
                    }
                });
            }
        });
    }
});
