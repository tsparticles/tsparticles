import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class TiltOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("tilt", "Tilt");
        this.options = this.group.data;

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
        this.group
            .addProperty("direction", "Direction", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
            })
            .addItems([
                {
                    value: "clockwise",
                },
                {
                    value: "counterClockwise",
                },
                {
                    value: "random",
                },
            ]);

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("random", "Random", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
