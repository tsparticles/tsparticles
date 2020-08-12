import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";
import { EditorBase } from "../../../../EditorBase";

export class NumberOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IParticlesNumber;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
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

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
