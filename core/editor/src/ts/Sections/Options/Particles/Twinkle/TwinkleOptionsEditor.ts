import { EditorContainer } from "../../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { ITwinkle } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkle";
import { Editor } from "../../../../Editor";
import { ITwinkleValues } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkleValues";
import { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { ColorUtils } from "tsparticles";
import { EditorNumberInput } from "../../../../Editors/EditorNumberInput";

export class TwinkleOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ITwinkle) {
        this.container = parent.addContainer("twinkle", "Twinkle");
        this.particles = this.container.particles;

        this.addTwinkle();
    }

    private addTwinkle(): void {
        this.addTwinkleValues(this.container.addContainer("lines", "Lines"), this.options.lines);
        this.addTwinkleValues(this.container.addContainer("particles", "Particles"), this.options.particles);
    }

    private addTwinkleValues(container: EditorContainer, options: ITwinkleValues): void {
        const particles = this.particles;

        let colorStringValue: string | undefined;

        if (options.color !== undefined) {
            if (typeof options.color === "string") {
                colorStringValue = options.color;
            } else if (typeof options.color.value === "string") {
                colorStringValue = options.color.value;
            } else {
                let rgb = options.color.value as IRgb;
                const hsl = options.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        container.addProperty("color", "Color", colorStringValue, "color", async (value: string | number | boolean) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color = {
                        value,
                    };
                }

                await particles.refresh();
            }
        });

        container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        container.addProperty(
            "frequency",
            "Frequency",
            options.frequency,
            typeof options.frequency,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.frequency = value;

                    await particles.refresh();
                }
            }
        );

        const opacityInput = container.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            typeof options.opacity,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);
    }
}
