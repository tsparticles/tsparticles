import type { Container } from "tsparticles-engine";
import type { EditorGroup } from "object-gui";

export abstract class EditorBase {
    protected constructor(protected readonly particles: Container) {}

    abstract addToGroup(parent: EditorGroup, options?: unknown): void;
}
