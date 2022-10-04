import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class MotionOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("motion", "Motion");
        this.options = this.group.data;

        this.addReduce();
        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("disable", "Disable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }

    private addReduce(): void {
        const coverGroup = this.group.addGroup("reduce", "Reduce");

        coverGroup
            .addProperty("factor", "Factor", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(1);

        coverGroup.addProperty("value", "Value", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }
}
