import type { IColor } from "tsparticles/dist/Core/Interfaces/IColor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IBackgroundMask } from "tsparticles/dist/Options/Interfaces/BackgroundMask/IBackgroundMask";
import type { IBackgroundMaskCover } from "tsparticles/dist/Options/Interfaces/BackgroundMask/IBackgroundMaskCover";
import { EditorNumberInput, EditorContainer, IRgb, IHsl, ColorUtils } from "object-gui";

export class BackgroundMaskOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IBackgroundMask) {
        this.container = parent.addContainer("backgroundMask", "Background Mask");
        this.particles = this.container.data as Container;

        this.addCover();

        this.addProperties();
    }

    private addCover(): void {
        const particles = this.particles;
        const options = this.options.cover as IBackgroundMaskCover;
        const coverColor = options.color as IColor;
        const coverContainer = this.container.addContainer("cover", "Cover");

        let colorStringValue: string | undefined;

        if (typeof coverColor.value === "string") {
            colorStringValue = coverColor.value;
        } else {
            let rgb = coverColor.value as IRgb;
            const hsl = coverColor.value as IHsl;

            if (hsl.h !== undefined) {
                rgb = ColorUtils.hslToRgb(hsl);
            }

            colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
        }

        coverContainer.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    coverColor.value = value;

                    await particles.refresh();
                }
            }
        );

        const opacityInput = coverContainer.addProperty(
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

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.container.addProperty(
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
    }
}
