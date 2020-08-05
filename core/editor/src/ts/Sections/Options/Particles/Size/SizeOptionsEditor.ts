import type { Container } from "tsparticles/dist/Core/Container";
import type { ISize } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISize";
import type { ISizeRandom } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISizeRandom";
import { DestroyType, StartValueType } from "tsparticles";
import { EditorSelectInput, EditorGroup } from "object-gui";

export class SizeOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: ISize) {
        this.group = parent.addGroup("size", "Size");
        this.particles = this.group.data as Container;

        this.addAnimation();
        this.addRandom();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const options = this.options.animation;
        const group = this.group.addGroup("animation", "Animation");

        const destroySelectInput = group.addProperty(
            "destroy",
            "Destroy",
            options.destroy,
            "select",
            async (value: number | string | boolean) => {
                if (
                    typeof value === "string" &&
                    (value === DestroyType.min || value === DestroyType.max || value === DestroyType.none)
                ) {
                    options.destroy = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        destroySelectInput.addItem(DestroyType.max);
        destroySelectInput.addItem(DestroyType.min);
        destroySelectInput.addItem(DestroyType.none);

        group.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        group.addProperty(
            "minimumValue",
            "Minimum Value",
            options.minimumValue,
            typeof options.minimumValue,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.minimumValue = value;

                    await particles.refresh();
                }
            }
        );

        group.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );

        const startValueSelectInput = group.addProperty(
            "startValue",
            "Start Value",
            options.startValue,
            "select",
            async (value: number | string | boolean) => {
                if (
                    typeof value === "string" &&
                    (value === StartValueType.min || value === StartValueType.max || value === StartValueType.random)
                ) {
                    options.startValue = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        startValueSelectInput.addItem(StartValueType.max);
        startValueSelectInput.addItem(StartValueType.min);
        startValueSelectInput.addItem(StartValueType.random);

        group.addProperty(
            "sync",
            "Sync",
            options.sync,
            typeof options.sync,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.sync = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addRandom(): void {
        const group = this.group.addGroup("random", "Random");
        const particles = this.particles;
        const options = this.options.random as ISizeRandom;

        group.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        group.addProperty(
            "minimumValue",
            "Minimum Value",
            options.minimumValue,
            typeof options.minimumValue,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.minimumValue = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty(
            "value",
            "Size",
            options.value,
            typeof options.value,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.value = value;

                    await particles.refresh();
                }
            }
        );
    }
}
