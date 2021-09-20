import type { Container } from "tsparticles-engine";
import type { ITwinkle } from "tsparticles/Options/Interfaces/Particles/Twinkle/ITwinkle";
import type { ITwinkleValues } from "tsparticles/Options/Interfaces/Particles/Twinkle/ITwinkleValues";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class TwinkleOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: ITwinkle;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("twinkle", "Twinkle", true, options);
        this.options = this.group.data as ITwinkle;

        this.addTwinkle();
    }

    private addTwinkle(): void {
        this.addTwinkleValues(this.group.addGroup("lines", "Lines"));
        this.addTwinkleValues(this.group.addGroup("particles", "Particles"));
    }

    private addTwinkleValues(group: EditorGroup): void {
        const particles = this.particles;
        const options = group.data as ITwinkleValues;
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color = {
                        value,
                    };
                }
            }

            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("frequency", "Frequency", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);
    }
}
