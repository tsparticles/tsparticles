export interface IGridPathOptions {
  /**
   * If true, generate a maze automatically
   */
  autoMaze?: boolean;

  cellSize: number;

  /**
   * Optional explicit graph:
   * key = "x,y"
   * value = allowed directions [0=right,1=down,2=left,3=up]
   */
  graph?: Record<string, number[]>;

  /**
   * Maze size in cells (used only if autoMaze = true)
   */
  mazeHeight?: number;
  mazeWidth?: number;
}
