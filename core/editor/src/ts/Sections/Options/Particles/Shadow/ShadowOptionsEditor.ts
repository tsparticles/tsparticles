import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { IShadow } from "tsparticles/dist/Options/Interfaces/Particles/IShadow";

export class ShadowOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IShadow) {
        this.container = parent.addContainer("shadow", "Shadow");
        this.particles = this.container.particles;

        this.addShadow();
    }

    private addShadow(): void {}
}
