import type { Container } from "tsparticles/dist/Core/Container";
import type { ISize } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISize";
import type { ISizeRandom } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISizeRandom";
import { DestroyType, StartValueType } from "tsparticles";
import { EditorGroup, EditorSelectInput, EditorType } from "object-gui";
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
        const options = this.options.animation;
        const group = this.group.addGroup("animation", "Animation");

        const destroySelectInput = group.addProperty("destroy", "Destroy", EditorType.select).change(async () => {
            await particles.refresh();
        }) as EditorSelectInput;

        destroySelectInput.addItem(DestroyType.max);
        destroySelectInput.addItem(DestroyType.min);
        destroySelectInput.addItem(DestroyType.none);

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const startValueSelectInput = group
            .addProperty("startValue", "Start Value", EditorType.select)
            .change(async () => {
                await particles.refresh();
            }) as EditorSelectInput;

        startValueSelectInput.addItem(StartValueType.max);
        startValueSelectInput.addItem(StartValueType.min);
        startValueSelectInput.addItem(StartValueType.random);

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addRandom(): void {
        const group = this.group.addGroup("random", "Random");
        const particles = this.particles;
        const options = this.options.random as ISizeRandom;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
