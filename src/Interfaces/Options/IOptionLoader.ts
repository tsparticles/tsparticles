export interface IOptionLoader<T> {
    load(data: T): void;
}
