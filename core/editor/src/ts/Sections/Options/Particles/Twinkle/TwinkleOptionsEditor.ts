import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { ITwinkle } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkle";

export class TwinkleOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ITwinkle) {
        this.container = parent.addContainer("twinkle", "Twinkle");
        this.particles = this.container.particles;

        this.addTwinkle();
    }

    private addTwinkle(): void {}
}
