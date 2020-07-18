import { EditorContainer } from "../editors/EditorContainer";
import { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import { hslToRgb } from "../Utils/Utils";

export class ParticlesOptionsEditor {
    public readonly container: EditorContainer;

    constructor(private readonly parent: EditorContainer) {
        this.container = parent.addContainer("particles", "Particles");

        this.addColor();
        this.addLinks();
    }

    private addColor(): void {
        const particles = this.container.particles;
        const options = particles.options.particles.color;
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

    private addLinks(): void {}
}
