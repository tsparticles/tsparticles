import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles-engine";
import type { IZIndex } from "tsparticles-engine/Options/Interfaces/Particles/ZIndex/IZIndex";
import { EditorType } from "object-gui";

export class ZIndexOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IZIndex;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("zIndex", "Z Index");
        this.options = this.group.data as IZIndex;

        this.addRandom();
        this.addProperties();
    }

    private addRandom(): void {
        const particles = this.particles;
        const group = this.group.addGroup("random", "Random");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const group = this.group;

        group.addProperty("opacityRate", "Opacity Rate", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("velocityRate", "Velocity Rate", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sizeRate", "Size Rate", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
