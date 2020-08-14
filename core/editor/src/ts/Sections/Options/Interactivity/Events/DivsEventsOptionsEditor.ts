import { EditorGroup } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles";
import type { IDivEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IDivEvent";
import { EditorBase } from "../../../../EditorBase";
import { EditorType } from "object-gui/dist/js";
import { DivType } from "tsparticles";

export class DivsEventsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: SingleOrMultiple<IDivEvent>;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onDiv", "Divs Events");
        this.options = this.group.data as SingleOrMultiple<IDivEvent>;

        this.addDivs();
    }

    private addDivs(): void {
        const options = this.options;

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const group = this.group.addGroup(`div_${i + 1}`, `Div_${i + 1}`, true, options[i]);

                this.addDiv(group);
            }
        } else {
            this.addDiv(this.group);
        }
    }

    private addDiv(group: EditorGroup) {
        const particles = this.particles;
        const options = group.data as IDivEvent;

        group
            .addProperty("enable", "Enable", EditorType.boolean)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        if (options.selectors instanceof Array) {
            // TODO: add array support to selectors property
        } else {
            group.addProperty("selectors", "Selectors", EditorType.string).change(async () => {
                await particles.refresh();
            });
        }

        group
            .addProperty("type", "Type", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: DivType.circle,
                },
                {
                    value: DivType.rectangle,
                },
            ]);
    }
}
