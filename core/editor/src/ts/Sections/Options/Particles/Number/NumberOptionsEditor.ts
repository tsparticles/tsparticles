import type { EditorContainer } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";

export class NumberOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IParticlesNumber) {
        this.container = parent.addContainer("number", "Number");
        this.particles = this.container.data as Container;

        this.addDensity();
        this.addNumber();
    }

    private addDensity(): void {
        const particles = this.particles;
        const options = this.options;
        const container = this.container.addContainer("density", "Density");

        container.addProperty(
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

        container.addProperty(
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

        container.addProperty(
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

    private addNumber(): void {
        const particles = this.particles;
        const options = this.options;

        this.container.addProperty(
            "limit",
            "Limit",
            options.limit,
            typeof options.limit,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.limit = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "value",
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
    }
}
