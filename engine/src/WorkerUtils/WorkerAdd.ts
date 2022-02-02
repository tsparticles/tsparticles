import { Point } from "../Core";
import type { QuadTree } from "../Core";
import type { WorkerAddData } from "../Types";

export function workerAdd(trees: Map<string, QuadTree>, data: WorkerAddData): void {
    const { containerId, particleId, position, radius } = data;

    const tree = trees.get(containerId);

    if (!tree) {
        return;
    }

    const p = new Point(position, particleId, radius);

    tree.insert(p);
}
