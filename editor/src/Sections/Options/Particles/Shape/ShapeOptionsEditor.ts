import type { Container, IShape } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class ShapeOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IShape;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shape", "Shape");
        this.options = this.group.data as () => IShape;

        this.addProperties();
    }

    private addProperties(): void {
        const selectType = this.group.addProperty("type", "Type", EditorType.select).change(async () => {
            await this.particles().refresh();
        });

        for (const key of this.particles().drawers.keys()) {
            selectType.addItem(key);
        }
    }
}
