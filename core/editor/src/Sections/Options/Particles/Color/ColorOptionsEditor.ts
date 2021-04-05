import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles";
import type { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";
import { EditorBase } from "../../../../EditorBase";

export class ColorOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IAnimatableColor;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("color", "Color", true, options);
        this.options = this.group.data as IAnimatableColor;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("value", "Value", EditorType.color).change(async () => {
            await particles.refresh();
        });
    }
}
