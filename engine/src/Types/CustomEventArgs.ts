import type { Container } from "../Core/Container.js";

export type CustomEventArgs = {
    container: Container;
    data?: unknown;
};
