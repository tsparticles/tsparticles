import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import type { IBackground } from "tsparticles/dist/Options/Interfaces/Background/IBackground";
import type { IColor } from "tsparticles/dist/Core/Interfaces/IColor";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import { EditorNumberInput, EditorGroup } from "object-gui";

export class BackgroundOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IBackground;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("background", "Background");
        this.options = this.group.data as IBackground;

        console.log(particles);

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

        this.group.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.value = value;
                }
                await particles.refresh();
            },
            false
        );
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("image", "Image", options.image, typeof options.image, async () => {
            await particles.refresh();
        });

        const opacityItem = this.group.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            typeof options.opacity,
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        opacityItem.step(0.01).min(0).max(1);

        this.group.addProperty("position", "Position", options.position, typeof options.position, async () => {
            await particles.refresh();
        });

        this.group.addProperty("repeat", "Repeat", options.repeat, typeof options.repeat, async () => {
            await particles.refresh();
        });

        this.group.addProperty("size", "Size", options.size, typeof options.size, async () => {
            await particles.refresh();
        });
    }
}
