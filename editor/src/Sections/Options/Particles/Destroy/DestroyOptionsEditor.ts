import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import { DestroyMode } from "tsparticles-engine";
import { IDestroy } from "tsparticles-engine/Options/Interfaces/Particles/Destroy/IDestroy";

export class DestroyOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IDestroy;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("destroy", "Destroy");
        this.options = this.group.data as IDestroy;

        this.addSplit();
        this.addProperties();
    }

    private addSplit(): void {
        const group = this.group.addGroup("split", "Split");
        const particles = this.particles;

        const factorGroup = group.addGroup("factor", "Factor");

        const randomFactorGroup = factorGroup.addGroup("random", "Random");

        randomFactorGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomFactorGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        factorGroup.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const rateGroup = group.addGroup("rate", "Rate");

        const randomRateGroup = rateGroup.addGroup("random", "Random");

        randomRateGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomRateGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        rateGroup.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("count", "Count", EditorType.number).change(async () => {
            particles.refresh();
        });
    }

    private addProperties(): void {
        const group = this.group;
        const particles = this.particles;

        group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                particles.refresh();
            })
            .addItems([
                {
                    value: DestroyMode.none,
                },
                {
                    value: DestroyMode.split,
                },
            ]);
    }
}
