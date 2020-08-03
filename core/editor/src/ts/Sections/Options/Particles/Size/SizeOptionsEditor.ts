import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { ISize } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISize";
import { ISizeRandom } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISizeRandom";
import { DestroyType, StartValueType } from "tsparticles";
import { EditorSelectInput } from "../../../../Editors/EditorSelectInput";

export class SizeOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ISize) {
        this.container = parent.addContainer("size", "Size");
        this.particles = this.container.particles;

        this.addAnimation();
        this.addRandom();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.container.particles;
        const options = this.options.animation;
        const container = this.container.addContainer("animation", "Animation");

        const destroySelectInput = container.addProperty(
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

        container.addProperty(
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

        container.addProperty(
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

        container.addProperty(
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

        const startValueSelectInput = container.addProperty(
            "startValue",
            "Start Value",
            options.startValue,
            typeof options.startValue,
            async (value: number | string | boolean) => {
                if (typeof value === "string" && (value === StartValueType.min || value === StartValueType.max)) {
                    options.startValue = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        startValueSelectInput.addItem(StartValueType.max);
        startValueSelectInput.addItem(StartValueType.min);

        container.addProperty(
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
        const container = this.container.addContainer("random", "Random");
        const particles = this.particles;
        const options = this.options.random as ISizeRandom;

        container.addProperty(
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

        container.addProperty(
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
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
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
