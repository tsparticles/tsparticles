import type { Container } from "tsparticles/dist/Core/Container";
import type { ITwinkle } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkle";
import type { ITwinkleValues } from "tsparticles/dist/Options/Interfaces/Particles/Twinkle/ITwinkleValues";
import { ColorUtils } from "tsparticles";
import { EditorNumberInput, EditorGroup, IRgb, IHsl, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class TwinkleOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: ITwinkle;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("twinkle", "Twinkle");
        this.options = (options ?? this.group.data) as ITwinkle;

        this.addTwinkle();
    }

    private addTwinkle(): void {
        this.addTwinkleValues(this.group.addGroup("lines", "Lines"));
        this.addTwinkleValues(this.group.addGroup("particles", "Particles"));
    }

    private addTwinkleValues(group: EditorGroup): void {
        const particles = this.particles;
        const options = group.data as ITwinkleValues;

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

        group
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
            .change(async (value: unknown) => {
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
