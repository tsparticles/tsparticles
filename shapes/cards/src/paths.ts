import { type IPathData, SegmentType } from "@tsparticles/path-utils";
import { empty, half, quarter, threeQuarter } from "@tsparticles/engine";
import type { ICardSuitsPath } from "./ICardSuitsPath.js";
import { SuitType } from "./SuitType.js";

const eighth = quarter * half,
  n = half,
  halfN = n * half,
  oppositeN = -n,
  oppositeHalfN = -halfN,
  eighthN = n * eighth,
  threeQuarterN = n * threeQuarter;

export const club: IPathData = {
  half: true,
  segments: [
    {
      type: SegmentType.bezier,
      values: [
        { x: empty, y: oppositeN },
        { x: empty, y: oppositeN },
        { x: halfN, y: oppositeN },
        { x: halfN, y: oppositeHalfN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: oppositeHalfN },
        { x: halfN, y: oppositeHalfN },
        { x: n, y: oppositeHalfN },
        { x: n, y: empty },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: n, y: empty },
        { x: n, y: empty },
        { x: n, y: halfN },
        { x: halfN, y: halfN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: halfN },
        { x: halfN, y: halfN },
        { x: eighthN, y: halfN },
        { x: eighthN, y: eighthN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: eighthN, y: eighthN },
        { x: eighthN, y: halfN },
        { x: halfN, y: n },
        { x: halfN, y: n },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: n },
        { x: halfN, y: n },
        { x: empty, y: n },
        { x: empty, y: n },
      ],
    },
  ],
};

export const diamond: IPathData = {
  half: true,
  segments: [
    {
      type: SegmentType.bezier,
      values: [
        { x: empty, y: n },
        { x: empty, y: n },
        { x: threeQuarterN, y: empty },
        { x: threeQuarterN, y: empty },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: threeQuarterN, y: empty },
        { x: threeQuarterN, y: empty },
        { x: empty, y: oppositeN },
        { x: empty, y: oppositeN },
      ],
    },
  ],
};

export const heart: IPathData = {
  half: true,
  segments: [
    {
      type: SegmentType.bezier,
      values: [
        { x: empty, y: n },
        { x: empty, y: n },
        { x: n, y: empty },
        { x: n, y: oppositeHalfN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: n, y: oppositeHalfN },
        { x: n, y: oppositeHalfN },
        { x: n, y: oppositeN },
        { x: halfN, y: oppositeN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: oppositeN },
        { x: halfN, y: oppositeN },
        { x: empty, y: oppositeN },
        { x: empty, y: oppositeHalfN },
      ],
    },
  ],
};

export const spade: IPathData = {
  half: true,
  segments: [
    {
      type: SegmentType.bezier,
      values: [
        { x: empty, y: oppositeN },
        { x: empty, y: oppositeN },
        { x: n, y: oppositeHalfN },
        { x: n, y: empty },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: n, y: empty },
        { x: n, y: empty },
        { x: n, y: halfN },
        { x: halfN, y: halfN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: halfN },
        { x: halfN, y: halfN },
        { x: eighthN, y: halfN },
        { x: eighthN, y: eighthN },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: eighthN, y: eighthN },
        { x: eighthN, y: halfN },
        { x: halfN, y: n },
        { x: halfN, y: n },
      ],
    },
    {
      type: SegmentType.bezier,
      values: [
        { x: halfN, y: n },
        { x: halfN, y: n },
        { x: empty, y: n },
        { x: empty, y: n },
      ],
    },
  ],
};

export const paths: ICardSuitsPath = {
  [SuitType.hearts]: heart,
  [SuitType.diamonds]: diamond,
  [SuitType.clubs]: club,
  [SuitType.spades]: spade,
};
