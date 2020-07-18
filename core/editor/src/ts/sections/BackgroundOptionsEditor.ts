import { EditorContainer } from "../editors/EditorContainer";
import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { hslToRgb } from "../Utils/Utils";

export class BackgroundOptionsEditor {
    public readonly container: EditorContainer;

    constructor(private readonly parent: EditorContainer) {
        this.container = parent.addContainer("background", "Background");

        this.addColor();

        this.addProperties();
    }

    private addColor(): void {
        const particles = this.container.particles;
        const options = particles.options.background.color;
        let colorStringValue: string | undefined;

        if (typeof options.value === "string") {
            colorStringValue = options.value;
        } else {
            let rgb = options.value as IRgb;
            const hsl = options.value as IHsl;

            if (hsl.h !== undefined) {
                rgb = hslToRgb(hsl);
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
        const particles = this.container.particles;
        const options = particles.options.background;

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
