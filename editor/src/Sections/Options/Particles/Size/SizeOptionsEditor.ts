import type { Container } from "tsparticles-engine";
import type { ISize } from "tsparticles-engine/Options/Interfaces/Particles/Size/ISize";
import { DestroyType, StartValueType } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class SizeOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: ISize;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("size", "Size");
        this.options = this.group.data as ISize;

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

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

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
        const group = this.group.addGroup("random", "Random");
        const particles = this.particles;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
