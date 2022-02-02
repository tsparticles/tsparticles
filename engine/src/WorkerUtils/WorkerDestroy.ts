import type { QuadTree } from "../Core";
import type { WorkerDestroyData } from "../Types";

export function workerDestroy(trees: Map<string, QuadTree>, data: WorkerDestroyData): void {
    const { containerId } = data;

    trees.delete(containerId);
}
