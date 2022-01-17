import type { Container, IBackground, IColor } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";

export class BackgroundOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: IBackground;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("background", "Background");
        this.options = this.group.data as IBackground;

        this.addColor();

        this.addProperties();
    }

    private addColor(): void {
        const particles = this.particles;
        const options = this.options.color as IColor;

        this.group
            .addProperty("color", "Color", EditorType.color, options.value, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    options.value = value;
                }

                await particles.refresh();
            });
    }

    private addProperties(): void {
        const particles = this.particles;
        this.group.addProperty("image", "Image", EditorType.string).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        this.group.addProperty("position", "Position", EditorType.string).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("repeat", "Repeat", EditorType.string).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("size", "Size", EditorType.string).change(async () => {
            await particles.refresh();
        });
    }
}
