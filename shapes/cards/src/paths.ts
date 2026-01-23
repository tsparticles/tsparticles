import { empty, half, quarter, threeQuarter } from "@tsparticles/engine";
import type { ICardsPath } from "./ICardsPath.js";

const n = 0.5,
  eighth = quarter * half;

export const paths: ICardsPath = {
  heart: {
    segments: [
      {
        values: [
          { x: empty, y: n },
          { x: empty, y: n },
          { x: n, y: empty },
          { x: n, y: -n * half },
        ],
      },
      {
        values: [
          { x: n, y: -n * half },
          { x: n, y: -n * half },
          { x: n, y: -n },
          { x: n * half, y: -n },
        ],
      },
      {
        values: [
          { x: n * half, y: -n },
          { x: n * half, y: -n },
          { x: empty, y: -n },
          { x: empty, y: -n * half },
        ],
      },
    ],
  },
  diamond: {
    segments: [
      {
        values: [
          { x: empty, y: n },
          { x: empty, y: n },
          { x: n * threeQuarter, y: empty },
          { x: n * threeQuarter, y: empty },
        ],
      },
      {
        values: [
          { x: n * threeQuarter, y: empty },
          { x: n * threeQuarter, y: empty },
          { x: empty, y: -n },
          { x: empty, y: -n },
        ],
      },
    ],
  },
  club: {
    segments: [
      {
        values: [
          { x: empty, y: -n },
          { x: empty, y: -n },
          { x: n * half, y: -n },
          { x: n * half, y: -n * half },
        ],
      },
      {
        values: [
          { x: n * half, y: -n * half },
          { x: n * half, y: -n * half },
          { x: n, y: -n * half },
          { x: n, y: empty },
        ],
      },
      {
        values: [
          { x: n, y: empty },
          { x: n, y: empty },
          { x: n, y: n * half },
          { x: n * half, y: n * half },
        ],
      },
      {
        values: [
          { x: n * half, y: n * half },
          { x: n * half, y: n * half },
          { x: n * eighth, y: n * half },
          { x: n * eighth, y: n * eighth },
        ],
      },
      {
        values: [
          { x: n * eighth, y: n * eighth },
          { x: n * eighth, y: n * half },
          { x: n * half, y: n },
          { x: n * half, y: n },
        ],
      },
      {
        values: [
          { x: n * half, y: n },
          { x: n * half, y: n },
          { x: empty, y: n },
          { x: empty, y: n },
        ],
      },
    ],
  },
  spade: {
    segments: [
      {
        values: [
          { x: empty, y: -n },
          { x: empty, y: -n },
          { x: n, y: -n * half },
          { x: n, y: empty },
        ],
      },
      {
        values: [
          { x: n, y: empty },
          { x: n, y: empty },
          { x: n, y: n * half },
          { x: n * half, y: n * half },
        ],
      },
      {
        values: [
          { x: n * half, y: n * half },
          { x: n * half, y: n * half },
          { x: n * eighth, y: n * half },
          { x: n * eighth, y: n * eighth },
        ],
      },
      {
        values: [
          { x: n * eighth, y: n * eighth },
          { x: n * eighth, y: n * half },
          { x: n * half, y: n },
          { x: n * half, y: n },
        ],
      },
      {
        values: [
          { x: n * half, y: n },
          { x: n * half, y: n },
          { x: empty, y: n },
          { x: empty, y: n },
        ],
      },
    ],
  },
};
