import { WorkerOutputEventType, WorkerQueryType } from "../Enums";
import type { QuadTree } from "../Core";
import { WorkerQueryData } from "../Types";

export function workerQuery(trees: Map<string, QuadTree>, data: WorkerQueryData): void {
    const { containerId, position, queryId, queryType, radius, size } = data;

    const tree = trees.get(containerId);

    if (!tree || (!size && radius === undefined)) {
        return;
    }

    let query: number[];

    switch (queryType) {
        case WorkerQueryType.circle:
            query = tree.queryCircle(position, radius ?? (size ? Math.max(size.width, size.height) : 0));

            break;
        case WorkerQueryType.circleWarp:
            query = tree.queryCircleWarp(
                position,
                radius ?? (size ? Math.max(size.width, size.height) : 0),
                tree.rectangle.size
            );

            break;
        case WorkerQueryType.rectangle:
            query = tree.queryRectangle(
                position,
                size ?? {
                    width: radius ?? 0,
                    height: radius ?? 0,
                }
            );

            break;
        default:
            query = [];
    }

    postMessage({
        type: WorkerOutputEventType.query,
        containerId,
        queryId,
        query,
    });
}
