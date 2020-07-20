import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IShape } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShape";

export class ShapeOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IShape) {
        this.container = parent.addContainer("shape", "Shape", true);
        this.particles = this.container.particles;

        this.addShape();
    }

    private addShape(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty("type", "Type", options.type, "string", async (value: string | number | boolean) => {
            if (typeof value === "string") {
                options.type = value;

                await particles.refresh();
            }
        });
    }
}
