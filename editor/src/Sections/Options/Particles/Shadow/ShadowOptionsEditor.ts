import type { Container, IShadow } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class ShadowOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IShadow;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shadow", "Shadow");
        this.options = this.group.data as () => IShadow;

        this.addOffset();
        this.addProperties();
    }

    private addOffset(): void {
        const group = this.group.addGroup("offset", "Offset");

        group.addProperty("x", "X", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("y", "Y", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        const optionsFunc = (): IShadow => this.options();
        const options = optionsFunc();
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        this.group.addProperty("blur", "Blur", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color.value = value;
                }
            }

            await this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }
}
