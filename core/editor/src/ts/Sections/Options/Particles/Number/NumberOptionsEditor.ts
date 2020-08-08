import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";

export class NumberOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IParticlesNumber;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("number", "Number");
        this.options = this.group.data as IParticlesNumber;

        this.addDensity();
        this.addProperties();
    }

    private addDensity(): void {
        const particles = this.particles;
        const options = this.options.density;
        const group = this.group.addGroup("density", "Density");

        group.addProperty("area", "Area", options.area, typeof options.area, async () => {
            await particles.refresh();
        });

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        group.addProperty("factor", "Factor", options.factor, typeof options.factor, async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("limit", "Limit", options.limit, typeof options.limit, async () => {
            await particles.refresh();
        });

        this.group.addProperty("value", "Value", options.value, typeof options.value, async () => {
            await particles.refresh();
        });
    }
}
