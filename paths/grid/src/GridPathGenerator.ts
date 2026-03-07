/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-nested-ternary */
import {
  type Container,
  type ICoordinates,
  type IDimension,
  Vector,
  getRandom,
  identity,
  originPoint,
} from "@tsparticles/engine";
import type { GridPathParticle } from "./GridPathParticle.js";
import type { IGridPathOptions } from "./IGridPathOptions.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

const dirs = [
    Vector.create(identity, originPoint.y), // 0 right
    Vector.create(originPoint.x, identity), // 1 down
    Vector.create(-identity, originPoint.y), // 2 left
    Vector.create(originPoint.x, -identity), // 3 up
  ],
  opposite = [2, 3, 0, 1],
  minLength = 0;

export class GridPathGenerator implements IMovePathGenerator {
  readonly options: IGridPathOptions;
  private readonly _container: Container;
  private readonly _res: Vector;

  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;
    this.options = {
      cellSize: 40,
      graph: undefined,
      autoMaze: false,
    };
  }

  // -------------------------------------------

  generate(p: GridPathParticle): Vector {
    const size = this.options.cellSize;

    p.grid ??= {
      direction: Math.trunc(getRandom() * dirs.length),
      speed: p.velocity.length,
      cellPosition: {
        x: Math.floor(p.position.x / size),
        y: Math.floor(p.position.y / size),
      },
    };

    const grid = p.grid,
      c: ICoordinates = {
        x: Math.floor(p.position.x / size),
        y: Math.floor(p.position.y / size),
      };

    if (c.x !== grid.cellPosition.x || c.y !== grid.cellPosition.y) {
      grid.cellPosition.x = c.x;
      grid.cellPosition.y = c.y;

      const key = `${c.x},${c.y}`,
        allowed = this.options.graph?.[key];

      if (allowed && allowed.length > minLength) {
        grid.direction = allowed[Math.trunc(getRandom() * allowed.length)]!;
      } else if (!this.options.graph) {
        // free grid fallback
        const turn = Math.trunc(getRandom() * 3) - 1;
        grid.direction = (grid.direction + turn + 4) % dirs.length;
      }
    }

    p.velocity.x = 0;
    p.velocity.y = 0;

    const d = dirs[grid.direction]!;

    this._res.x = d.x * grid.speed;
    this._res.y = d.y * grid.speed;

    return this._res;
  }

  // -------------------------------------------

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.cellSize = (source["cellSize"] as number | undefined) ?? this.options.cellSize;
    this.options.autoMaze = (source["autoMaze"] as boolean | undefined) ?? this.options.autoMaze;
    this.options.graph = source["graph"] as Record<string, number[]> | undefined;

    // AUTO MAZE = FULL CANVAS
    if (this.options.autoMaze) {
      const canvas = this._container.canvas.size,
        cellSize = this.options.cellSize,
        size: IDimension = {
          width: Math.ceil(canvas.width / cellSize),
          height: Math.ceil(canvas.height / cellSize),
        };

      this.options.graph = this._generateMazeGraph(size);
    }
  }

  reset(p: GridPathParticle): void {
    delete p.grid;
  }

  update(): void {
    // nothing to do
  }

  // ---------- MAZE GENERATION (DFS) ----------
  private _generateMazeGraph({ height, width }: IDimension): Record<string, number[]> {
    const graph: Record<string, number[]> = {},
      visited: boolean[][] = [];

    for (let y = 0; y < height; y++) {
      visited[y] = [];
    }

    const stack: ICoordinates[] = [{ x: originPoint.x, y: originPoint.y }];

    while (stack.length > 0) {
      const { x, y } = stack[stack.length - 1]!;

      if (!visited[y]![x]) {
        visited[y]![x] = true;
      }

      const dirsOrder = [0, 1, 2, 3].sort(() => getRandom() - 0.5);
      let moved = false;

      for (const d of dirsOrder) {
        const n: ICoordinates = {
          x: x + (d === 0 ? 1 : d === 2 ? -1 : 0),
          y: y + (d === 1 ? 1 : d === 3 ? -1 : 0),
        };

        if (n.x < 0 || n.y < 0 || n.x >= width || n.y >= height) {
          continue;
        }

        if (!visited[n.y]![n.x]) {
          const key = `${x},${y}`,
            nKey = `${n.x},${n.y}`;

          graph[key] ??= [];
          graph[nKey] ??= [];

          graph[key].push(d);
          graph[nKey].push(opposite[d]!);

          stack.push(n);
          moved = true;
          break;
        }
      }

      if (!moved) {
        stack.pop();
      }
    }

    return graph;
  }
}
