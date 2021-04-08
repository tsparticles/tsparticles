import type { Container } from "tsparticles";
import { IShadow } from "tsparticles/dist/Options/Interfaces/Particles/IShadow";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ShadowOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IShadow;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shadow", "Shadow");
        this.options = this.group.data as IShadow;

        this.addOffset();
        this.addProperties();
    }

    private addOffset(): void {
        const particles = this.particles;
        const group = this.group.addGroup("offset", "Offset");

        group.addProperty("x", "X", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("y", "Y", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        this.group.addProperty("blur", "Blur", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color.value = value;
                }
            }

            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
