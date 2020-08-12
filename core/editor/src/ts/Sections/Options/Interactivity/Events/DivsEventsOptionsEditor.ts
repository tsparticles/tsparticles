import { EditorGroup } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles";
import type { IDivEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IDivEvent";
import { EditorBase } from "../../../../EditorBase";

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
        // const particles = this.particles;
        // const options = this.options;
        // const divsGroups = this.group;
    }
}
