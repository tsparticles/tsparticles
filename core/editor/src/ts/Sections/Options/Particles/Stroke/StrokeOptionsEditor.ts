import { Container } from "tsparticles/dist/Core/Container";
import { IStroke } from "tsparticles/dist/Options/Interfaces/Particles/IStroke";
import { ColorOptionsEditor } from "../Color/ColorOptionsEditor";
import { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";
import { EditorNumberInput, EditorGroup, SingleOrMultiple } from "object-gui";

export class StrokeOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: SingleOrMultiple<IStroke>) {
        this.group = parent.addGroup("stroke", "Stroke");
        this.particles = this.group.data as Container;

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const group = this.group.addGroup(`stroke_${i + 1}`, `Stroke_${i + 1}`);

                this.addStroke(group, options[i]);
            }
        } else {
            this.addStroke(this.group, options);
        }
    }

    private addStroke(group: EditorGroup, options: IStroke): void {
        const particles = this.particles;

        if (options.color === undefined) {
            options.color = {
                value: "",
                animation: {
                    enable: false,
                    speed: 0,
                    sync: false,
                },
            };
        }

        const colorOptions = new ColorOptionsEditor(group, options.color as IAnimatableColor);

        const opacityInput = group.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            "number",
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        group.addProperty("width", "Width", options.width, "number", async (value: number | string | boolean) => {
            if (typeof value === "number") {
                options.width = value;

                await particles.refresh();
            }
        });
    }
}
