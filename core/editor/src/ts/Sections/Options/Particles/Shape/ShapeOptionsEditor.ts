import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IShape } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShape";
import { EditorSelectInput } from "../../../../Editors/EditorSelectInput";

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

        const selectType = this.container.addProperty(
            "type",
            "Type",
            options.type,
            "select",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.type = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        for (const key of particles.drawers.keys()) {
            selectType.addItem(key, key);
        }
    }
}
