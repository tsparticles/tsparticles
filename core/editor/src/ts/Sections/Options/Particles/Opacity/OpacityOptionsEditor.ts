import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOpacity } from "tsparticles/dist/Options/Interfaces/Particles/Opacity/IOpacity";
import type { IOpacityRandom } from "tsparticles/dist/Options/Interfaces/Particles/Opacity/IOpacityRandom";
import type { EditorNumberInput } from "object-gui/dist/js";
import { EditorBase } from "../../../../EditorBase";

export class OpacityOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IOpacity;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("opacity", "Opacity");
        this.options = this.group.data as IOpacity;

        this.addAnimation();
        this.addRandom();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const options = this.options.animation;
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        const minInput = group.addProperty(
            "minimumValue",
            "Minimum Value",
            options.minimumValue,
            typeof options.minimumValue,
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        minInput.min(0).max(0).step(0.01);

        const speedInput = group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        }) as EditorNumberInput;

        speedInput.step(0.01);

        group.addProperty("sync", "Sync", options.sync, typeof options.sync, async () => {
            await particles.refresh();
        });
    }

    private addRandom(): void {
        const particles = this.particles;
        const group = this.group.addGroup("random", "Random");
        const options = this.options.random as IOpacityRandom;

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        group.addProperty(
            "minimumValue",
            "Minimum Value",
            options.minimumValue,
            typeof options.minimumValue,
            async () => {
                await particles.refresh();
            }
        );
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        const opacityInput = this.group.addProperty("value", "Value", options.value, typeof options.value, async () => {
            await particles.refresh();
        }) as EditorNumberInput;

        opacityInput.min(0).max(1).step(0.01);
    }
}
