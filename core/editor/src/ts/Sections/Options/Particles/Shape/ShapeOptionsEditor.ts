import type { Container } from "tsparticles/dist/Core/Container";
import type { IShape } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShape";
import { EditorSelectInput, EditorGroup } from "object-gui";

export class ShapeOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IShape) {
        this.group = parent.addGroup("shape", "Shape");
        this.particles = this.group.data as Container;

        this.addShape();
    }

    private addShape(): void {
        const particles = this.group.data as Container;
        const options = this.options;

        const selectType = this.group.addProperty(
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
            selectType.addItem(key);
        }
    }
}
