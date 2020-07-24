import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { ISize } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISize";
import { ISizeRandom } from "tsparticles/dist/Options/Interfaces/Particles/Size/ISizeRandom";
import { DestroyType, StartValueType } from "tsparticles";

export class SizeOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ISize) {
        this.container = parent.addContainer("size", "Size");
        this.particles = this.container.particles;

        this.addSize();
    }

    private addSize(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
            "size",
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

        const animationContainer = this.container.addContainer("animation", "Animation");

        animationContainer.addProperty(
            "destroy",
            "Destroy",
            options.animation.destroy,
            typeof options.animation.destroy,
            async (value: number | string | boolean) => {
                if (
                    typeof value === "string" &&
                    (value === DestroyType.min || value === DestroyType.max || value === DestroyType.none)
                ) {
                    options.animation.destroy = value;

                    await particles.refresh();
                }
            }
        );

        animationContainer.addProperty(
            "enable",
            "Enable",
            options.animation.enable,
            typeof options.animation.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.animation.enable = value;

                    await particles.refresh();
                }
            }
        );

        animationContainer.addProperty(
            "minimumValue",
            "Minimum Value",
            options.animation.minimumValue,
            typeof options.animation.minimumValue,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.animation.minimumValue = value;

                    await particles.refresh();
                }
            }
        );

        animationContainer.addProperty(
            "speed",
            "Speed",
            options.animation.speed,
            typeof options.animation.speed,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.animation.speed = value;

                    await particles.refresh();
                }
            }
        );

        animationContainer.addProperty(
            "startValue",
            "Start Value",
            options.animation.startValue,
            typeof options.animation.startValue,
            async (value: number | string | boolean) => {
                if (typeof value === "string" && (value === StartValueType.min || value === StartValueType.max)) {
                    options.animation.startValue = value;

                    await particles.refresh();
                }
            }
        );

        animationContainer.addProperty(
            "sync",
            "Sync",
            options.animation.sync,
            typeof options.animation.sync,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.animation.sync = value;

                    await particles.refresh();
                }
            }
        );

        const randomContainer = this.container.addContainer("random", "Random");

        const randomOptions = options.random as ISizeRandom;

        randomContainer.addProperty(
            "enable",
            "Enable",
            randomOptions.enable,
            typeof randomOptions.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    randomOptions.enable = value;

                    await particles.refresh();
                }
            }
        );

        randomContainer.addProperty(
            "minimumValue",
            "Minimum Value",
            randomOptions.minimumValue,
            typeof randomOptions.minimumValue,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    randomOptions.minimumValue = value;

                    await particles.refresh();
                }
            }
        );
    }
}
