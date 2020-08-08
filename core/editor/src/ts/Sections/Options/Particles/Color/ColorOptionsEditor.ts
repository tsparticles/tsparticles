import type { EditorGroup, IRgb, IHsl } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import type { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";

export class ColorOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IAnimatableColor;

    constructor(
        private readonly parent: EditorGroup,
        private readonly particles: Container,
        options?: IAnimatableColor
    ) {
        this.group = parent.addGroup("color", "Color");
        this.options = options ?? (this.group.data as IAnimatableColor);

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const options = this.options.animation;
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", options.sync, typeof options.sync, async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
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

        this.group.addProperty("value", "Value", colorStringValue, "color", async () => {
            await particles.refresh();
        });
    }
}
