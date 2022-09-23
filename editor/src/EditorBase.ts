import type { Container } from "tsparticles-engine";
import type { EditorGroup } from "object-gui";
import { editorChangedEvent } from "./Utils";
import { tsParticles } from "tsparticles-engine";

export abstract class EditorBase {
    protected constructor(protected readonly particles: () => Container) {}

    notifyEditorChanged(): void {
        tsParticles.dispatchEvent(editorChangedEvent, {
            container: this.particles(),
        });
    }

    abstract addToGroup(parent: EditorGroup, options?: () => unknown): void;
}
