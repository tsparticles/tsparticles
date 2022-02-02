import { workerAdd, workerDestroy, workerInit, workerQuery } from "./WorkerUtils";
import { QuadTree } from "./Core";
import { WorkerInputEventType } from "./Enums";

const trees = new Map<string, QuadTree>();

onmessage = (e) => {
    switch (e.data.type) {
        case WorkerInputEventType.add:
            workerAdd(trees, e.data);

            break;
        case WorkerInputEventType.destroy:
            workerDestroy(trees, e.data);

            break;
        case WorkerInputEventType.init:
            workerInit(trees, e.data);

            break;
        case WorkerInputEventType.query:
            workerQuery(trees, e.data);

            break;
    }
};
