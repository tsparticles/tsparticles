import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";

export class NumberOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticlesNumber) {
        this.container = parent.addContainer("number", "Number", true);
        this.particles = this.container.particles;

        this.addNumber();
    }

    private addNumber(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
            "number",
            "Number",
            options.value,
            typeof options.value,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.value = value;

                    await particles.refresh();
                }
            }
        );

        const densityContainer = this.container.addContainer("density", "Density", true);

        densityContainer.addProperty(
            "area",
            "Area",
            options.density.area,
            typeof options.density.area,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.density.area = value;

                    await particles.refresh();
                }
            }
        );

        densityContainer.addProperty(
            "enable",
            "Enable",
            options.density.enable,
            typeof options.density.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.density.enable = value;

                    await particles.refresh();
                }
            }
        );

        densityContainer.addProperty(
            "factor",
            "Factor",
            options.density.factor,
            typeof options.density.factor,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.density.factor = value;

                    await particles.refresh();
                }
            }
        );
    }
}
