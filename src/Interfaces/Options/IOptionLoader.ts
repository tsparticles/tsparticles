import {RecursivePartial} from "../../Types/RecursivePartial";

export interface IOptionLoader<T> {
    // TODO: Check obsoletes on load
    load(data: RecursivePartial<T>): void;
}
