/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-nested-ternary */
import { type Container, type IMovePathGenerator, Vector, getRandom, identity, originPoint } from "@tsparticles/engine";
import type { GridPathParticle } from "./GridPathParticle.js";
import type { IGridPathOptions } from "./IGridPathOptions.js";

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

  constructor(container: Container) {
    this._container = container;
    this.options = {
      cellSize: 40,
      graph: undefined,
      autoMaze: false,
      mazeWidth: 20,
      mazeHeight: 20,
    };
  }

  // -------------------------------------------

  generate(p: GridPathParticle): Vector {
    p.grid ??= {
      direction: Math.trunc(getRandom() * dirs.length),
      speed: p.velocity.length,
      cellPosition: {
        x: Math.floor(p.position.x / this.options.cellSize),
        y: Math.floor(p.position.y / this.options.cellSize),
      },
    };

    const grid = p.grid;

    const cx = Math.floor(p.position.x / this.options.cellSize);
    const cy = Math.floor(p.position.y / this.options.cellSize);

    if (cx !== grid.cellPosition.x || cy !== grid.cellPosition.y) {
      grid.cellPosition.x = cx;
      grid.cellPosition.y = cy;

      const key = `${cx},${cy}`;
      const allowed = this.options.graph?.[key];

      if (allowed && allowed.length > minLength) {
        grid.direction = allowed[Math.trunc(getRandom() * allowed.length)]!;
      } else if (!this.options.graph) {
        // free grid fallback
        const turn = Math.trunc(getRandom() * 3) - 1;
        grid.direction = (grid.direction + turn + 4) % dirs.length;
      }
      // if graph exists but cell not in graph -> go straight
    }

    p.velocity.x = 0;
    p.velocity.y = 0;

    const d = dirs[grid.direction]!;

    return Vector.create(d.x * grid.speed, d.y * grid.speed);
  }

  init(): void {
    const source = this._container.actualOptions.particles.move.path.options;

    this.options.cellSize = (source["cellSize"] as number | undefined) ?? this.options.cellSize;
    this.options.autoMaze = (source["autoMaze"] as boolean | undefined) ?? this.options.autoMaze;
    this.options.mazeWidth = (source["mazeWidth"] as number | undefined) ?? this.options.mazeWidth;
    this.options.mazeHeight = (source["mazeHeight"] as number | undefined) ?? this.options.mazeHeight;
    this.options.graph = source["graph"] as Record<string, number[]> | undefined;

    // autoMaze overrides graph if enabled
    if (this.options.autoMaze) {
      const w = Math.max(1, this.options.mazeWidth!),
        h = Math.max(1, this.options.mazeHeight!);
      this.options.graph = this._generateMazeGraph(w, h);
    }
  }

  reset(p: GridPathParticle): void {
    delete p.grid;
  }

  update(): void {
    // nothing to do
  }

  // ---------- MAZE GENERATION (DFS) ----------
  private _generateMazeGraph(width: number, height: number): Record<string, number[]> {
    const graph: Record<string, number[]> = {};
    const visited: boolean[][] = [];
    for (let y = 0; y < height; y++) {
      visited[y] = [];
    }

    const walk = (x: number, y: number): void => {
      visited[y]![x] = true;

      const dirsOrder = [0, 1, 2, 3].sort(() => getRandom() - 0.5);

      for (const d of dirsOrder) {
        const nx = x + (d === 0 ? 1 : d === 2 ? -1 : 0),
          ny = y + (d === 1 ? 1 : d === 3 ? -1 : 0);

        if (nx < originPoint.x || ny < originPoint.y || nx >= width || ny >= height) {
          continue;
        }

        if (!visited[ny]![nx]) {
          const key = `${x},${y}`;
          const nkey = `${nx},${ny}`;

          graph[key] ??= [];
          graph[nkey] ??= [];

          graph[key].push(d);
          graph[nkey].push(opposite[d]!);

          walk(nx, ny);
        }
      }
    };

    walk(originPoint.x, originPoint.y);

    return graph;
  }
}
