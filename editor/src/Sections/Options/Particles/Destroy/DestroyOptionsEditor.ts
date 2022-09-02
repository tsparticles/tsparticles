import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class DestroyOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("destroy", "Destroy");
        this.options = this.group.data;

        this.addSplit();
        this.addProperties();
    }

    private addProperties(): void {
        const group = this.group;

        group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                this.particles().refresh();
            })
            .addItems([
                {
                    value: "none",
                },
                {
                    value: "split",
                },
            ]);
    }

    private addSplit(): void {
        const group = this.group.addGroup("split", "Split");

        const factorGroup = group.addGroup("factor", "Factor");

        const randomFactorGroup = factorGroup.addGroup("random", "Random");

        randomFactorGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        randomFactorGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        factorGroup.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        const rateGroup = group.addGroup("rate", "Rate");

        const randomRateGroup = rateGroup.addGroup("random", "Random");

        randomRateGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        randomRateGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        rateGroup.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("count", "Count", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
