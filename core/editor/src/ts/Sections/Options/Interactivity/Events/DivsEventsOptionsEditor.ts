import { EditorGroup, EditorType } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles";
import type { IDivEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IDivEvent";
import { EditorBase } from "../../../../EditorBase";
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

        if (this.options instanceof Array) {
            this.group.addButton("addDiv", "Add Div", false).click(async () => {
                const arr = this.options as IDivEvent[];
                const divGroup = this.group.addGroup(
                    arr.length.toString(10),
                    `Div ${arr.length + 1}`,
                    true,
                    this.options
                );

                this.addDiv(divGroup);

                await this.particles.refresh();
            });
        }
    }

    private addDivs(): void {
        const options = this.options;

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const group = this.group.addGroup(i.toString(10), `Div_${i + 1}`, true, options);

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
            const selectorsGroup = group.addGroup("selectors", "Selectors");

            selectorsGroup.addButton("addSelector", "Add Selector", false).click(async () => {
                const arr = options.selectors as string[];

                selectorsGroup
                    .addProperty(arr.length.toString(10), `Selector ${arr.length + 1}`, EditorType.string)
                    .change(async () => {
                        await particles.refresh();
                    });

                await this.particles.refresh();
            });
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
