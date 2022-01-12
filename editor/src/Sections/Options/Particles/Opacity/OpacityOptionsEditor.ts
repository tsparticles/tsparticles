import { EditorGroup, EditorType } from "object-gui";
import type { Container, IOpacity } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import { DestroyType, StartValueType } from "tsparticles-engine";

export class OpacityOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IOpacity;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("opacity", "Opacity", true, options);
        this.options = this.group.data as IOpacity;

        this.addAnimation();
        this.addRandom();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const group = this.group.addGroup("animation", "Animation");

        group
            .addProperty("destroy", "Destroy", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: DestroyType.max,
                },
                {
                    value: DestroyType.min,
                },
                {
                    value: DestroyType.none,
                },
            ]);

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("minimumValue", "Minimum Value", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .min(0)
            .max(0)
            .step(0.01);

        group
            .addProperty("speed", "Speed", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01);

        group
            .addProperty("startValue", "Start Value", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: StartValueType.max,
                },
                {
                    value: StartValueType.min,
                },
                {
                    value: StartValueType.random,
                },
            ]);

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
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

        this.group
            .addProperty("value", "Value", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .min(0)
            .max(1)
            .step(0.01);
    }
}
