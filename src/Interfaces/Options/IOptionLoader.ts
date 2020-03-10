export interface IOptionLoader<T> {
    // TODO: Check obsoletes on load
    load(data: T): void;
}
