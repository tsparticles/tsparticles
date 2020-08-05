import type { Container } from "tsparticles/dist/Core/Container";
import type { ITwinkle } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkle";
import type { ITwinkleValues } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkleValues";
import { ColorUtils } from "tsparticles";
import { EditorNumberInput, EditorGroup, IRgb, IHsl } from "object-gui";

export class TwinkleOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: ITwinkle) {
        this.group = parent.addGroup("twinkle", "Twinkle");
        this.particles = this.group.data as Container;

        this.addTwinkle();
    }

    private addTwinkle(): void {
        this.addTwinkleValues(this.group.addGroup("lines", "Lines"), this.options.lines);
        this.addTwinkleValues(this.group.addGroup("particles", "Particles"), this.options.particles);
    }

    private addTwinkleValues(group: EditorGroup, options: ITwinkleValues): void {
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

        group.addProperty("color", "Color", colorStringValue, "color", async (value: string | number | boolean) => {
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

        group.addProperty(
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

        group.addProperty(
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

        const opacityInput = group.addProperty(
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
