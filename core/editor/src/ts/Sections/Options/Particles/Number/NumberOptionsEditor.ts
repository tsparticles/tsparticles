import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";

export class NumberOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IParticlesNumber) {
        this.group = parent.addGroup("number", "Number");
        this.particles = this.group.data as Container;

        this.addDensity();
        this.addNumber();
    }

    private addDensity(): void {
        const particles = this.particles;
        const options = this.options;
        const group = this.group.addGroup("density", "Density");

        group.addProperty(
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

        group.addProperty(
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

        group.addProperty(
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

        this.group.addProperty(
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

        this.group.addProperty(
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
