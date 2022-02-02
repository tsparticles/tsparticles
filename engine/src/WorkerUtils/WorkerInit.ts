import { QuadTree, Rectangle } from "../Core";
import { WorkerInitData } from "../Types";

export function workerInit(trees: Map<string, QuadTree>, data: WorkerInitData): void {
    const { containerId, size } = data,
        rect = new Rectangle(data.position.x, data.position.y, size.width, size.height);

    trees.set(containerId, new QuadTree(rect, 4));
}
