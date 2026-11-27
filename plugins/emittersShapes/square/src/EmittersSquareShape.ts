import {
  EmitterShapeBase,
  type IRandomPositionData,
} from "@tsparticles/plugin-emitters";
import {
  type ICoordinates,
  type IDimension,
  double,
  half,
  toEnumValue,
} from "@tsparticles/engine";

const sides = 4;

enum Sides {
  TopLeft = 0,
  TopRight = 1,
  BottomRight = 2,
  BottomLeft = 3,
}

/**
 * @param position - The position
 * @param offset - The offset
 * @returns the offset
 */
function randomSquareCoordinate(
  position: number,
  offset: number,
  random: () => number,
): number {
  return position + offset * (random() - half);
}

/**
 * @param sides - The sides
 * @returns the number of sides
 */
function getRandomSize(sides: number, random: () => number): Sides {
  return toEnumValue(Sides, Math.floor(random() * sides), Sides.BottomLeft);
}

export class EmittersSquareShape extends EmitterShapeBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    position: ICoordinates,
    size: IDimension,
    fill: boolean,
    options: unknown,
  ) {
    super(position, size, fill, options);
  }

  override draw(context: OffscreenCanvasRenderingContext2D): void {
    const position = this.position,
      size = this.size,
      halfW = size.width * half,
      halfH = size.height * half;

    context.rect(
      position.x - halfW,
      position.y - halfH,
      size.width,
      size.height,
    );
  }

  async init(): Promise<void> {
    // nothing to do
  }

  randomPosition(random: () => number): IRandomPositionData {
    const fill = this.fill,
      position = this.position,
      size = this.size;

    if (fill) {
      return {
        position: {
          x: randomSquareCoordinate(position.x, size.width, random),
          y: randomSquareCoordinate(position.y, size.height, random),
        },
      };
    } else {
      const halfW = size.width * half,
        halfH = size.height * half,
        side = getRandomSize(sides, random),
        v = (random() - half) * double;

      switch (side) {
        case Sides.TopLeft:
          // top-left
          return {
            position: {
              x: position.x + v * halfW,
              y: position.y - halfH,
            },
          };
        case Sides.TopRight:
          // top-right
          return {
            position: {
              x: position.x - halfW,
              y: position.y + v * halfH,
            },
          };
        case Sides.BottomRight:
          // bottom-right
          return {
            position: {
              x: position.x + v * halfW,
              y: position.y + halfH,
            },
          };
        case Sides.BottomLeft:
        default:
          // bottom-left
          return {
            position: {
              x: position.x + halfW,
              y: position.y + v * halfH,
            },
          };
      }
    }
  }
}
