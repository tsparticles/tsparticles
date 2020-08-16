import { EditorGroup, IHsl, IRgb, EditorType } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import type { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";
import { EditorBase } from "../../../../EditorBase";

export class ColorOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IAnimatableColor;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup, options?: unknown): void {
        this.group = parent.addGroup("color", "Color", true, options);
        this.options = this.group.data as IAnimatableColor;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const particles = this.particles;
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        let colorStringValue: string | undefined;

        if (options?.value) {
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

        this.group.addProperty("value", "Value", EditorType.color, colorStringValue).change(async () => {
            await particles.refresh();
        });
    }
}
