import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles-engine";
import type { IRepulse } from "tsparticles-engine/Core/Interfaces/IRepulse";
import { EditorType } from "object-gui";

export class RepulseOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IRepulse;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("repulse", "Repulse");
        this.options = this.group.data as IRepulse;

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

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
