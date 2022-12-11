import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class WobbleOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("wobble", "Wobble");
        this.options = this.group.data;

        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
