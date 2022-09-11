import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class TwinkleOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: () => unknown): void {
        this.group = parent.addGroup("twinkle", "Twinkle", true, options);
        this.options = this.group.data;

        this.addTwinkle();
    }

    private addTwinkle(): void {
        this.addTwinkleValues(this.group.addGroup("lines", "Lines"));
        this.addTwinkleValues(this.group.addGroup("particles", "Particles"));
    }

    private addTwinkleValues(group: EditorGroup): void {
        const optionsFunc = (): { color: string | undefined | { value: unknown } } =>
            group.data() as { color: string | undefined | { value: unknown } };
        const options = optionsFunc();
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color = {
                        value,
                    };
                }
            }

            await this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("frequency", "Frequency", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);
    }
}
