import type { EditorContainer } from "../../../Editors/EditorContainer";
import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import type { IBackground } from "tsparticles/dist/Options/Interfaces/Background/IBackground";
import type { IColor } from "tsparticles/dist/Core/Interfaces/IColor";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";

export class BackgroundOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IBackground) {
        this.container = parent.addContainer("background", "Background");
        this.particles = this.container.particles;

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

        this.container.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.value = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.container.addProperty(
            "image",
            "Image",
            options.image,
            typeof options.image,
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.image = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
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
        );

        this.container.addProperty(
            "position",
            "Position",
            options.position,
            typeof options.position,
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.position = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "repeat",
            "Repeat",
            options.repeat,
            typeof options.repeat,
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.repeat = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "size",
            "Size",
            options.size,
            typeof options.size,
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.size = value;

                    await particles.refresh();
                }
            }
        );
    }
}
