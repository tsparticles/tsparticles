import type { Container, IParticlesNumber } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class NumberOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IParticlesNumber;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("number", "Number");
        this.options = this.group.data as IParticlesNumber;

        this.addDensity();
        this.addProperties();
    }

    private addDensity(): void {
        const particles = this.particles;
        const group = this.group.addGroup("density", "Density");

        group.addProperty("area", "Area", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("limit", "Limit", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("max", "Max", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
