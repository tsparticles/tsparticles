import type { EditorContainer } from "../../../Editors/EditorContainer";
import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import type { IParticles } from "tsparticles/dist/Options/Interfaces/Particles/IParticles";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";

export class ParticlesOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticles) {
        this.container = parent.addContainer("particles", "Particles");
        this.particles = this.container.particles;

        this.addColor();
        this.addLinks();
    }

    private addColor(): void {
        const particles = this.container.particles;
        const options = this.options.color;
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

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.container, this.options.links);
    }
}
