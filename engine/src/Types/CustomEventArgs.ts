import type { Container } from "../Core/Container";

export type CustomEventArgs = {
    container: Container;
    data?: unknown;
};
