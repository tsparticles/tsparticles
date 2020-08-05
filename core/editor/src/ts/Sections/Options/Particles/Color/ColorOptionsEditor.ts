import type { EditorGroup, IRgb, IHsl } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import type { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";

export class ColorOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IAnimatableColor) {
        this.group = parent.addGroup("color", "Color");
        this.particles = this.group.data as Container;

        this.addColor();
    }

    private addColor(): void {
        const particles = this.particles;
        const options = this.options;

        let colorStringValue: string | undefined;

        if (typeof options.value !== "undefined") {
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
        }

        this.group.addProperty(
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

        const animationGroup = this.group.addGroup("animation", "Animation");

        animationGroup.addProperty(
            "enable",
            "Enable",
            options.animation.enable,
            typeof options.animation.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.animation.enable = value;

                    await particles.refresh();
                }
            }
        );

        animationGroup.addProperty(
            "speed",
            "Speed",
            options.animation.speed,
            typeof options.animation.speed,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.animation.speed = value;

                    await particles.refresh();
                }
            }
        );

        animationGroup.addProperty(
            "sync",
            "Sync",
            options.animation.sync,
            typeof options.animation.sync,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.animation.sync = value;

                    await particles.refresh();
                }
            }
        );
    }
}
