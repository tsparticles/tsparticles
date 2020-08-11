import type { RecursivePartial } from "../../Types";

export interface IOptionLoader<T> {
    load(data?: RecursivePartial<T>): void;
}
