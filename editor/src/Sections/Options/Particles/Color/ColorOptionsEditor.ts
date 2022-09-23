import type { Container, IAnimatableColor } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class ColorOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IAnimatableColor;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: () => unknown): void {
        this.group = parent.addGroup("color", "Color", true, options);
        this.options = this.group.data as () => IAnimatableColor;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("value", "Value", EditorType.color).change(async () => {
            await this.particles().refresh();
        });
    }
}
