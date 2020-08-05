import { Container } from "tsparticles/dist/Core/Container";
import { IShadow } from "tsparticles/dist/Options/Interfaces/Particles/IShadow";
import { ColorUtils, EditorGroup, IRgb, IHsl } from "object-gui";

export class ShadowOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IShadow) {
        this.group = parent.addGroup("shadow", "Shadow");
        this.particles = this.group.data as Container;

        this.addShadow();
    }

    private addShadow(): void {
        const particles = this.particles;
        const options = this.options;

        let colorStringValue: string | undefined;

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

        this.group.addProperty(
            "blur",
            "Blur",
            options.blur,
            typeof options.blur,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.blur = value;

                    await particles.refresh();
                }
            }
        );

        this.group.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color.value = value;
                    }

                    await particles.refresh();
                }
            }
        );

        this.group.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const offsetGroup = this.group.addGroup("offset", "Offset");

        offsetGroup.addProperty(
            "x",
            "X",
            options.offset.x,
            typeof options.offset.x,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.offset.x = value;

                    await particles.refresh();
                }
            }
        );

        offsetGroup.addProperty(
            "y",
            "Y",
            options.offset.y,
            typeof options.offset.y,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.offset.y = value;

                    await particles.refresh();
                }
            }
        );
    }
}
