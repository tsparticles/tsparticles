import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import { RotateDirection } from "tsparticles-engine";

export class RotateOptionsEditor extends EditorBase {
    group!: EditorGroup;

    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("rotate", "Rotate");
        this.options = this.group.data as () => unknown;

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
                    value: RotateDirection.clockwise,
                },
                {
                    value: RotateDirection.counterClockwise,
                },
                {
                    value: RotateDirection.random,
                },
            ]);

        this.group.addProperty("path", "Path", EditorType.boolean).change(async () => {
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
