import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { IStroke } from "tsparticles/dist/Options/Interfaces/Particles/IStroke";
import { SingleOrMultiple } from "tsparticles";

export class StrokeOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: SingleOrMultiple<IStroke>) {
        this.container = parent.addContainer("stroke", "Stroke");
        this.particles = this.container.particles;

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const container = this.container.addContainer(`stroke_${i + 1}`, `Stroke_${i + 1}`);

                this.addStroke(container, options[i]);
            }
        } else {
            this.addStroke(this.container, options);
        }
    }

    private addStroke(container: EditorContainer, options: IStroke): void {
        const particles = this.particles;
    }
}
