import { Container } from "tsparticles/dist/Core/Container";
import { IStroke } from "tsparticles/dist/Options/Interfaces/Particles/IStroke";
import { ColorOptionsEditor } from "../Color/ColorOptionsEditor";
import { IAnimatableColor } from "tsparticles/dist/Options/Interfaces/Particles/IAnimatableColor";
import { EditorGroup, SingleOrMultiple, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class StrokeOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: SingleOrMultiple<IStroke>;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup) {
        this.group = parent.addGroup("stroke", "Stroke");
        this.options = this.group.data as SingleOrMultiple<IStroke>;

        if (this.options instanceof Array) {
            for (let i = 0; i < this.options.length; i++) {
                const group = this.group.addGroup(`stroke_${i + 1}`, `Stroke_${i + 1}`, true, this.options[i]);

                this.addStroke(group);
            }
        } else {
            this.addStroke(this.group);
        }
    }

    private addStroke(group: EditorGroup): void {
        const particles = this.particles;
        const options = group.data as IStroke;

        if (options.color === undefined) {
            options.color = {
                value: "",
                animation: {
                    enable: false,
                    speed: 0,
                    sync: false,
                },
            };
        }

        const colorOptions = new ColorOptionsEditor(this.particles);

        colorOptions.addToGroup(group, options.color as IAnimatableColor);

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("width", "Width", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
