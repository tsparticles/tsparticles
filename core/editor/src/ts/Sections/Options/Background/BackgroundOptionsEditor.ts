import type { IBackground } from "tsparticles/dist/Options/Interfaces/Background/IBackground";
import type { IColor, IHsl, IRgb } from "tsparticles/dist/Core/Interfaces/Colors";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";

export class BackgroundOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: IBackground;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("background", "Background");
        this.options = this.group.data as IBackground;

        this.addColor();

        this.addProperties();
    }

    private addColor(): void {
        const particles = this.particles;
        const options = this.options.color as IColor;
        let colorStringValue: string | undefined;

        if (typeof options.value === "string") {
            colorStringValue = options.value;
        } else {
            let rgb = options.value as IRgb;
            const hsl = options.value as IHsl;

            if (hsl.h !== undefined) {
                rgb = ColorUtils.hslToRgb(hsl);
            }

            colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
        }

        this.group
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
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
