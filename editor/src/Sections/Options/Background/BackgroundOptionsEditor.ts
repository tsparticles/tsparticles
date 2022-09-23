import type { Container, IBackground, IColor } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class BackgroundOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: () => IBackground;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("background", "Background");
        this.options = this.group.data as () => IBackground;

        this.addColor();

        this.addProperties();
    }

    private addColor(): void {
        const options = this.options().color as IColor;

        this.group
            .addProperty("color", "Color", EditorType.color, options.value, false)
            .change(async (value: unknown) => {
                const options = this.options().color as IColor;

                if (typeof value === "string") {
                    options.value = value;
                }

                this.notifyEditorChanged();
            });
    }

    private addProperties(): void {
        this.group.addProperty("image", "Image", EditorType.string).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        this.group.addProperty("position", "Position", EditorType.string).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("repeat", "Repeat", EditorType.string).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("size", "Size", EditorType.string).change(async () => {
            await this.particles().refresh();
        });
    }
}
