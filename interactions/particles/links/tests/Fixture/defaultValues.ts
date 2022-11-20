import { LinkTest } from "./types";
import { getOffsets } from "../../src/Utils";

export const canvasSize = { width: 100, height: 100 },
    distance = 10,
    offsets = getOffsets(canvasSize);

export const tests: LinkTest[] = [
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
                    { x: 100, y: 0 },
                    { x: 0, y: 100 },
                ],
            },
            {
                coordinates: { x: 98, y: 98 },
                fail: false,
                midPoints: [
                    { x: 98, y: 100 },
                    { x: 98, y: 0 },
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
                    { x: 0, y: 100 },
                    { x: 100, y: 0 },
                ],
            },
            {
                coordinates: { x: 98, y: 98 },
                fail: false,
                midPoints: [
                    { x: 100, y: 98 },
                    { x: 0, y: 98 },
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
                    { x: 100, y: 98 },
                    { x: 0, y: 98 },
                ],
            },
            {
                coordinates: { x: 98, y: 2 },
                fail: false,
                midPoints: [
                    { x: 98, y: 100 },
                    { x: 98, y: 0 },
                ],
            },
        ],
        warp: true,
    }/*,
    {
        begin: { x: 3, y: 1 },
        tests: [
            {
                coordinates: { x: 3, y: 3 },
                fail: false,
                midPoints: [],
            },
            {
                coordinates: { x: 99, y: 2 },
                fail: false,
                midPoints: [
                    { x: 100, y: 1.75 },
                    { x: 0, y: 26.75 }
                ],
            }
        ],
        warp: true,
    }*/
];
