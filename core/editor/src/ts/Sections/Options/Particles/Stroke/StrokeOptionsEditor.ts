import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { IStroke } from "tsparticles/dist/Options/Interfaces/Particles/IStroke";
import { SingleOrMultiple } from "tsparticles";
import { ColorOptionsEditor } from "../Color/ColorOptionsEditor";
import { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";
import { EditorNumberInput } from "../../../../Editors/EditorNumberInput";

export class StrokeOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: SingleOrMultiple<IStroke>) {
        this.container = parent.addContainer("stroke", "Stroke");
        this.particles = this.container.particles;

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const container = this.container.addContainer(`stroke_${i + 1}`, `Stroke_${i + 1}`);

                this.addStroke(container, options[i]);
            }
        } else {
            this.addStroke(this.container, options);
        }
    }

    private addStroke(container: EditorContainer, options: IStroke): void {
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

        const colorOptions = new ColorOptionsEditor(container, options.color as IAnimatableColor);

        const opacityInput = container.addProperty(
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

        container.addProperty("width", "Width", options.width, "number", async (value: number | string | boolean) => {
            if (typeof value === "number") {
                options.width = value;

                await particles.refresh();
            }
        });
    }
}
